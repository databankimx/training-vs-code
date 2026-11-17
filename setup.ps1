<#
.SYNOPSIS
    Sets up the Working With Visual Studio Code tutorial.

.DESCRIPTION
    A generic setup script. What this tutorial needs is listed in setup.json, next to this file.
    The script gets the course, installs the programs setup.json lists, prepares the lesson runner,
    and opens the course in VS Code.

    Run it with:
        powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1

.PARAMETER RepoDir
    The folder that holds the course repository. Default: C:\Development\training

.PARAMETER SkipInstall
    Check only. Install nothing, and list what is missing.

.PARAMETER NoLaunch
    Install and prepare everything, but do not open VS Code or start the lesson runner.

.PARAMETER RunTests
    Run the npm tests that setup.json lists.

.PARAMETER RepoUrl
    Clone from this URL instead of the default.

.PARAMETER Branch
    Clone this branch instead of the default.
#>
[CmdletBinding()]
param(
    [string]$RepoDir = "C:\Development\training",
    [switch]$SkipInstall,
    [switch]$NoLaunch,
    [switch]$RunTests,
    [string]$RepoUrl,
    [string]$Branch
)

$ErrorActionPreference = "Stop"

# Bootstrap values. They match setup.json, and the script warns if they differ after cloning.
# TEMPORARY: $BootstrapBranch is "dev" for the clean VM test. Change it to "main" after the test passes,
# and change "branch" in setup.json to match.
$BootstrapRepoUrl = "https://github.com/databankimx/training-vs-code.git"
$BootstrapBranch  = "dev"

# Extensions the course has approved. The script installs only IDs on this list.
# Confirm each ID against the Marketplace before release.
$ApprovedExtensions = @(
    "ms-python.python",
    "ms-dotnettools.csharp",
    "ms-vscode.cpptools-extension-pack",
    "rust-lang.rust-analyzer",
    "GitHub.copilot",
    "GitHub.copilot-chat"
)

$WingetSuccessCodes = @(0, 3010, -1978335189)

$script:Results  = [ordered]@{}
$script:Problems = New-Object System.Collections.Generic.List[string]

# ---------------------------------------------------------------------------------------------
# Output and state helpers
# ---------------------------------------------------------------------------------------------

function Write-Step([string]$Text) {
    Write-Host ""
    Write-Host "== $Text" -ForegroundColor Cyan
}

function Write-Note([string]$Text) {
    Write-Host "   $Text"
}

function Set-Result([string]$Name, [string]$Status) {
    $script:Results[$Name] = $Status
}

function Add-Problem([string]$Text) {
    $script:Problems.Add($Text)
}

function Stop-Setup([string]$Message) {
    Write-Host ""
    Write-Host "Setup stopped: $Message" -ForegroundColor Red
    exit 1
}

function Show-Summary {
    Write-Host ""
    Write-Host "Summary" -ForegroundColor Cyan
    foreach ($key in $script:Results.Keys) {
        Write-Host ("{0,-34} {1}" -f $key, $script:Results[$key])
    }
    if ($script:Problems.Count -gt 0) {
        Write-Host ""
        Write-Host "Action needed:" -ForegroundColor Yellow
        foreach ($problem in $script:Problems) {
            Write-Host "  - $problem"
        }
    }
}

# ---------------------------------------------------------------------------------------------
# Environment helpers
# ---------------------------------------------------------------------------------------------

function Test-Admin {
    $identity  = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($identity)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Update-SessionPath {
    $machine = [Environment]::GetEnvironmentVariable("Path", "Machine")
    $user    = [Environment]::GetEnvironmentVariable("Path", "User")
    $env:Path = "$machine;$user"
}

# Runs an external program. Native stderr output must not stop the script, so the preference is
# relaxed for the call. Returns the exit code.
function Invoke-Tool {
    param(
        [string]$File,
        [string[]]$Arguments = @(),
        [string]$WorkingDirectory
    )
    $previous = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    try {
        if ($WorkingDirectory) { Push-Location $WorkingDirectory }
        try {
            & $File @Arguments | Out-Host
            return $LASTEXITCODE
        }
        finally {
            if ($WorkingDirectory) { Pop-Location }
        }
    }
    finally {
        $ErrorActionPreference = $previous
    }
}

# Finds a command on the PATH, ignoring the WindowsApps aliases, then checks the known install folders.
function Find-Program([string]$Command, [string[]]$Paths) {
    $found = Get-Command $Command -ErrorAction SilentlyContinue |
        Where-Object { $_.Source -and $_.Source -notlike "*\WindowsApps\*" } |
        Select-Object -First 1
    if ($found) { return $found.Source }
    foreach ($path in $Paths) {
        $expanded = [Environment]::ExpandEnvironmentVariables($path)
        if (Test-Path $expanded) { return $expanded }
    }
    return $null
}

# Returns the major version from a program's version output, or $null if it can't be read.
function Get-MajorVersion([string]$File, [string]$Argument) {
    $previous = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    try {
        $text = (& $File $Argument 2>&1 | Out-String)
    }
    finally {
        $ErrorActionPreference = $previous
    }
    if ($text -match '(\d+)\.\d+') { return [int]$Matches[1] }
    return $null
}

function Install-WingetPackage([string]$Id, [string]$Override) {
    if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
        throw "winget isn't available on this computer. Install 'App Installer' from the Microsoft Store, then run this script again."
    }
    $wingetArgs = @("install", "--id", $Id, "--exact", "--silent",
                    "--accept-package-agreements", "--accept-source-agreements")
    if ($Override) { $wingetArgs += @("--override", $Override) }
    Write-Note "Installing $Id with winget. This can take several minutes."
    $code = Invoke-Tool "winget" $wingetArgs
    Update-SessionPath
    if ($WingetSuccessCodes -notcontains $code) {
        throw "winget couldn't install $Id (exit code $code)."
    }
}

# ---------------------------------------------------------------------------------------------
# Build Tools and Electron
# ---------------------------------------------------------------------------------------------

function Find-BuildTools {
    $vswhere = Join-Path ${env:ProgramFiles(x86)} "Microsoft Visual Studio\Installer\vswhere.exe"
    if (-not (Test-Path $vswhere)) { return $null }
    $installPath = & $vswhere -latest -products "*" `
        -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 `
        -property installationPath | Select-Object -First 1
    if (-not $installPath) { return $null }
    $vcvars = Join-Path $installPath "VC\Auxiliary\Build\vcvars64.bat"
    if (Test-Path $vcvars) { return $vcvars }
    return $null
}

function Test-ElectronBinary([string]$RunnerDir) {
    return (Test-Path (Join-Path $RunnerDir "node_modules\electron\dist\electron.exe"))
}

# Finds the newest Visual Studio install's devenv.exe, or returns $null.
function Find-VisualStudio {
    $vswhere = Join-Path ${env:ProgramFiles(x86)} "Microsoft Visual Studio\Installer\vswhere.exe"
    if (-not (Test-Path $vswhere)) { return $null }
    $devenv = & $vswhere -latest -products "*" -property productPath | Select-Object -First 1
    if ($devenv -and (Test-Path $devenv)) { return $devenv }
    return $null
}

# ---------------------------------------------------------------------------------------------
# Requirements
# ---------------------------------------------------------------------------------------------

function Invoke-WingetRequirement($Requirement) {
    $name = $Requirement.check
    $path = Find-Program $Requirement.check $Requirement.paths

    if ($path -and $Requirement.minimum) {
        $major = Get-MajorVersion $path "--version"
        if ($null -ne $major -and $major -lt [int]$Requirement.minimum) {
            Write-Note "$name is version $major. This tutorial needs $($Requirement.minimum) or later."
            $path = $null
        }
    }

    if ($path) {
        Set-Result $name "present"
        return
    }

    if ($SkipInstall) {
        Set-Result $name "missing"
        Add-Problem "$name is missing. Install it with: winget install --id $($Requirement.id) --exact"
        return
    }

    try {
        Install-WingetPackage $Requirement.id
        $path = Find-Program $Requirement.check $Requirement.paths
        if ($path) {
            Set-Result $name "installed"
        }
        else {
            Set-Result $name "installed, not found yet"
            Add-Problem "$name was installed but isn't found yet. Open a new PowerShell window and run this script again."
        }
    }
    catch {
        Set-Result $name "failed"
        Add-Problem $_.Exception.Message
    }
}

# The C++ Build Tools. With fallbackFor, they are installed only if the named step needs them.
function Invoke-BuildToolsRequirement($Requirement) {
    $name = "C++ Build Tools"
    if (Find-BuildTools) {
        Set-Result $name "present"
        return
    }
    if ($Requirement.fallbackFor) {
        Set-Result $name "not installed (needed only if Electron can't download)"
        return
    }
    if ($SkipInstall) {
        Set-Result $name "missing"
        Add-Problem "The C++ Build Tools are missing. Open PowerShell as Administrator and run this script again."
        return
    }
    if (-not (Test-Admin)) {
        Set-Result $name "needs an administrator window"
        Add-Problem "The C++ Build Tools need an administrator window. Open PowerShell as Administrator and run this script again."
        return
    }
    try {
        Install-WingetPackage $Requirement.id "--wait --quiet --norestart --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"
        if (Find-BuildTools) { Set-Result $name "installed" } else { Set-Result $name "installed, not found yet" }
    }
    catch {
        Set-Result $name "failed"
        Add-Problem $_.Exception.Message
    }
}

# ---------------------------------------------------------------------------------------------
# Bootstrap: get the course, then run its copy of this script
# ---------------------------------------------------------------------------------------------

$here = $PSScriptRoot
if (-not $here) { $here = Split-Path -Parent $MyInvocation.MyCommand.Path }

$inCourse = (Test-Path (Join-Path $here "setup.json")) -and (Test-Path (Join-Path $here ".git"))

if (-not $inCourse) {
    Write-Step "Getting the course"

    $url = $BootstrapRepoUrl
    if ($RepoUrl) { $url = $RepoUrl }
    $branchToUse = $BootstrapBranch
    if ($Branch) { $branchToUse = $Branch }
    $folderName = [IO.Path]::GetFileNameWithoutExtension(($url -replace '/$', '').Split('/')[-1])

    $git = Find-Program "git" @("%ProgramFiles%\Git\cmd\git.exe")
    if (-not $git) {
        if ($SkipInstall) { Stop-Setup "Git isn't installed. Run this script without -SkipInstall, or install Git from https://git-scm.com." }
        try {
            Install-WingetPackage "Git.Git"
        }
        catch { Stop-Setup $_.Exception.Message }
        $git = Find-Program "git" @("%ProgramFiles%\Git\cmd\git.exe")
        if (-not $git) { Stop-Setup "Git was installed, but it isn't found yet. Open a new PowerShell window and run this script again." }
    }

    $target = Join-Path $RepoDir $folderName
    if (Test-Path (Join-Path $target ".git")) {
        Write-Note "Updating $target on branch $branchToUse."
        if ((Invoke-Tool $git @("-C", $target, "fetch", "--quiet", "origin")) -ne 0) { Stop-Setup "git fetch failed in $target." }
        if ((Invoke-Tool $git @("-C", $target, "checkout", "--quiet", $branchToUse)) -ne 0) { Stop-Setup "Couldn't switch $target to branch $branchToUse." }
        if ((Invoke-Tool $git @("-C", $target, "pull", "--ff-only", "--quiet")) -ne 0) { Stop-Setup "Couldn't update $target. It has changes that conflict with the course. Move or commit them, then run this script again." }
    }
    elseif ((Test-Path $target) -and (Get-ChildItem $target -Force | Select-Object -First 1)) {
        Stop-Setup "$target exists, but it isn't a copy of the course. Move that folder, then run this script again."
    }
    else {
        Write-Note "Cloning $url into $target."
        New-Item -ItemType Directory -Force -Path $RepoDir | Out-Null
        if ((Invoke-Tool $git @("clone", "--branch", $branchToUse, $url, $target)) -ne 0) { Stop-Setup "git clone failed. Check your network connection, then run this script again." }
    }

    $child = Join-Path $target "setup.ps1"
    if (-not (Test-Path $child)) { Stop-Setup "The course on branch $branchToUse has no setup.ps1." }

    $forward = @("-NoProfile", "-ExecutionPolicy", "Bypass", "-File", $child, "-RepoDir", $RepoDir)
    if ($SkipInstall) { $forward += "-SkipInstall" }
    if ($NoLaunch)    { $forward += "-NoLaunch" }
    if ($RunTests)    { $forward += "-RunTests" }
    if ($RepoUrl)     { $forward += @("-RepoUrl", $RepoUrl) }
    if ($Branch)      { $forward += @("-Branch", $Branch) }
    & powershell @forward
    exit $LASTEXITCODE
}

# ---------------------------------------------------------------------------------------------
# Running from the course copy
# ---------------------------------------------------------------------------------------------

$repo = $here
$manifest = Get-Content -Raw -Path (Join-Path $repo "setup.json") | ConvertFrom-Json

if ($manifest.repoUrl -ne $BootstrapRepoUrl) {
    Write-Host "Warning: setup.json names $($manifest.repoUrl), but this script's bootstrap names $BootstrapRepoUrl." -ForegroundColor Yellow
}

# This version of the script handles only the kinds of setup this course uses.
foreach ($section in @("python", "vendor", "build", "path", "warnings", "credentials")) {
    if ($manifest.PSObject.Properties[$section]) {
        Stop-Setup "setup.json uses '$section', which this version of the script doesn't support yet."
    }
}
if ($manifest.requirePowerShell7) {
    Stop-Setup "setup.json needs PowerShell 7, which this version of the script doesn't support yet."
}

Write-Step "$($manifest.name)"
Write-Note "Course folder: $repo"

Write-Step "Required programs"
foreach ($requirement in $manifest.requirements) {
    switch ($requirement.kind) {
        "winget"     { Invoke-WingetRequirement $requirement }
        "buildTools" { Invoke-BuildToolsRequirement $requirement }
        default      { Stop-Setup "setup.json has an unknown requirement kind: $($requirement.kind)." }
    }
}

if ($script:Problems.Count -gt 0) {
    Show-Summary
    exit 1
}

if ($SkipInstall) {
    Write-Step "Packages and Electron"
    Write-Note "Skipped (-SkipInstall)."
}
else {
    Write-Step "Packages"
    foreach ($project in $manifest.npm) {
        $dir = Join-Path $repo $project.folder
        if (-not (Test-Path (Join-Path $dir "package.json"))) {
            Stop-Setup "$($project.folder)\package.json is missing from the course."
        }
        $mode = $project.install
        if (-not $mode -or $mode -eq "auto") {
            if (Test-Path (Join-Path $dir "package-lock.json")) { $mode = "ci" } else { $mode = "install" }
        }
        # Electron's binary is downloaded in its own step below, so a failed download can be retried
        # without repeating the whole install.
        $env:ELECTRON_SKIP_BINARY_DOWNLOAD = "1"
        try {
            $code = Invoke-Tool "npm.cmd" @($mode, "--no-audit", "--no-fund") $dir
        }
        finally {
            Remove-Item Env:ELECTRON_SKIP_BINARY_DOWNLOAD -ErrorAction SilentlyContinue
        }
        if ($code -ne 0) { Stop-Setup "npm $mode failed in $dir. Check the messages above, then run this script again." }
        Set-Result "npm $($project.folder)" "ok ($mode)"
    }

    Write-Step "Electron"
    $runner = Join-Path $repo $manifest.electron.folder
    if (Test-ElectronBinary $runner) {
        Set-Result "Electron" "present"
    }
    else {
        # Electron downloads a prebuilt zip and extracts it. A C++ compiler can't fix that, so there is
        # no Build Tools fallback here. A failed download is often a brief network problem, so try twice.
        foreach ($attempt in 1..2) {
            Write-Note "Downloading Electron (attempt $attempt of 2)."
            Invoke-Tool "node" @("node_modules\electron\install.js") $runner | Out-Null
            if (Test-ElectronBinary $runner) { break }
        }
        if (Test-ElectronBinary $runner) {
            Set-Result "Electron" "downloaded"
        }
        else {
            Set-Result "Electron" "failed"
            Add-Problem "Electron couldn't be downloaded. The error above shows why. A proxy, firewall, or antivirus that blocks GitHub is the usual cause. Fix the network, then run this script again."
        }
    }
}

Write-Step "VS Code"
$codePath = Find-Program "code" @(
    "%LOCALAPPDATA%\Programs\Microsoft VS Code\bin\code.cmd",
    "%ProgramFiles%\Microsoft VS Code\bin\code.cmd"
)
$codeExe = $null
if ($codePath) {
    $candidate = Join-Path (Split-Path (Split-Path $codePath)) "Code.exe"
    if (Test-Path $candidate) { $codeExe = $candidate }
}

if ($manifest.vscode.shellExtensions -and $codeExe -and -not $SkipInstall) {
    $entries = @(
        @{ Key = "*\shell\VSCode";                       Arg = "%1" },
        @{ Key = "Directory\shell\VSCode";               Arg = "%V" },
        @{ Key = "Directory\Background\shell\VSCode";    Arg = "%V" }
    )
    foreach ($entry in $entries) {
        $key = [Microsoft.Win32.Registry]::CurrentUser.CreateSubKey("Software\Classes\$($entry.Key)")
        $key.SetValue("", "Open with Code")
        $key.SetValue("Icon", "`"$codeExe`"")
        $command = $key.CreateSubKey("command")
        $command.SetValue("", "`"$codeExe`" `"$($entry.Arg)`"")
        $command.Close()
        $key.Close()
    }
    Set-Result "Explorer entries" "added (current user)"
}
elseif ($manifest.vscode.shellExtensions) {
    Set-Result "Explorer entries" "skipped"
}

foreach ($extension in $manifest.vscode.extensions) {
    if ($ApprovedExtensions -notcontains $extension) {
        Set-Result "Extension $extension" "skipped (not on the approved list)"
        Add-Problem "Extension $extension isn't on the approved list, so it was not installed."
        continue
    }
    if ($SkipInstall -or -not $codePath) {
        Set-Result "Extension $extension" "skipped"
        continue
    }
    $code = Invoke-Tool $codePath @("--install-extension", $extension, "--force")
    if ($code -eq 0) { Set-Result "Extension $extension" "installed" }
    else { Set-Result "Extension $extension" "failed"; Add-Problem "Couldn't install extension $extension." }
}

if ($RunTests) {
    Write-Step "Tests"
    foreach ($project in $manifest.npm) {
        if (-not $project.test) { continue }
        $dir = Join-Path $repo $project.folder
        $code = Invoke-Tool "npm.cmd" @("test") $dir
        if ($code -eq 0) { Set-Result "tests $($project.folder)" "passed" }
        else { Set-Result "tests $($project.folder)" "failed"; Add-Problem "Tests failed in $($project.folder)." }
    }
}

Write-Step "Open the course"
if ($NoLaunch -or $SkipInstall) {
    Write-Note "Skipped (-NoLaunch or -SkipInstall)."
}
elseif ($script:Problems.Count -gt 0) {
    Write-Note "Not opening the course, because setup didn't finish. Fix the problems above, then run this script again."
}
else {
    $ide = $manifest.launch.ide
    if (-not $ide) { $ide = "vscode" }

    if ($ide -eq "visualStudio") {
        $devenv = Find-VisualStudio
        if (-not $devenv) {
            Set-Result "Visual Studio" "not found"
            Add-Problem "Visual Studio wasn't found, so the course couldn't be opened in it. Install Visual Studio, then run this script again."
        }
        else {
            $target = $repo
            if ($manifest.launch.solution) { $target = Join-Path $repo $manifest.launch.solution }
            Start-Process -FilePath $devenv -ArgumentList "`"$target`""
            Set-Result "Visual Studio" "opened the course"
        }
    }
    elseif ($ide -eq "vscode") {
        if ($manifest.launch.openRepo -and $codeExe) {
            Start-Process -FilePath $codeExe -ArgumentList "`"$repo`""
            Set-Result "VS Code" "opened the course"
        }
    }
    else {
        Add-Problem "setup.json names an unknown IDE: $ide."
    }

    if ($manifest.launch.kind -eq "electron") {
        $runnerDir = Join-Path $repo $manifest.launch.folder
        $electronExe = Join-Path $runnerDir "node_modules\electron\dist\electron.exe"
        if (Test-Path $electronExe) {
            Start-Process -FilePath $electronExe -ArgumentList "." -WorkingDirectory $runnerDir
            Set-Result "Lesson runner" "started"
        }
        else {
            Set-Result "Lesson runner" "not started (Electron is missing)"
        }
    }
}

Show-Summary
if ($script:Problems.Count -gt 0) { exit 1 }
Write-Host ""
Write-Host "Setup is complete." -ForegroundColor Green
exit 0

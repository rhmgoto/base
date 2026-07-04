$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$smokeTest = Join-Path $root "tests\smoke.js"
$staticChecks = Join-Path $root "tests\static-checks.js"
$bundledNode = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

$node = Get-Command node -ErrorAction SilentlyContinue
if ($node) {
  try {
    & $node.Source --version *> $null
    if ($LASTEXITCODE -eq 0) {
      & $node.Source $smokeTest
      if ($LASTEXITCODE -ne 0) {
        exit $LASTEXITCODE
      }
      & $node.Source $staticChecks
      exit $LASTEXITCODE
    }
  } catch {
    # Fall through to the bundled runtime below.
  }
}

if (Test-Path $bundledNode) {
  & $bundledNode $smokeTest
  if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
  }
  & $bundledNode $staticChecks
  exit $LASTEXITCODE
}

Write-Error "Node.js was not found. Install Node.js or make the bundled Codex runtime available."

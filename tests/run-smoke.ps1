$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$suite = @(
  (Join-Path $root "tests\smoke.js"),
  (Join-Path $root "tests\baserunning.js"),
  (Join-Path $root "tests\mvp.js"),
  (Join-Path $root "tests\static-checks.js")
)
$bundledNode = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

function Invoke-Suite($nodePath) {
  foreach ($test in $suite) {
    & $nodePath $test
    if ($LASTEXITCODE -ne 0) {
      exit $LASTEXITCODE
    }
  }
  exit 0
}

$node = Get-Command node -ErrorAction SilentlyContinue
if ($node) {
  try {
    & $node.Source --version *> $null
    if ($LASTEXITCODE -eq 0) {
      Invoke-Suite $node.Source
    }
  } catch {
    # Fall through to the bundled runtime below.
  }
}

if (Test-Path $bundledNode) {
  Invoke-Suite $bundledNode
}

Write-Error "Node.js was not found. Install Node.js or make the bundled Codex runtime available."

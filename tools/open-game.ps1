param([switch]$NoOpen)

$ErrorActionPreference = "Stop"
$gameRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$gameUrl = "http://127.0.0.1:8766/"
$gameSource = [System.IO.File]::ReadAllText((Join-Path $gameRoot "script.js"))

function Test-GameServer {
  try {
    $page = Invoke-WebRequest -UseBasicParsing -Uri $gameUrl -TimeoutSec 2
    if ($page.StatusCode -ne 200 -or $page.Content -notmatch 'id="gameCanvas"') { return $false }
    $script = Invoke-WebRequest -UseBasicParsing -Uri ($gameUrl + "script.js") -TimeoutSec 2
    return $script.StatusCode -eq 200 -and $script.Content -ceq $gameSource
  } catch {
    return $false
  }
}

if (-not (Test-GameServer)) {
  $gameNode = Get-Command node -ErrorAction SilentlyContinue
  $gameNodePath = if ($gameNode) { $gameNode.Source } else {
    Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
  }
  if (-not (Test-Path -LiteralPath $gameNodePath)) { throw "Node.js was not found." }
  $gameLogs = Join-Path $gameRoot "backups\game-server"
  New-Item -ItemType Directory -Path $gameLogs -Force | Out-Null
  $gameServer = Start-Process -FilePath $gameNodePath -ArgumentList 'tools/local-server.js', '8766', '127.0.0.1' `
    -WorkingDirectory $gameRoot -WindowStyle Hidden -PassThru `
    -RedirectStandardOutput (Join-Path $gameLogs "stdout.log") `
    -RedirectStandardError (Join-Path $gameLogs "stderr.log")
  $gameReady = $false
  for ($attempt = 0; $attempt -lt 20; $attempt++) {
    if (Test-GameServer) { $gameReady = $true; break }
    if ($gameServer.HasExited) { break }
    Start-Sleep -Milliseconds 250
  }
  if (-not $gameReady) {
    throw "The game did not respond at $gameUrl. Check backups/game-server/stderr.log. Do not switch ports or open an unverified URL."
  }
}

Write-Output "Game ready: $gameUrl"
if (-not $NoOpen) { Start-Process $gameUrl }

$ErrorActionPreference = "Stop"

# tools/hooks/ のフックを .git/hooks/ へ配置する。
# git のフックはリポジトリに含まれないので、環境ごとに一度実行する。
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$source = Join-Path $PSScriptRoot "hooks"
$destination = Join-Path $root ".git\hooks"

if (-not (Test-Path $destination)) {
  Write-Error "git のフックディレクトリが見つかりません: $destination"
}

Get-ChildItem -Path $source -File | ForEach-Object {
  $targetPath = Join-Path $destination $_.Name
  # フックは Git Bash から実行されるので LF のまま書き込む
  $content = [System.IO.File]::ReadAllText($_.FullName) -replace "`r`n", "`n"
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($targetPath, $content, $utf8NoBom)
  Write-Output "配置しました: .git/hooks/$($_.Name)"
}

Write-Output "完了しました。以降のコミットで index.html の最終修正日時が自動更新されます。"

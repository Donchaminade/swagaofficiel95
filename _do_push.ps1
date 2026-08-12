Set-Location "C:\Users\chami\Desktop\swaga"
$token = (gh auth token).Trim()
if (-not $token) {
  "NO_TOKEN" | Set-Content "_push_out.txt"
  exit 1
}
$url = "https://x-access-token:${token}@github.com/Donchaminade/swagaofficiel.git"
$output = git push -u $url "HEAD:feature/portfolio-swaga" 2>&1 | ForEach-Object { $_.ToString() }
$output | Set-Content -Encoding utf8 "_push_out.txt"
"EXIT=$LASTEXITCODE" | Add-Content "_push_out.txt"
# reset origin to clean URL without token
git remote set-url origin "https://github.com/Donchaminade/swagaofficiel.git"
git branch -vv 2>&1 | ForEach-Object { $_.ToString() } | Add-Content "_push_out.txt"
Get-Content "_push_out.txt"

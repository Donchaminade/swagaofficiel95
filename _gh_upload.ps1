$ErrorActionPreference = "Stop"
$owner = "Donchaminade"
$repo = "swagaofficiel"
$branch = "feature/portfolio-swaga"
$root = "C:\Users\chami\Desktop\swaga"
Set-Location $root
$tmp = Join-Path $env:TEMP "swaga-gh-upload"
New-Item -ItemType Directory -Force -Path $tmp | Out-Null

$entries = @()
$files = git ls-files
$total = $files.Count
$i = 0
foreach ($rel in $files) {
  $i++
  $full = Join-Path $root $rel
  if (-not (Test-Path -LiteralPath $full)) { Write-Host "SKIP missing $rel"; continue }
  $bytes = [System.IO.File]::ReadAllBytes($full)
  $b64 = [Convert]::ToBase64String($bytes)
  $payloadPath = Join-Path $tmp ("blob-$i.json")
  $payload = @{ content = $b64; encoding = "base64" } | ConvertTo-Json -Compress
  [System.IO.File]::WriteAllText($payloadPath, $payload)
  $sha = gh api -X POST "repos/$owner/$repo/git/blobs" --input $payloadPath --jq .sha
  if (-not $sha) { throw "blob failed for $rel" }
  $mode = "100644"
  $meta = git ls-files -s -- $rel
  if ($meta -match "^100755") { $mode = "100755" }
  $entries += @{ path = $rel.Replace("\","/"); mode = $mode; type = "blob"; sha = $sha }
  Write-Host ("[{0}/{1}] blob {2} {3}" -f $i, $total, $sha.Substring(0,7), $rel)
}

$treePayload = @{ tree = $entries } | ConvertTo-Json -Depth 6 -Compress
$treePath = Join-Path $tmp "tree.json"
[System.IO.File]::WriteAllText($treePath, $treePayload)
$treeSha = gh api -X POST "repos/$owner/$repo/git/trees" --input $treePath --jq .sha
Write-Host "tree=$treeSha"

$commitPayload = @{ message = "feat(site): portfolio SwAgA street motion"; tree = $treeSha } | ConvertTo-Json -Compress
$commitPath = Join-Path $tmp "commit.json"
[System.IO.File]::WriteAllText($commitPath, $commitPayload)
$commitSha = gh api -X POST "repos/$owner/$repo/git/commits" --input $commitPath --jq .sha
Write-Host "commit=$commitSha"

$refPayload = @{ ref = "refs/heads/$branch"; sha = $commitSha } | ConvertTo-Json -Compress
$refPath = Join-Path $tmp "ref.json"
[System.IO.File]::WriteAllText($refPath, $refPayload)
gh api -X POST "repos/$owner/$repo/git/refs" --input $refPath
Write-Host "REF CREATED refs/heads/$branch -> $commitSha"

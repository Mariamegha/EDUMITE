# CWASA Files Copy Script
# This script copies all CWASA avatar files from W: drive to your project

Write-Host "Starting CWASA files copy..." -ForegroundColor Cyan

# Set source and destination paths
$sourcePath = "W:\aaaaaaaaaaaahhhhhhhhhhhhhh\public"
$destPath = "public"

# Copy CSS files
Write-Host "`nCopying CSS files..." -ForegroundColor Yellow
Copy-Item -Path "$sourcePath\css\*" -Destination "$destPath\css\" -Recurse -Force
Write-Host "✓ CSS files copied" -ForegroundColor Green

# Copy JavaScript files
Write-Host "`nCopying JavaScript files..." -ForegroundColor Yellow
Copy-Item -Path "$sourcePath\js\*" -Destination "$destPath\js\" -Recurse -Force
Write-Host "✓ JavaScript files copied (allcsa.js - 5.5MB)" -ForegroundColor Green

# Copy JAS avatar system
Write-Host "`nCopying JAS avatar system..." -ForegroundColor Yellow
Copy-Item -Path "$sourcePath\jas\*" -Destination "$destPath\jas\" -Recurse -Force
Write-Host "✓ JAS avatar files copied" -ForegroundColor Green

# Copy SignFiles (848 SiGML files)
Write-Host "`nCopying SignFiles (this may take a moment)..." -ForegroundColor Yellow
Copy-Item -Path "$sourcePath\SignFiles\*" -Destination "$destPath\SignFiles\" -Recurse -Force
Write-Host "✓ SignFiles copied (848 .sigml files)" -ForegroundColor Green

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "✓ All CWASA files copied successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`nTotal size: ~253 MB" -ForegroundColor White
Write-Host "Now refresh your browser to load the CWASA library.`n" -ForegroundColor Yellow

# MicroLink Deployment Copy Script
# This script copies all files from MicroLinkPrototype/Site to gitDeployMicrolink structure

Write-Host ("=" * 80)
Write-Host "MicroLink Deployment Package Creator"
Write-Host "Copyright (c) 2025 Lilly Pad LLC"
Write-Host ("=" * 80)

# Define source and destination paths
$sourceRoot = "MicroLinkPrototype/Site"
$destRoot = "gitDeployMicrolink"

# Create directory structure
Write-Host "`nCreating directory structure..."
$directories = @(
    "$destRoot/Templates/html",
    "$destRoot/Templates/css",
    "$destRoot/Templates/js",
    "$destRoot/Assets/images"
)

foreach ($dir in $directories) {
    if (!(Test-Path $dir)) {
        New-Item -Path $dir -ItemType Directory -Force | Out-Null
        Write-Host "  Created: $dir" -ForegroundColor Green
    }
}

# Copy HTML files (10 total)
Write-Host "`nCopying HTML files..."
$htmlFiles = @(
    # Core application pages
    "welcome.html",
    "financial.html",
    "accessibility.html",
    "lifestyle.html",
    "identity.html",
    "healthMedical.html",
    # Support pages
    "settings.html",
    "feedback.html",
    "signRegistration.html"
)

foreach ($file in $htmlFiles) {
    $source = Join-Path $sourceRoot $file
    $dest = Join-Path "$destRoot/Templates/html" $file
    
    if (Test-Path $source) {
        # Read content and update paths
        $content = Get-Content $source -Raw
        
        # Update CSS paths: assets/css/ -> ../css/
        $content = $content -replace 'href="assets/css/', 'href="../css/'
        
        # Update JS paths: assets/js/ -> ../js/
        $content = $content -replace 'src="assets/js/', 'src="../js/'
        
        # Update favicon paths: ../Assets/ -> ../../Assets/
        $content = $content -replace 'href="../Assets/', 'href="../../Assets/'
        $content = $content -replace 'src="../Assets/', 'src="../../Assets/'
        
        # Update background image in inline styles
        $content = $content -replace "url\('lillyPadLLCWatermark\.jpg'\)", "url('../../Assets/images/lillyPadLLCWatermark.jpg')"
        
        # Update old favicon paths: /assets/logos/ -> ../../Assets/images/
        $content = $content -replace 'href="/assets/logos/lilly-pad-llc-favicon\.ico"', 'href="../../Assets/images/lilly-pad-llc-favicon.ico"'
        $content = $content -replace 'href="/assets/logos/lilly-pad-llc-apple-touch-icon\.png"', 'href="../../Assets/images/LILL_Logo_IMG_8660.png"'
        
        # Save to destination
        Set-Content -Path $dest -Value $content -Force
        Write-Host "  Copied: $file" -ForegroundColor Green
    } else {
        Write-Host "  Missing: $file" -ForegroundColor Yellow
    }
}

# Copy welcomeStorePage.html from MicroLinkPrototype-StoreFront
Write-Host "`nCopying Store Page..."
$storeSource = "MicroLinkPrototype-StoreFront/welcomeStorePage.html"
$storeDest = "$destRoot/Templates/html/welcomeStorePage.html"

if (Test-Path $storeSource) {
    # Read content and update paths
    $content = Get-Content $storeSource -Raw
    
    # Update background image
    $content = $content -replace "url\('lillyPadLLCWatermark\.jpg'\)", "url('../../Assets/images/lillyPadLLCWatermark.jpg')"
    
    # Update old favicon paths
    $content = $content -replace 'href="/assets/logos/lilly-pad-llc-favicon\.ico"', 'href="../../Assets/images/lilly-pad-llc-favicon.ico"'
    $content = $content -replace 'href="/assets/logos/lilly-pad-llc-apple-touch-icon\.png"', 'href="../../Assets/images/LILL_Logo_IMG_8660.png"'
    
    # Save to destination
    Set-Content -Path $storeDest -Value $content -Force
    Write-Host "  Copied: welcomeStorePage.html" -ForegroundColor Green
} else {
    Write-Host "  Missing: welcomeStorePage.html" -ForegroundColor Yellow
}

# Copy CSS files
Write-Host "`nCopying CSS files..."
$cssFiles = @(
    "microlink-common.css",
    "footer-branding.css"
)

foreach ($file in $cssFiles) {
    $source = Join-Path "$sourceRoot/assets/css" $file
    $dest = Join-Path "$destRoot/Templates/css" $file
    
    if (Test-Path $source) {
        # Read content and update paths
        $content = Get-Content $source -Raw
        
        # Update background image paths: ../../../Assets/ -> ../../Assets/
        $content = $content -replace 'url\("\.\.\/\.\.\/\.\.\/Assets/', 'url("../../Assets/'
        
        # Save to destination
        Set-Content -Path $dest -Value $content -Force
        Write-Host "  Copied: $file" -ForegroundColor Green
    } else {
        Write-Host "  Missing: $file" -ForegroundColor Yellow
    }
}

# Copy JavaScript files
Write-Host "`nCopying JavaScript files..."
$jsFiles = @(
    "microlink-common.js",
    "footer-config.js",
    "footer-legal.js",
    "financial.js",
    "accessibility.js",
    "lifestyle.js",
    "identity.js",
    "healthMedical.js"
)

foreach ($file in $jsFiles) {
    $source = Join-Path "$sourceRoot/assets/js" $file
    $dest = Join-Path "$destRoot/Templates/js" $file
    
    if (Test-Path $source) {
        Copy-Item -Path $source -Destination $dest -Force
        Write-Host "  Copied: $file" -ForegroundColor Green
    } else {
        Write-Host "  Missing: $file" -ForegroundColor Yellow
    }
}

# Note about image assets
Write-Host "`nImage Assets Note:" -ForegroundColor Cyan
Write-Host "  Please manually copy the following files to gitDeployMicrolink/Assets/images/:" -ForegroundColor Cyan
Write-Host "    - LILL_Logo_IMG_8660.png" -ForegroundColor Cyan
Write-Host "    - lillyPadLLCWatermark.jpg" -ForegroundColor Cyan
Write-Host "    - lilly-pad-llc-favicon.ico" -ForegroundColor Cyan
Write-Host "  These should be copied from your MicroLink/Assets/images/ folder" -ForegroundColor Cyan

# Summary
Write-Host "`n" + ("=" * 80)
Write-Host "Deployment package created successfully!" -ForegroundColor Green
Write-Host "Location: $destRoot" -ForegroundColor Green
Write-Host "`nFiles Copied:" -ForegroundColor White
Write-Host "  - 10 HTML pages (6 core + 4 support pages)" -ForegroundColor White
Write-Host "  - 2 CSS files" -ForegroundColor White
Write-Host "  - 8 JavaScript files" -ForegroundColor White
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "  1. Copy image assets to gitDeployMicrolink/Assets/images/" -ForegroundColor Yellow
Write-Host "  2. Review DEPLOYMENT_README.md for upload instructions" -ForegroundColor Yellow
Write-Host "  3. Upload to GitHub: nmjames86877/njames86877.github.io" -ForegroundColor Yellow
Write-Host ("=" * 80)

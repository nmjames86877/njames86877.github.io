# MicroLink Deployment File Copy Instructions

## Quick Copy Commands

Use these commands to copy files from your development folder to the deployment folder:

### Windows PowerShell

```powershell
# Navigate to your repository root
cd "C:\Users\Nikolo\Desktop\njames86877.github.io-main"

# Copy Core HTML files (6 files)
Copy-Item "MicroLinkPrototype\Site\welcome.html" -Destination "gitDeployMicrolink\Templates\html\" -Force
Copy-Item "MicroLinkPrototype\Site\financial.html" -Destination "gitDeployMicrolink\Templates\html\" -Force
Copy-Item "MicroLinkPrototype\Site\accessibility.html" -Destination "gitDeployMicrolink\Templates\html\" -Force
Copy-Item "MicroLinkPrototype\Site\lifestyle.html" -Destination "gitDeployMicrolink\Templates\html\" -Force
Copy-Item "MicroLinkPrototype\Site\identity.html" -Destination "gitDeployMicrolink\Templates\html\" -Force
Copy-Item "MicroLinkPrototype\Site\healthMedical.html" -Destination "gitDeployMicrolink\Templates\html\" -Force

# Copy Support HTML files (4 files)
Copy-Item "MicroLinkPrototype\Site\settings.html" -Destination "gitDeployMicrolink\Templates\html\" -Force
Copy-Item "MicroLinkPrototype\Site\feedback.html" -Destination "gitDeployMicrolink\Templates\html\" -Force
Copy-Item "MicroLinkPrototype\Site\signRegistration.html" -Destination "gitDeployMicrolink\Templates\html\" -Force
Copy-Item "MicroLinkPrototype-StoreFront\welcomeStorePage.html" -Destination "gitDeployMicrolink\Templates\html\" -Force

# Copy CSS files
Copy-Item "MicroLinkPrototype\Site\assets\css\*.css" -Destination "gitDeployMicrolink\Templates\css\" -Force

# Copy JS files
Copy-Item "MicroLinkPrototype\Site\assets\js\*.js" -Destination "gitDeployMicrolink\Templates\js\" -Force

# Copy image assets (locate these first in your MicroLink/Assets/images/ folder)
Copy-Item "path\to\LILL_Logo_IMG_8660.png" -Destination "gitDeployMicrolink\Assets\images\" -Force
Copy-Item "path\to\lillyPadLLCWatermark.jpg" -Destination "gitDeployMicrolink\Assets\images\" -Force
Copy-Item "path\to\lilly-pad-llc-favicon.ico" -Destination "gitDeployMicrolink\Assets\images\" -Force
```

### Manual File List to Copy

#### Core Application Pages (from MicroLinkPrototype\Site\)
Copy TO: `gitDeployMicrolink/Templates/html/`
- [ ] welcome.html - Main dashboard
- [ ] financial.html - Financial management
- [ ] accessibility.html - Accessibility features
- [ ] lifestyle.html - Lifestyle tools
- [ ] identity.html - Identity management
- [ ] healthMedical.html - Health & medical tracking

#### Support & Utility Pages
Copy TO: `gitDeployMicrolink/Templates/html/`
- [ ] settings.html (from MicroLinkPrototype\Site\) - Application settings
- [ ] feedback.html (from MicroLinkPrototype\Site\) - User feedback system
- [ ] signRegistration.html (from MicroLinkPrototype\Site\) - Login/Register
- [ ] welcomeStorePage.html (from MicroLinkPrototype-StoreFront\) - Store/marketplace

#### CSS Files (from MicroLinkPrototype\Site\assets\css\)
Copy TO: `gitDeployMicrolink/Templates/css/`
- [ ] microlink-common.css - Shared styles
- [ ] footer-branding.css - Footer styles

#### JavaScript Files (from MicroLinkPrototype\Site\assets\js\)
Copy TO: `gitDeployMicrolink/Templates/js/`
- [ ] microlink-common.js - Core utilities
- [ ] footer-config.js - Footer configuration
- [ ] footer-legal.js - Legal content handler
- [ ] financial.js - Financial page logic
- [ ] accessibility.js - Accessibility page logic
- [ ] lifestyle.js - Lifestyle page logic
- [ ] identity.js - Identity page logic
- [ ] healthMedical.js - Health & medical page logic

#### Image Assets (from MicroLink\Assets\images\)
Copy TO: `gitDeployMicrolink/Assets/images/`
- [ ] LILL_Logo_IMG_8660.png - Company logo
- [ ] lillyPadLLCWatermark.jpg - Background watermark
- [ ] lilly-pad-llc-favicon.ico - Favicon

## Path Updates Required

After copying, you need to update paths in HTML files:

### In Core Application HTML Files
Change:
- `href="assets/css/` ? `href="../css/`
- `src="assets/js/` ? `src="../js/`
- `href="../Assets/` ? `href="../../Assets/`

### In Support Page HTML Files
Change:
- Inline styles: `url('lillyPadLLCWatermark.jpg')` ? `url('../../Assets/images/lillyPadLLCWatermark.jpg')`
- Old paths: `href="/assets/logos/` ? `href="../../Assets/images/`
- Favicon: Update to `../../Assets/images/lilly-pad-llc-favicon.ico`

### In CSS Files
Change:
- `url("../../../Assets/` ? `url("../../Assets/`

## Automated Script

Run the PowerShell script to automate the copy process:

```powershell
.\gitDeployMicrolink\CREATE_DEPLOYMENT.ps1
```

This script will:
1. Create the directory structure
2. Copy all 10 HTML files with path updates
3. Copy all CSS files with path updates
4. Copy all JavaScript files
5. Provide instructions for image assets

## Verification Checklist

After copying all files, verify:

### File Counts
- [ ] 10 HTML files in Templates/html/ (6 core + 4 support)
- [ ] 2 CSS files in Templates/css/
- [ ] 8 JS files in Templates/js/
- [ ] 3 image files in Assets/images/

### Path Verification
- [ ] HTML files reference `../css/` for stylesheets
- [ ] HTML files reference `../js/` for scripts
- [ ] HTML files reference `../../Assets/images/` for favicon
- [ ] CSS files reference `../../Assets/images/` for backgrounds
- [ ] No absolute paths (C:\...) remain in any file
- [ ] No `/assets/logos/` paths remain (should be `../../Assets/images/`)

### Navigation Links
- [ ] All "Dashboard Top Level" buttons link to `welcome.html`
- [ ] Settings buttons link to `settings.html`
- [ ] Feedback links work
- [ ] Store page demos link correctly to other pages

## Final Structure

```
gitDeployMicrolink/
??? Templates/
?   ??? html/                [10 files]
?   ?   ??? welcome.html
?   ?   ??? financial.html
?   ?   ??? accessibility.html
?   ?   ??? lifestyle.html
?   ?   ??? identity.html
?   ?   ??? healthMedical.html
?   ?   ??? settings.html
?   ?   ??? feedback.html
?   ?   ??? signRegistration.html
?   ?   ??? welcomeStorePage.html
?   ??? css/                 [2 files]
?   ?   ??? microlink-common.css
?   ?   ??? footer-branding.css
?   ??? js/                  [8 files]
?       ??? microlink-common.js
?       ??? footer-config.js
?       ??? footer-legal.js
?       ??? financial.js
?       ??? accessibility.js
?       ??? lifestyle.js
?       ??? identity.js
?       ??? healthMedical.js
??? Assets/
?   ??? images/              [3 files]
?       ??? LILL_Logo_IMG_8660.png
?       ??? lillyPadLLCWatermark.jpg
?       ??? lilly-pad-llc-favicon.ico
??? DEPLOYMENT_README.md
??? CREATE_DEPLOYMENT.ps1
??? FILE_COPY_INSTRUCTIONS.md (this file)
```

## Page-Specific Notes

### settings.html
- Uses inline styles (no external CSS currently)
- Background image path needs update to `../../Assets/images/`
- Favicon paths need update

### feedback.html
- Contains form handling and modal functionality
- Background image path needs update
- Stores feedback in localStorage (client-side only)

### signRegistration.html
- Contains authentication simulation
- OAuth placeholders for Facebook, Google, Apple
- Background image and favicon paths need updates

### welcomeStorePage.html
- Marketplace/store page
- Contains SiriWave and shopping cart functionality
- Demo modal links to other pages
- Background image path needs update

## Ready to Deploy?

Once all files are copied and verified:

1. Review DEPLOYMENT_README.md for complete instructions
2. Test navigation between pages locally (if possible)
3. Upload gitDeployMicrolink contents to GitHub
4. Test deployed URLs:
   - Entry: signRegistration.html or welcome.html
   - Store: welcomeStorePage.html
   - Settings: settings.html
   - Feedback: feedback.html

## Common Issues

### Issue: Store Page Links Don't Work
**Solution**: Ensure all linked pages (financial.html, accessibility.html, etc.) are in the same `/Templates/html/` folder

### Issue: Settings Page Styling Broken
**Solution**: Settings page has inline styles but may need CSS file inclusion for consistency

### Issue: Feedback Form Not Saving
**Solution**: Feedback uses localStorage (client-side). For production, implement server-side storage.

### Issue: Login Page Not Authenticating
**Solution**: This is prototype/demo authentication. For production, implement real backend authentication.

---

**Copyright © 2025 Lilly Pad LLC. All Rights Reserved.**

# ?? MicroLink Deployment Quick Reference Card

## ?? What's in the Package?

```
? 10 HTML Pages (6 core + 4 support)
? 2 CSS Files (common + footer)
? 8 JavaScript Files (utilities + page logic)
? 3 Image Assets (logo + watermark + favicon)
? 4 Documentation Files (guides + instructions)
```

---

## ? Quick Start (3 Steps)

### Step 1: Run Automation Script
```powershell
cd "C:\Users\Nikolo\Desktop\njames86877.github.io-main"
.\gitDeployMicrolink\CREATE_DEPLOYMENT.ps1
```

### Step 2: Copy Images
Copy these 3 files to `gitDeployMicrolink/Assets/images/`:
- LILL_Logo_IMG_8660.png
- lillyPadLLCWatermark.jpg
- lilly-pad-llc-favicon.ico

### Step 3: Upload to GitHub
```bash
cd njames86877.github.io
cp -r gitDeployMicrolink/* MicroLink/
git add MicroLink/
git commit -m "Deploy MicroLink v2.0"
git push origin main
```

---

## ?? Test URLs After Deployment

### Main Entry Points
```
Login:     /MicroLink/Templates/html/signRegistration.html
Dashboard: /MicroLink/Templates/html/welcome.html
Store:     /MicroLink/Templates/html/welcomeStorePage.html
```

### Core Modules
```
Financial:     /MicroLink/Templates/html/financial.html
Accessibility: /MicroLink/Templates/html/accessibility.html
Lifestyle:     /MicroLink/Templates/html/lifestyle.html
Identity:      /MicroLink/Templates/html/identity.html
Health:        /MicroLink/Templates/html/healthMedical.html
```

### Support Pages
```
Settings:  /MicroLink/Templates/html/settings.html
Feedback:  /MicroLink/Templates/html/feedback.html
```

---

## ?? Path Reference

### From HTML to Assets
```
CSS:      ../css/microlink-common.css
JS:       ../js/microlink-common.js
Favicon:  ../../Assets/images/lilly-pad-llc-favicon.ico
Logo:     ../../Assets/images/LILL_Logo_IMG_8660.png
```

### From CSS to Assets
```
Background: ../../Assets/images/lillyPadLLCWatermark.jpg
```

---

## ? Pre-Upload Checklist

```
? All 10 HTML files in Templates/html/
? All 2 CSS files in Templates/css/
? All 8 JS files in Templates/js/
? All 3 images in Assets/images/
? No absolute paths (C:\...) in files
? Background paths updated in inline styles
? Favicon paths updated from /assets/logos/
```

---

## ?? Post-Upload Testing

```
1. Wait 2-3 minutes for GitHub Pages rebuild
2. Visit welcome.html (should load with background)
3. Click navigation buttons (should not 404)
4. Check browser console (no errors)
5. Test on mobile device
6. Verify favicon appears
7. Test all 10 pages load
```

---

## ?? Quick Troubleshooting

### Issue: 404 Not Found
```
Fix: Check file is in Templates/html/
Fix: Verify filename matches link exactly
Fix: Wait 3 minutes and hard refresh
```

### Issue: No Background Image
```
Fix: Verify image in Assets/images/
Fix: Check path: ../../Assets/images/lillyPadLLCWatermark.jpg
Fix: Wait for GitHub Pages rebuild
```

### Issue: Navigation Broken
```
Fix: Ensure all HTML files in same folder
Fix: Use relative paths (not absolute)
Fix: Check goToPage() function works
```

---

## ?? Full Documentation

```
COMPLETE_PACKAGE_SUMMARY.md    - This package overview
DEPLOYMENT_README.md           - Detailed deployment guide
FILE_COPY_INSTRUCTIONS.md      - Manual copy instructions
CREATE_DEPLOYMENT.ps1          - Automation script
GITHUB_PATHS.md                - Path configuration reference
```

---

## ?? Need Help?

**Email**: nicholasj@lillypadllc.onmicrosoft.com  
**GitHub Issues**: nmjames86877/njames86877.github.io/issues

---

## ?? Success Criteria

```
? All pages load without 404
? Images/logos display correctly
? Navigation works between pages
? Charts render on financial/accessibility
? SiriWave animates on dashboard
? No console errors
? Mobile responsive
? Favicon appears in browser tab
```

---

**Package Version**: 2.0 Complete  
**Status**: ? Ready for Deployment  
**Copyright**: © 2025 Lilly Pad LLC

---

?? **Pro Tip**: Bookmark this card for quick reference during deployment!

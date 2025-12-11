# Deployment Guide

This guide provides step-by-step instructions for testing and deploying the reorganized repository structure.

## Quick Start

### For Local Testing
```bash
# Clone the repository
git clone https://github.com/nmjames86877/njames86877.github.io.git
cd njames86877.github.io

# Checkout the reorganized branch
git checkout feature/hierarchical-organization

# Open in browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### For GitHub Pages Testing
1. Go to your repository settings on GitHub
2. Navigate to "Pages" section
3. Select `feature/hierarchical-organization` as the source branch
4. Click Save
5. Wait a few minutes for deployment
6. Access at: `https://nmjames86877.github.io/njames86877.github.io/`

## Pre-Deployment Checklist

Before deploying to production, verify:

- [ ] All pages load correctly
- [ ] Navigation between pages works
- [ ] Images display properly
- [ ] Audio files play correctly
- [ ] JavaScript functionality works
- [ ] CSS styling is applied
- [ ] Mobile responsiveness is maintained
- [ ] All links are functional
- [ ] No 404 errors in browser console
- [ ] Cross-product navigation works (CSC102 ↔ MicroLink)

## Testing Procedure

### 1. Test MicroLink Product
```bash
# Navigate to MicroLink
cd MicroLink/Templates/html/

# Open and test each page:
open welcome.html
open microlinkapp.html
open financial.html
open accessibility.html
open lifestyle.html
open healthMedical.html
open identity.html
open settings.html
open feedback.html
```

**What to verify:**
- Logo image loads (LILL_Logo_IMG_8660.png)
- Chart images display (pie-chart.png)
- Navigation between MicroLink pages works
- CSS styling is applied
- JavaScript functions work

### 2. Test Educational-Academic-Portfolio Product
```bash
# Navigate to Educational-Academic-Portfolio
cd Educational-Academic-Portfolio/Templates/html/

# Open and test each page:
open index.html
open boards.html
open game.html
open strings.html
```

**What to verify:**
- Frog images display correctly
- OIP.jpg image loads on index page
- CSS styling is applied
- Game functionality works
- String manipulation tools work
- Audio files play (ISS-sounds.mp3, frog-noises.mp3)

### 3. Test Landing Page
```bash
# Navigate to root
cd ../../..

# Open landing page
open index.html
```

**What to verify:**
- Landing page displays correctly
- Links to both products work
- Responsive design on mobile/tablet/desktop
- Professional appearance

### 4. Test Cross-Product Navigation
- From Educational-Academic-Portfolio index.html, click "MicroLink" link
- Verify it navigates to MicroLink welcome page
- Navigate back using browser back button
- Test all cross-product links

## Common Issues and Solutions

### Issue: Images not loading
**Symptom:** Broken image icons or missing images
**Solution:** 
- Verify image paths use correct relative paths
- Check: `../../Assets/images/filename.jpg` for images from Templates/html/
- Ensure image files exist in Assets/images/

### Issue: CSS not applied
**Symptom:** Unstyled or raw HTML display
**Solution:**
- Verify CSS paths use `../css/filename.css` from Templates/html/
- Check browser console for 404 errors
- Ensure CSS files exist in Templates/css/

### Issue: JavaScript not working
**Symptom:** Interactive features don't work
**Solution:**
- Verify JS paths use `../js/filename.js` from Templates/html/
- Check browser console for errors
- Ensure JS files exist in Templates/js/

### Issue: Audio not playing
**Symptom:** No sound or audio file not found errors
**Solution:**
- For CSC102 audio: Use `../../Assets/audio/filename.mp3`
- For MicroLink audio from CSC102: Use `../../../MicroLink/Assets/audio/filename.mp3`
- Check browser console for 404 errors

## Deployment Options

### Option 1: GitHub Pages (Recommended for Testing)
**Best for:** Public testing, sharing with stakeholders

1. Push `feature/hierarchical-organization` to GitHub
2. Enable GitHub Pages from repository settings
3. Select the branch to deploy
4. Access at provided URL

**Pros:**
- Free hosting
- Easy setup
- Automatic HTTPS
- Good for testing

**Cons:**
- Public repository required (or GitHub Pro for private)
- Limited server-side processing

### Option 2: Production Server Deployment
**Best for:** Final production deployment

1. Test thoroughly using GitHub Pages first
2. Merge `feature/hierarchical-organization` to your main/production branch
3. Deploy to your production server using your standard deployment process
4. Verify all functionality in production environment

### Option 3: Local Development Server
**Best for:** Active development and testing

```bash
# Using Python 3
cd /path/to/repository
python3 -m http.server 8000

# Access at: http://localhost:8000
```

```bash
# Using Node.js (if you have http-server installed)
cd /path/to/repository
npx http-server -p 8000

# Access at: http://localhost:8000
```

## Rollback Procedure

If issues are discovered after deployment:

1. **Quick Rollback:**
   ```bash
   git checkout archive/main-original
   git push origin archive/main-original:main --force
   ```

2. **Investigate and Fix:**
   - Review the issue
   - Fix in `feature/hierarchical-organization` branch
   - Test thoroughly
   - Deploy again

3. **Partial Rollback:**
   - Keep new structure
   - Cherry-pick specific fixes from archive branch
   - Test and deploy

## Post-Deployment Tasks

After successful deployment:

1. **Monitor:**
   - Check error logs
   - Monitor user feedback
   - Watch for 404 errors
   - Verify analytics tracking

2. **Document:**
   - Update any deployment documentation
   - Record deployment date and version
   - Document any issues and resolutions

3. **Clean Up:**
   - Remove old branches if no longer needed
   - Update documentation
   - Archive old deployment artifacts

4. **Communicate:**
   - Notify team of successful deployment
   - Share testing results
   - Document lessons learned

## Performance Considerations

The new structure should improve performance:
- Better caching due to organized file structure
- Easier CDN configuration
- Clearer resource prioritization

Monitor:
- Page load times
- Resource loading order
- Cache hit rates
- Mobile performance

## Security Notes

✅ **Security Review Completed:** No vulnerabilities found by CodeQL analysis

Continue to:
- Keep dependencies updated
- Review code for security issues
- Use HTTPS in production
- Implement CSP headers
- Sanitize user inputs

## Support

For questions or issues:
1. Check README.md for structure information
2. Check BRANCH_GUIDE.md for branch details
3. Review this DEPLOYMENT_GUIDE.md
4. Contact: Nicholas M James [@nmjames86877](https://github.com/nmjames86877)

## Version History

- **v1.0** (Current): Initial hierarchical organization
  - Archive branch created
  - Files reorganized by product and type
  - All paths updated
  - Documentation added
  - Tested and verified

# Assets Directory

This directory contains static assets for the LILL Freelance portfolio website.

## Structure

```
assets/
??? favicon.ico          # Website favicon
??? images/              # Project images and screenshots
?   ??? projects/
?   ??? profile/
??? documents/           # Downloadable documents
    ??? resume.pdf
    ??? portfolio.pdf
```

## Usage

### Adding Images
1. Place images in appropriate subdirectories
2. Reference in HTML: `<img src="./assets/images/filename.jpg" alt="Description">`

### Adding Documents
1. Place PDFs or documents in `documents/` folder
2. Link in HTML: `<a href="./assets/documents/resume.pdf" download>Download Resume</a>`

### Favicon
- Replace `favicon.ico` with your custom favicon
- Recommended size: 32x32 or 16x16 pixels
- Format: .ico, .png, or .svg

## Image Optimization

For best performance:
- Compress images before uploading
- Use appropriate formats (JPEG for photos, PNG for graphics)
- Consider using WebP for modern browsers
- Keep file sizes under 500KB when possible

## Recommended Tools

- **Image Compression**: TinyPNG, ImageOptim
- **Favicon Generator**: favicon.io, realfavicongenerator.net
- **Image Editing**: GIMP, Photoshop, Canva


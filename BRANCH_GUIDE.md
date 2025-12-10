# Branch Guide

This repository has been reorganized with multiple branches for different purposes. This guide explains each branch and how to use them.

## Branches Overview

### 1. `archive/main-original`
**Purpose:** Archive of the original repository state

This branch preserves the exact state of the repository before reorganization (commit `93663f8`). Use this branch if you need to reference or restore the original flat file structure.

**Characteristics:**
- All files in root directory
- No hierarchical organization
- Original file paths and references
- Read-only archive for historical reference

**To view this branch:**
```bash
git checkout archive/main-original
```

### 2. `feature/hierarchical-organization`
**Purpose:** New hierarchical organization structure

This is the main reorganized branch with files structured by product/project, then separated into Templates (by type: html, css, js) and Assets (by type: images, audio, documents).

**Structure:**
```
/
├── index.html                    # Landing page
├── README.md                     # Repository documentation
├── LICENSE                       # License file
├── MicroLink/                    # MicroLink product
│   ├── Templates/
│   │   ├── html/
│   │   ├── css/
│   │   └── js/
│   └── Assets/
│       ├── images/
│       ├── audio/
│       └── documents/
└── CSC102-Portfolio/             # CSC102 educational portfolio
    ├── Templates/
    │   ├── html/
    │   ├── css/
    │   └── js/
    └── Assets/
        ├── images/
        └── audio/
```

**Key Changes:**
- All file paths updated to reflect new structure
- New root `index.html` landing page created
- Comprehensive README.md added
- Files organized by product and type
- All references and imports updated

**To view this branch:**
```bash
git checkout feature/hierarchical-organization
```

**To access the applications:**
- **Landing Page:** Open `index.html` in your browser
- **MicroLink:** `MicroLink/Templates/html/welcome.html`
- **CSC102 Portfolio:** `CSC102-Portfolio/Templates/html/index.html`

### 3. `copilot/create-archiving-structure`
**Purpose:** Working branch for this reorganization task

This is the branch where the reorganization work was performed. It has the same content as `feature/hierarchical-organization`.

## Testing and Deployment

### Local Testing
1. Clone the repository
2. Checkout the desired branch:
   ```bash
   git checkout feature/hierarchical-organization
   ```
3. Open `index.html` in your browser
4. Navigate to each product to verify functionality

### GitHub Pages Deployment
The repository is configured to be public-facing for testing purposes.

**To deploy for testing:**
1. Push the desired branch to GitHub
2. Configure GitHub Pages to serve from that branch
3. Access via: `https://nmjames86877.github.io/njames86877.github.io/`

### Production Deployment
Before deploying to production:
1. Test all functionality on `feature/hierarchical-organization` branch
2. Verify all file paths work correctly
3. Check all images, audio, and assets load properly
4. Test navigation between pages
5. Merge to main branch (or your production branch)

## Branch Comparison

| Feature | archive/main-original | feature/hierarchical-organization |
|---------|----------------------|-----------------------------------|
| File Structure | Flat (all in root) | Hierarchical (by product/type) |
| Organization | None | Product → Template/Asset → Type |
| File Paths | Original | Updated |
| Landing Page | Basic index.html | New professional landing page |
| Documentation | None | Comprehensive README |
| Maintainability | Low | High |
| Scalability | Low | High |

## Migration Notes

The reorganization included:
1. ✅ Created archive branch from original state
2. ✅ Created hierarchical organization structure
3. ✅ Moved all files to appropriate directories
4. ✅ Updated all file references and paths
5. ✅ Created new landing page
6. ✅ Added comprehensive documentation
7. ✅ Removed duplicate nested directories

All file paths in HTML, CSS, and JavaScript files have been updated to work with the new structure.

## Next Steps

1. **Testing:** Thoroughly test the `feature/hierarchical-organization` branch
2. **Review:** Have team members review the new structure
3. **Merge:** Once approved, merge to your main/production branch
4. **Deploy:** Deploy to production environments
5. **Archive:** Keep `archive/main-original` for historical reference

## Questions or Issues?

If you encounter any issues with file paths, missing files, or broken references, please:
1. Check the README.md for the correct file structure
2. Verify you're on the correct branch
3. Review the commit history to understand changes
4. Reference the `archive/main-original` branch for original file locations

## Contact

Nicholas M James - [@nmjames86877](https://github.com/nmjames86877)

# Nicholas M James - Portfolio & Projects

This repository contains three main products organized hierarchically for easy navigation and maintenance, with environment-based deployment structure.

## Repository Structure

The repository is organized using a hierarchical structure with environment separation:
- **Product/Project** → **Environment (prod/staging/test)** → **Assets by Type and Templates by Type**

Each product has three environments:
- **prod**: Production environment with professional naming conventions (public-facing)
- **staging**: Pre-production testing environment with `stg_` prefix on files
- **test**: Development/testing environment with `dev_` prefix on files

```
/
├── index.html                          # Landing page (points to prod environments)
├── LICENSE                             # Repository license
├── README.md                           # This file
│
├── ElizabethAI/                        # Elizabeth AI Product
│   ├── index.html                      # Product landing (redirects to prod)
│   ├── Templates/                      # Original templates (maintained for reference)
│   ├── Assets/                         # Original assets (maintained for reference)
│   │
│   ├── prod/                           # PRODUCTION Environment
│   │   ├── Templates/
│   │   │   ├── html/                   # Production HTML (professional naming)
│   │   │   │   └── elizabeth.html
│   │   │   ├── css/                    # Production stylesheets
│   │   │   └── js/                     # Production JavaScript
│   │   └── Assets/
│   │       └── images/                 # Production image assets
│   │
│   ├── staging/                        # STAGING Environment (stg_ prefix)
│   │   ├── Templates/
│   │   │   ├── html/                   # Staging HTML files
│   │   │   │   └── stg_elizabeth.html
│   │   │   ├── css/                    # Staging stylesheets
│   │   │   │   └── stg_styles.css
│   │   │   └── js/                     # Staging JavaScript
│   │   │       └── stg_elizabeth.js
│   │   └── Assets/
│   │       └── images/                 # Staging assets
│   │
│   └── test/                           # TEST/DEV Environment (dev_ prefix)
│       ├── Templates/
│       │   ├── html/                   # Development HTML files
│       │   │   └── dev_elizabeth.html
│       │   ├── css/                    # Development stylesheets
│       │   │   └── dev_styles.css
│       │   └── js/                     # Development JavaScript
│       │       └── dev_elizabeth.js
│       └── Assets/
│           └── images/                 # Development assets
│
├── MicroLink/                          # MicroLink Product
│   ├── index.html                      # Product landing (redirects to prod)
│   ├── Templates/                      # Original templates (maintained for reference)
│   ├── Assets/                         # Original assets (maintained for reference)
│   │
│   ├── prod/                           # PRODUCTION Environment
│   │   ├── Templates/
│   │   │   ├── html/                   # Production HTML (professional naming)
│   │   │   │   ├── welcome.html
│   │   │   │   ├── welcomeStorePage.html
│   │   │   │   ├── financial.html
│   │   │   │   ├── microlinkapp.html
│   │   │   │   └── [14 total files]
│   │   │   ├── css/                    # Production stylesheets
│   │   │   └── js/                     # Production JavaScript
│   │   └── Assets/
│   │       ├── images/                 # Production images
│   │       ├── audio/                  # Production audio files
│   │       └── documents/              # Production documents
│   │
│   ├── staging/                        # STAGING Environment (stg_ prefix)
│   │   ├── Templates/
│   │   │   ├── html/                   # Staging HTML files (stg_*.html)
│   │   │   ├── css/                    # Staging stylesheets (stg_*.css)
│   │   │   └── js/                     # Staging JavaScript (stg_*.js)
│   │   └── Assets/
│   │       ├── images/
│   │       ├── audio/
│   │       └── documents/
│   │
│   └── test/                           # TEST/DEV Environment (dev_ prefix)
│       ├── Templates/
│       │   ├── html/                   # Development HTML files (dev_*.html)
│       │   ├── css/                    # Development stylesheets (dev_*.css)
│       │   └── js/                     # Development JavaScript (dev_*.js)
│       └── Assets/
│           ├── images/
│           ├── audio/
│           └── documents/
│
└── CSC102-Portfolio/                  # CSC102 Portfolio Product
    ├── index.html                     # Product landing (redirects to prod)
    ├── Templates/                     # Original templates (maintained for reference)
    ├── Assets/                        # Original assets (maintained for reference)
    │
    ├── prod/                          # PRODUCTION Environment
    │   ├── Templates/
    │   │   ├── html/                  # Production HTML (professional naming)
    │   │   │   ├── index.html
    │   │   │   ├── boards.html
    │   │   │   ├── game.html
    │   │   │   └── strings.html
    │   │   ├── css/                   # Production stylesheets
    │   │   └── js/                    # Production JavaScript
    │   └── Assets/
    │       ├── images/                # Production images
    │       └── audio/                 # Production audio files
    │
    ├── staging/                       # STAGING Environment (stg_ prefix)
    │   ├── Templates/
    │   │   ├── html/                  # Staging HTML files (stg_*.html)
    │   │   ├── css/                   # Staging stylesheets (stg_*.css)
    │   │   └── js/                    # Staging JavaScript (stg_*.js)
    │   └── Assets/
    │       ├── images/
    │       └── audio/
    │
    └── test/                          # TEST/DEV Environment (dev_ prefix)
        ├── Templates/
        │   ├── html/                  # Development HTML files (dev_*.html)
        │   ├── css/                   # Development stylesheets (dev_*.css)
        │   └── js/                    # Development JavaScript (dev_*.js)
        └── Assets/
            ├── images/
            └── audio/
```

## Products

### Elizabeth AI
Elizabeth™ - Your AI Companion & Guardian. An advanced AI interface featuring:
- Multiple interaction modes (Friend, Business, Legal, Life Coach, Relationship, Guardian)
- Voice synthesis with customizable pitch, rate, and volume
- 3D avatar visualization with facial animations
- Comprehensive human rights protection mode
- Emergency resources and crisis support
- Interactive chat interface with emotional context

**Entry Points:** 
- Production: `ElizabethAI/prod/Templates/html/elizabeth.html`
- Staging: `ElizabethAI/staging/Templates/html/stg_elizabeth.html`
- Test/Dev: `ElizabethAI/test/Templates/html/dev_elizabeth.html`

### MicroLink
MicroLink is an innovative web-based platform that provides:
- Financial tracking and management
- Health and medical record tracking
- Lifestyle and social media integration
- Accessibility management and tracking 
- Identity tracking and record management
- Interactive voice and visual interfaces

**Entry Points:**
- Production: `MicroLink/prod/Templates/html/welcome.html`
- Staging: `MicroLink/staging/Templates/html/stg_welcome.html`
- Test/Dev: `MicroLink/test/Templates/html/dev_welcome.html`

### CSC102 Portfolio
Educational portfolio showcasing projects from CSC 102 Computer Science course, including:
- Interactive games and exercises
- String manipulation demonstrations
- Visual board games
- Programming fundamentals

**Entry Points:**
- Production: `CSC102-Portfolio/prod/Templates/html/index.html`
- Staging: `CSC102-Portfolio/staging/Templates/html/stg_index.html`
- Test/Dev: `CSC102-Portfolio/test/Templates/html/dev_index.html`

## Environment Structure

Each product now has three separate environments with distinct purposes:

### Production (prod/)
- **Purpose**: Public-facing deployment
- **Naming**: Professional naming conventions (no prefixes)
- **Files**: `welcome.html`, `elizabeth.html`, `index.html`, etc.
- **Access**: Default environment when accessing products via root `index.html`
- **Use Case**: Live production deployment, end-user access

### Staging (staging/)
- **Purpose**: Pre-production testing and validation
- **Naming**: Files prefixed with `stg_` (e.g., `stg_welcome.html`, `stg_elizabeth.html`)
- **Files**: `stg_*.html`, `stg_*.css`, `stg_*.js`
- **Access**: Direct navigation to staging environment folders
- **Use Case**: Testing before production deployment, stakeholder reviews

### Test/Dev (test/)
- **Purpose**: Development and testing environment
- **Naming**: Files prefixed with `dev_` (e.g., `dev_welcome.html`, `dev_elizabeth.html`)
- **Files**: `dev_*.html`, `dev_*.css`, `dev_*.js`
- **Access**: Direct navigation to test environment folders
- **Use Case**: Active development, experimentation, debugging

### Path References
All internal file references have been updated to maintain proper navigation within each environment:
- HTML links reference environment-specific files (e.g., `dev_welcome.html` links to `dev_settings.html`)
- CSS/JS references use environment-specific filenames (e.g., `dev_*.css`, `stg_*.js`)
- Asset paths remain relative to environment root (`../../Assets/`)
- Cross-product references point to same environment (test→test, staging→staging, prod→prod)

## Branches

- **`archive/main-original`**: Archive of the original main branch state (commit 93663f8)
- **`feature/hierarchical-organization`**: This branch with the new hierarchical structure

## Usage

### Local Development
1. Clone the repository
2. Open `index.html` in your browser to access the landing page (defaults to **prod** environment)
3. Navigate to specific products using the links provided
4. For testing/development:
   - Access test environment: `[Product]/test/Templates/html/dev_*.html`
   - Access staging environment: `[Product]/staging/Templates/html/stg_*.html`

### GitHub Pages
The repository is configured to be public-facing. When deployed to GitHub Pages:
- The root landing page provides access to all products in **production** environment
- Each product's `index.html` redirects to its production environment
- Staging and test environments are accessible via direct URL paths

## Migration Notes

This reorganization was performed to:
1. Archive the original repository state
2. Create a hierarchical organization by product/project
3. Separate templates (HTML, CSS, JS) from assets (images, audio, documents)
4. Add environment-based deployment structure (prod/staging/test)
5. Implement environment-specific naming conventions for clarity
6. Make the structure more maintainable and scalable
7. Enable proper separation of development, staging, and production code

All file paths have been updated to reflect the new structure. The original state is preserved in the `archive/main-original` branch.

### Environment Naming Conventions
- **Production files**: No prefix (professional public-facing names)
- **Staging files**: `stg_` prefix for easy identification
- **Test/Dev files**: `dev_` prefix for development clarity

## License

See [LICENSE](LICENSE) file for details.

## Contact

Nicholas M James - [@nmjames86877](https://github.com/nmjames86877)

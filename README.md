# Nicholas M James - Portfolio & Projects

This repository contains two main products organized hierarchically for easy navigation and maintenance.

## Repository Structure

The repository is organized using a hierarchical structure based on Product/Project → Assets by Type and Templates by Type:

```
/
├── index.html                          # Landing page for all products
├── LICENSE                             # Repository license
├── README.md                           # This file
│
├── MicroLink/                          # MicroLink Product
│   ├── Templates/
│   │   ├── html/                       # HTML templates
│   │   │   ├── welcome.html           # Main landing page
│   │   │   ├── welcomeStorePage.html  # Store page
│   │   │   ├── financial.html         # Financial management
│   │   │   ├── accessibility.html     # Accessibility features
│   │   │   ├── lifestyle.html         # Lifestyle tools
│   │   │   ├── healthMedical.html     # Health & medical tracking
│   │   │   ├── identity.html          # Identity management
│   │   │   ├── feedback.html          # User feedback
│   │   │   ├── settings.html          # Application settings
│   │   │   ├── registrationLogIn.html # User authentication
│   │   │   ├── signRegistration.html  # User registration
│   │   │   ├── microLinkSite.html     # Site information
│   │   │   ├── microlinkapp.html      # Main application
│   │   │   ├── elizabeth.html         # Elizabeth AI interface
│   │   │   ├── apiFetch.html          # API demonstration
│   │   │   └── inProgress.html        # Work in progress page
│   │   ├── css/                       # Stylesheets
│   │   │   ├── welcomeStyle.css
│   │   │   ├── financialStyle.css
│   │   │   ├── registrationLogInStyle.css
│   │   │   ├── microlinkappStyles.css
│   │   │   ├── apiFetchStyle.css
│   │   │   └── styles.css
│   │   └── js/                        # JavaScript files
│   │       ├── welcomeCode.js
│   │       ├── financialCode.js
│   │       ├── registrationLogInCode.js
│   │       ├── microlinkappEngine.js
│   │       ├── elizabeth.js
│   │       └── apiFetchCode.js
│   └── Assets/
│       ├── images/                    # Image assets
│       │   ├── LILL_Logo_IMG_8660.png
│       │   ├── lillyPadLLCWatermark.jpg
│       │   ├── pinkwaterlillywithwaterdroplets.jpg
│       │   └── pie-chart.png
│       ├── audio/                     # Audio files
│       │   └── ISS-sounds.mp3
│       └── documents/                 # PDF and document files
│           ├── appointmentReminders.pdf
│           ├── entertainmentViewing.pdf
│           ├── investmentPerformance.pdf
│           ├── profileUpdates.pdf
│           ├── voiceCommandUsage.pdf
│           ├── complaints.csv
│           ├── feedbackComments.csv
│           ├── HCI101 3.2 Human Computer Interfaces.docx
│           └── HCI101 3.2 Human Computer Interfaces.pdf
│
└── CSC102-Portfolio/                  # CSC102 Portfolio Product
    ├── Templates/
    │   ├── html/                      # HTML templates
    │   │   ├── index.html            # Portfolio home page
    │   │   ├── boards.html           # Boards game/exercise
    │   │   ├── game.html             # Interactive game
    │   │   └── strings.html          # String manipulation tools
    │   ├── css/                       # Stylesheets
    │   │   ├── style.css
    │   │   ├── gameStyle.css
    │   │   └── stringsStyle.css
    │   └── js/                        # JavaScript files
    │       ├── indexCode.js
    │       ├── gameCode.js
    │       └── stringsCode.js
    └── Assets/
        ├── images/                    # Image assets
        │   ├── crownwithspeakingmyfrgprnztatoos.jpg
        │   ├── gobletmyfrgprnztatoos.jpg
        │   ├── hoppingmyfrgprnztatoos.jpg
        │   ├── whyarefrogssohappy.jpg
        │   └── OIP.jpg
        └── audio/                     # Audio files
            └── frog-noises.mp3
```

## Products

### MicroLink
MicroLink is an innovative web-based platform that provides:
- AI-powered assistance (Elizabeth AI)
- Financial tracking and management
- Health and medical record tracking
- Lifestyle and accessibility tools
- User authentication and registration
- Interactive voice and visual interfaces

**Entry Point:** `MicroLink/Templates/html/welcome.html`

### CSC102 Portfolio
Educational portfolio showcasing projects from CSC 102 Computer Science course, including:
- Interactive games and exercises
- String manipulation demonstrations
- Visual board games
- Programming fundamentals

**Entry Point:** `CSC102-Portfolio/Templates/html/index.html`

## Branches

- **`archive/main-original`**: Archive of the original main branch state (commit 93663f8)
- **`feature/hierarchical-organization`**: This branch with the new hierarchical structure

## Usage

### Local Development
1. Clone the repository
2. Open `index.html` in your browser to access the landing page
3. Navigate to specific products using the links provided

### GitHub Pages
The repository is configured to be public-facing for testing purposes. When deployed to GitHub Pages, the landing page at the root will provide access to both products.

## Migration Notes

This reorganization was performed to:
1. Archive the original repository state
2. Create a hierarchical organization by product/project
3. Separate templates (HTML, CSS, JS) from assets (images, audio, documents)
4. Make the structure more maintainable and scalable
5. Enable public-facing testing before final deployment

All file paths have been updated to reflect the new structure. The original state is preserved in the `archive/main-original` branch.

## License

See [LICENSE](LICENSE) file for details.

## Contact

Nicholas M James - [@nmjames86877](https://github.com/nmjames86877)

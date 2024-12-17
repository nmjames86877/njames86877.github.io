document.addEventListener('DOMContentLoaded', () => {
    // Show the register/login screen by default
    document.getElementById('register-login').style.display = 'block';
});

function login() {
    // Hide the register/login screen
    document.getElementById('register-login').style.display = 'none';
    // Show the welcome screen with animation
    const welcomeScreen = document.getElementById('welcome');
    welcomeScreen.style.display = 'block';
    welcomeScreen.classList.add('fade-in');
}

function goToWelcome() {
    // Hide all sections
    hideAllSections();
    // Show the welcome screen with animation
    const welcomeScreen = document.getElementById('welcome');
    welcomeScreen.style.display = 'block';
    welcomeScreen.classList.add('fade-in');
}

function goToFinance() {
    // Hide all sections
    hideAllSections();
    // Show the finance section with animation
    const financeSection = document.getElementById('finance');
    financeSection.style.display = 'block';
    financeSection.classList.add('fade-in');
}

function goToAccessibility() {
    // Hide all sections
    hideAllSections();
    // Show the accessibility section with animation
    const accessibilitySection = document.getElementById('accessibility');
    accessibilitySection.style.display = 'block';
    accessibilitySection.classList.add('fade-in');
}

function goToLifestyle() {
    // Hide all sections
    hideAllSections();
    // Show the lifestyle section with animation
    const lifestyleSection = document.getElementById('lifestyle');
    lifestyleSection.style.display = 'block';
    lifestyleSection.classList.add('fade-in');
}

function goToIdentity() {
    // Hide all sections
    hideAllSections();
    // Show the identity section with animation
    const identitySection = document.getElementById('identity');
    identitySection.style.display = 'block';
    identitySection.classList.add('fade-in');
}

function goToHealth() {
    // Hide all sections
    hideAllSections();
    // Show the health section with animation
    const healthSection = document.getElementById('health');
    healthSection.style.display = 'block';
    healthSection.classList.add('fade-in');
}

function hideAllSections() {
    const sections = document.querySelectorAll('.register-login, .welcome, .finance, .accessibility, .lifestyle, .identity, .health');
    sections.forEach(section => {
        section.style.display = 'none';
        section.classList.remove('fade-in');
    });
}

// Placeholder functions for data connections
function fetchBudgetOverview() {
    // Fetch and display budget overview data
}

function fetchInvestmentPerformance() {
    // Fetch and display investment performance data
}

function fetchLoanSummary() {
    // Fetch and display loan summary data
}

function fetchBankingInstitutionDetails() {
    // Fetch and display banking institution details
}

function fetchCreditBureauDetails() {
    // Fetch and display credit bureau details
}

function fetchBrokerageFirmDetails() {
    // Fetch and display brokerage firm details
}

function fetchFinanceAppsDetails() {
    // Fetch and display finance apps details
}

function fetchVoiceCommands() {
    // Fetch and display voice commands
}

function fetchHighContrastMode() {
    // Fetch and display high contrast mode settings
}

function fetchFontSizeAdjustment() {
    // Fetch and display font size adjustment settings
}

function fetchScreenReaderDetails() {
    // Fetch and display screen reader details
}

function fetchTextToSpeechDetails() {
    // Fetch and display text-to-speech details
}

function fetchMagnifierDetails() {
    // Fetch and display magnifier details
}

function fetchKeyboardShortcuts() {
    // Fetch and display keyboard shortcuts
}

function fetchSocialFeed() {
    // Fetch and display social feed data
}

function fetchEntertainmentHighlights() {
    // Fetch and display entertainment highlights
}

function fetchUpcomingEvents() {
    // Fetch and display upcoming events
}

function fetchFriendsActivities() {
    // Fetch and display friends' activities
}

function fetchMediaLibrary() {
    // Fetch and display media library
}

function fetchEventInvitations() {
    // Fetch and display event invitations
}

function fetchStreamingServices() {
    // Fetch and display streaming services
}

function fetchProfile() {
    // Fetch and display profile data
}

function fetchSecuritySettings() {
    // Fetch and display security settings
}

function fetchDigitalIDCards() {
    // Fetch and display digital ID cards
}

function fetchIdentityMonitoringAlerts() {
    // Fetch and display identity monitoring alerts
}

function fetchRecentActivities() {
    // Fetch and display recent activities
}

function fetchMedicalID() {
    // Fetch and display medical ID
}

function fetchInsuranceCard() {
    // Fetch and display insurance card
}

function fetchVaccinationRecords() {
    // Fetch and display vaccination records
}

function fetchAllDataAgencies() {
    // Fetch and display all data agencies records and reports
}

function fetchHealthSummary() {
    // Fetch and display health summary data
}

function fetchAppointmentReminders() {
    // Fetch and display appointment reminders
}

function fetchMedicationTracker() {
    // Fetch and display medication tracker data
}

function fetchHeartRate() {
    // Fetch and display heart rate data
}

function fetchSleepData() {
    // Fetch and display sleep data
}

function fetchMedicalRecords() {
    // Fetch and display medical records
}

function fetchMedicalProviders() {
    // Fetch and display medical providers data
}
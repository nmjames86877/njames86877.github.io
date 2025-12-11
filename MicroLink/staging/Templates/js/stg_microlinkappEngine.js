document.addEventListener('DOMContentLoaded', () => {
    // Show the register/login screen by default
    document.getElementById('welcome').style.display = 'block';
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

function goToBankingInstitution() {
    // Hide all sections
    hideAllSections();
    // Show the banking institution screen with animation
    const bankingInstitutionScreen = document.getElementById('banking-institution-screen');
    bankingInstitutionScreen.style.display = 'block';
    bankingInstitutionScreen.classList.add('fade-in');
}

function goToCreditBureau() {
    // Hide all sections
    hideAllSections();
    // Show the credit bureau screen with animation
    const creditBureauScreen = document.getElementById('credit-bureau-screen');
    creditBureauScreen.style.display = 'block';
    creditBureauScreen.classList.add('fade-in');
}

function goToBrokerageFirm() {
    // Hide all sections
    hideAllSections();
    // Show the brokerage firm screen with animation
    const brokerageFirmScreen = document.getElementById('brokerage-firm-screen');
    brokerageFirmScreen.style.display = 'block';
    brokerageFirmScreen.classList.add('fade-in');
}

function goToFinanceApps() {
    // Hide all sections
    hideAllSections();
    // Show the finance apps screen with animation
    const financeAppsScreen = document.getElementById('finance-apps-screen');
    financeAppsScreen.style.display = 'block';
    financeAppsScreen.classList.add('fade-in');
}

function goToScreenReader() {
    // Hide all sections
    hideAllSections();
    // Show the screen reader screen with animation
    const screenReaderScreen = document.getElementById('screen-reader-screen');
    screenReaderScreen.style.display = 'block';
    screenReaderScreen.classList.add('fade-in');
}

function goToTextToSpeech() {
    // Hide all sections
    hideAllSections();
    // Show the text-to-speech screen with animation
    const textToSpeechScreen = document.getElementById('text-to-speech-screen');
    textToSpeechScreen.style.display = 'block';
    textToSpeechScreen.classList.add('fade-in');
}

function goToMagnifier() {
    // Hide all sections
    hideAllSections();
    // Show the magnifier screen with animation
    const magnifierScreen = document.getElementById('magnifier-screen');
    magnifierScreen.style.display = 'block';
    magnifierScreen.classList.add('fade-in');
}

function goToKeyboardShortcuts() {
    // Hide all sections
    hideAllSections();
    // Show the keyboard shortcuts screen with animation
    const keyboardShortcutsScreen = document.getElementById('keyboard-shortcuts-screen');
    keyboardShortcutsScreen.style.display = 'block';
    keyboardShortcutsScreen.classList.add('fade-in');
}

function hideAllSections() {
    const sections = document.querySelectorAll('.register-login, .welcome, .finance, .accessibility, .lifestyle, .identity, .health, .banking-institution, .credit-bureau, .brokerage-firm, .finance-apps, .screen-reader, .text-to-speech, .magnifier, .keyboard-shortcuts');
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

// Additional functions for new features
function transferFunds() {
    // Handle fund transfer logic
    const sourceAccount = document.getElementById('source-account').value;
    const destinationAccount = document.getElementById('destination-account').value;
    const amount = document.getElementById('transfer-amount').value;
    // Placeholder for transfer logic
    document.getElementById('transfer-confirmation').innerText = `Transferred $${amount} from ${sourceAccount} to ${destinationAccount}.`;
}

function disputeCreditReport() {
    // Handle credit report dispute logic
    // Placeholder for dispute logic
    alert('Dispute submitted.');
}

function newTrade() {
    // Handle new trade logic
    // Placeholder for new trade logic
    alert('New trade initiated.');
}

function addExpense() {
    // Handle adding new expense logic
    // Placeholder for add expense logic
    alert('Expense added.');
}

function adjustBudget() {
    // Handle budget adjustment logic
    const budgetAmounts = document.getElementById('budget-amounts').value;
    // Placeholder for adjust budget logic
    alert(`Budget adjusted to $${budgetAmounts}.`);
}

function saveScreenReaderSettings() {
    // Handle saving screen reader settings
    const voiceSelection = document.getElementById('voice-selection').value;
    const speedAdjustment = document.getElementById('speed-adjustment').value;
    const customCommands = document.getElementById('custom-commands').value;
    // Placeholder for save settings logic
    document.getElementById('screen-reader-confirmation').innerText = 'Settings saved.';
}

function enableTextToSpeech() {
    // Handle enabling text-to-speech
    document.getElementById('text-to-speech-status').innerText = 'On';
}

function saveTextToSpeechSettings() {
    // Handle saving text-to-speech settings
    const voiceSelection = document.getElementById('tts-voice-selection').value;
    const speedAdjustment = document.getElementById('tts-speed-adjustment').value;
    const customPhrases = document.getElementById('custom-phrases').value;
    // Placeholder for save settings logic
    document.getElementById('tts-confirmation').innerText = 'Settings saved.';
}

function activateMagnifier() {
    // Handle activating magnifier
    document.getElementById('magnifier-status').innerText = 'On';
}

function saveMagnifierSettings() {
    // Handle saving magnifier settings
    const magnificationLevel = document.getElementById('magnification-level').value;
    const magnificationMode = document.getElementById('magnification-mode').value;
    // Placeholder for save settings logic
    document.getElementById('magnifier-confirmation').innerText = 'Settings saved.';
}

function saveShortcut() {
    // Handle saving custom shortcut
    const customShortcut = document.getElementById('custom-shortcut').value;
    // Placeholder for save shortcut logic
    document.getElementById('shortcut-confirmation').innerText = 'Shortcut saved.';
}

  var siriWave = new SiriWave({
    container: document.getElementById('siri-container'),
    width: 640,
    height: 200,
    style: 'ios9',
    speed: 0.2,
    amplitude: 1,
    frequency: 6,
    color: '#ff0000',
    autostart: true
  });

  // Change color on device movement
  window.addEventListener('deviceorientation', function(event) {
    var hue = Math.round(event.alpha);
    siriWave.color = `hsl(${hue}, 100%, 50%)`;
  });
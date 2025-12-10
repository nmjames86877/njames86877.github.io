document.addEventListener('DOMContentLoaded', () => {
    showLogin();
    initializeFacebookSDK();
});

function showLogin() {
    document.getElementById('login').classList.add('active');
    document.getElementById('registration').classList.remove('active');
}

function showRegistration() {
    document.getElementById('login').classList.remove('active');
    document.getElementById('registration').classList.add('active');
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Placeholder for login logic
    window.location.href = 'welcome.html';
});

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Placeholder for registration logic
    showLogin();
});

// Google Sign-In
function onGoogleSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    // Placeholder for Google login logic
    window.location.href = 'welcome.html';
}

// Facebook SDK Initialization
function initializeFacebookSDK() {
    window.fbAsyncInit = function() {
        FB.init({
            appId: 'YOUR_FACEBOOK_APP_ID',
            cookie: true,
            xfbml: true,
            version: 'v10.0'
        });
        FB.AppEvents.logPageView();
    };
}

function onFacebookSignIn() {
    FB.login(function(response) {
        if (response.authResponse) {
            console.log('Welcome! Fetching your information.... ');
            FB.api('/me', function(response) {
                console.log('Good to see you, ' + response.name + '.');
                // Placeholder for Facebook login logic
                window.location.href = 'welcome.html';
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    });
}

// Apple Sign-In
function onAppleSignIn() {
    // Placeholder for Apple login logic
    console.log('Apple Sign-In clicked');
    window.location.href = 'welcome.html';
}
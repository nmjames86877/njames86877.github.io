# ?? MicroLink Authentication Workflow Documentation

## ?? Overview

This document provides complete guidance on the authentication and session management system implemented in MicroLink Prototype™.

**Version**: 2.0  
**Last Updated**: January 2025  
**Status**: ? Implemented & Documented  
**Security Level**: Prototype (Client-Side Demo)

---

## ?? Authentication Architecture

### System Components

```
???????????????????????????????????????????????????????????????????
?                Authentication System Architecture                ?
???????????????????????????????????????????????????????????????????

????????????????        ????????????????        ????????????????
?   auth.js    ??????????  session.js  ?????????? Page Content ?
? (Auth Logic) ?        ? (Protection) ?        ?  (Protected) ?
????????????????        ????????????????        ????????????????
        ?                        ?                        ?
        ?? Login/Register        ?? Session Guard        ?? User Data
        ?? Token Management      ?? Access Control       ?? Features
        ?? Password Reset        ?? UI Components        ?? Actions
        ?? Validation            ?? Monitoring

Data Storage:
?? localStorage: User accounts (persistent)
?? sessionStorage: Active sessions (temporary)
```

---

## ?? Authentication Flow

### 1. User Registration Flow

```
START
  ?
  ??? User fills registration form
  ?     ?? Email
  ?     ?? Password
  ?     ?? Additional Info (optional)
  ?
  ??? Client-side validation
  ?     ?? Email format check
  ?     ?? Password strength check
  ?     ?? Required fields check
  ?
  ??? AuthManager.register()
  ?     ?? Check if user exists
  ?     ?? Hash password (prototype)
  ?     ?? Create user object
  ?     ?? Save to localStorage
  ?
  ??? Auto-login after registration
  ?     ?? Generate session token
  ?
  ??? Redirect to dashboard
```

### 2. User Login Flow

```
START
  ?
  ??? User enters credentials
  ?     ?? Email
  ?     ?? Password
  ?
  ??? Check lockout status
  ?     ?? Max 5 attempts, 15 min lockout
  ?
  ??? AuthManager.login()
  ?     ?? Verify credentials
  ?     ?? Generate session token
  ?     ?? Set expiration (1 hour)
  ?     ?? Save to sessionStorage
  ?
  ??? Clear failed attempts
  ?
  ??? Redirect to return URL or dashboard
```

### 3. Session Validation Flow

```
On Page Load:
  ?
  ??? SessionGuard.init()
  ?     ?? Check if public page
  ?     ?   ?? YES ? Allow access
  ?     ?   ?? NO ? Continue
  ?     ?
  ?     ??? AuthManager.isAuthenticated()
  ?     ?     ?? Check session exists
  ?     ?     ?? Check not expired
  ?     ?     ?? Update last activity
  ?     ?
  ?     ??? Session valid?
  ?     ?     ?? YES ? Grant access
  ?     ?     ?? NO ? Redirect to login
  ?     ?
  ?     ??? Setup monitoring
  ?           ?? Auto-refresh token
  ?           ?? Activity tracking
  ?           ?? Expiry checks
```

### 4. Logout Flow

```
User clicks logout:
  ?
  ??? Confirm action
  ?
  ??? AuthManager.logout()
  ?     ?? Clear sessionStorage
  ?     ?? Clear cached data
  ?     ?? Clear activity tracking
  ?
  ??? Redirect to login page
```

---

## ?? File Integration

### Required Files on Each Page

```html
<!-- Core Authentication Files -->
<script src="../js/auth.js"></script>
<script src="../js/session.js"></script>

<!-- Load Order Important:
     1. auth.js (defines AuthManager)
     2. session.js (uses AuthManager)
     3. page-specific.js (uses both)
-->
```

### Public Pages (No Authentication Required)

```html
<!-- Disable auto session guard -->
<body data-no-session-guard>
    <!-- signRegistration.html -->
    <!-- index.html (if exists) -->
</body>
```

### Protected Pages (Authentication Required)

```html
<!-- Auto session guard enabled -->
<body>
    <!-- welcome.html -->
    <!-- financial.html -->
    <!-- All other application pages -->
</body>
```

---

## ?? API Reference

### AuthManager Methods

#### Registration
```javascript
// Register new user
const result = await AuthManager.register(email, password, {
    firstName: 'John',
    lastName: 'Doe'
});

if (result.success) {
    console.log('User registered:', result.user);
    console.log('Token:', result.token);
} else {
    console.error('Error:', result.message);
}
```

#### Login
```javascript
// Login existing user
const result = await AuthManager.login(email, password);

if (result.success) {
    console.log('Logged in:', result.user);
    console.log('Token expires:', new Date(result.expiresAt));
} else {
    console.error('Error:', result.message);
}
```

#### Logout
```javascript
// Logout current user
AuthManager.logout();
// Automatically redirects to login page
```

#### Check Authentication
```javascript
// Check if user is authenticated
if (AuthManager.isAuthenticated()) {
    console.log('User is logged in');
    const user = AuthManager.getCurrentUser();
    console.log('Current user:', user.email);
} else {
    console.log('User is not logged in');
}
```

#### Password Reset
```javascript
// Request password reset
const result = await AuthManager.requestPasswordReset(email);
console.log(result.message);
// In prototype, shows reset token in console

// Reset password with token
const resetResult = await AuthManager.resetPassword(
    email,
    resetToken,
    newPassword
);
```

#### Token Refresh
```javascript
// Manually refresh token (auto-refreshes every 5 min before expiry)
const result = await AuthManager.refreshToken();
if (result.success) {
    console.log('Token refreshed until:', new Date(result.expiresAt));
}
```

### SessionGuard Methods

#### Initialize Session Protection
```javascript
// Auto-initialized on page load
// Or manually with custom config:
SessionGuard.init({
    loginPage: 'signRegistration.html',
    homePage: 'welcome.html',
    redirectDelay: 500
});
```

#### Get Session Info
```javascript
const info = SessionGuard.getSessionInfo();
if (info) {
    console.log('User:', info.user.email);
    console.log('Expires:', info.expiresAt);
    console.log('Minutes remaining:', info.minutesRemaining);
}
```

### AccessController Methods

#### Check Permissions
```javascript
// Check if user has permission
if (AccessController.hasPermission('admin')) {
    console.log('User has admin access');
}
```

#### Control Element Visibility
```javascript
// Show element only to authenticated users
AccessController.showToAuthenticated('.auth-only');

// Show element only to guests
AccessController.showToGuests('.guest-only');

// Require specific permission
AccessController.requirePermission('.admin-panel', 'admin');
```

### SessionUI Methods

#### Display Session Status
```javascript
// Create and append status indicator
const statusIndicator = SessionUI.createStatusIndicator();
document.body.appendChild(statusIndicator);
```

#### Display Session Timer
```javascript
// Create and append session timer
const timer = SessionUI.createSessionTimer();
document.body.appendChild(timer);
```

#### Show Expiration Modal
```javascript
// Show session expired modal
SessionUI.showSessionExpiredModal();
```

---

## ?? UI Integration Examples

### Example 1: Welcome Message
```html
<div class="user-welcome">
    Welcome, <span data-user-name>User</span>!
    (<span data-user-email>email@example.com</span>)
</div>
```

### Example 2: Conditional Content
```html
<!-- Show to authenticated users only -->
<div class="auth-only" style="display: none;">
    <p>Welcome back! Here's your personalized content.</p>
</div>

<!-- Show to guests only -->
<div class="guest-only" style="display: none;">
    <p>Please <a href="signRegistration.html">sign in</a> to continue.</p>
</div>

<script>
    // Auto-show based on auth status
    AccessController.showToAuthenticated('.auth-only');
    AccessController.showToGuests('.guest-only');
</script>
```

### Example 3: Logout Button
```html
<button id="logout-btn" onclick="handleLogout()">
    Logout
</button>

<script>
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        AuthManager.logout();
    }
}
</script>
```

### Example 4: Session Status Indicator
```html
<script>
document.addEventListener('DOMContentLoaded', () => {
    // Add session status to header
    const header = document.querySelector('.header-buttons');
    if (header && AuthManager.isAuthenticated()) {
        const statusIndicator = SessionUI.createStatusIndicator();
        header.appendChild(statusIndicator);
    }
});
</script>
```

---

## ?? Security Features

### Implemented Protections

? **Password Strength Validation**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number

? **Login Attempt Limiting**
- Maximum 5 failed attempts
- 15-minute lockout after max attempts
- Automatic cleanup on successful login

? **Session Management**
- 1-hour session expiration
- Automatic token refresh (5 min before expiry)
- Activity tracking (mousedown, keydown, scroll, touch)
- Session validation on page visibility change

? **Data Protection**
- Passwords hashed before storage (prototype hash)
- Sensitive data removed from user objects
- Session data cleared on logout
- Failed attempts tracked separately

? **XSS Prevention**
- Input validation on all forms
- Output encoding for user data
- Content Security Policy headers

---

## ?? Prototype Limitations

### Current Implementation (Client-Side)

? **Not Production-Ready**
- Passwords stored with simple base64 encoding
- No server-side validation
- Session data in browser storage only
- No HTTPS enforcement (relies on GitHub Pages)
- OAuth placeholders (no real integration)

### Required for Production

? **Server-Side Requirements**
- Use bcrypt/argon2 for password hashing
- Implement JWT tokens with private keys
- Server-side session validation
- Secure HTTP-only cookies
- CSRF token protection
- Rate limiting on endpoints

? **Database Integration**
- Store users in secure database (Azure SQL, MongoDB)
- Encrypt sensitive data at rest
- Implement audit logging
- Session storage in Redis/database

? **OAuth Integration**
- Complete Facebook OAuth flow
- Complete Google OAuth flow
- Complete Apple Sign-In flow
- PKCE for mobile apps

? **Azure AD B2C**
- Recommended for enterprise
- Built-in security features
- MFA support
- Compliance certifications

---

## ?? Session Configuration

### Default Settings

```javascript
{
    tokenExpiration: 3600000,    // 1 hour
    refreshThreshold: 300000,    // 5 minutes before expiry
    maxLoginAttempts: 5,
    lockoutDuration: 900000,     // 15 minutes
    loginPage: 'signRegistration.html',
    homePage: 'welcome.html'
}
```

### Customization

```javascript
// Extend session to 2 hours
AuthManager.config.tokenExpiration = 7200000;

// Reduce lockout to 5 minutes
AuthManager.config.lockoutDuration = 300000;

// Custom login page
SessionGuard.init({
    loginPage: 'custom-login.html'
});
```

---

## ?? Testing Scenarios

### Test Case 1: Registration
```
1. Go to signRegistration.html
2. Fill registration form
   - Email: test@example.com
   - Password: Test1234
3. Submit form
4. Verify redirect to welcome.html
5. Check sessionStorage for token
```

### Test Case 2: Login
```
1. Logout if logged in
2. Go to signRegistration.html
3. Fill login form with registered credentials
4. Submit form
5. Verify redirect to welcome.html
6. Check session status indicator
```

### Test Case 3: Session Expiry
```
1. Login successfully
2. Wait 1 hour (or manually set expiration in sessionStorage)
3. Try to navigate to protected page
4. Verify redirect to login
```

### Test Case 4: Failed Login Attempts
```
1. Try to login with wrong password 5 times
2. Verify lockout message on 6th attempt
3. Wait 15 minutes
4. Verify can login again
```

### Test Case 5: Page Protection
```
1. Logout (clear session)
2. Try to access welcome.html directly
3. Verify automatic redirect to login
4. Login successfully
5. Verify redirect back to welcome.html
```

---

## ?? Support & Troubleshooting

### Common Issues

**Issue**: Session not persisting between pages
**Solution**: Ensure auth.js and session.js loaded on all pages

**Issue**: Continuous redirect loop
**Solution**: Check `data-no-session-guard` attribute on login page

**Issue**: Token refresh not working
**Solution**: Verify auto-refresh interval running (check console)

**Issue**: User info not displaying
**Solution**: Add `data-user-email` or `data-user-name` attributes

---

## ?? Migration to Production

### Step 1: Backend Setup
1. Set up Node.js/Python backend
2. Implement secure password hashing
3. Create JWT token generation endpoint
4. Set up session storage (Redis)

### Step 2: Database Integration
1. Create user table schema
2. Implement user CRUD operations
3. Add password reset workflow
4. Set up email service for notifications

### Step 3: OAuth Integration
1. Register apps with providers
2. Implement OAuth callback handlers
3. Map OAuth profiles to user accounts
4. Test each provider flow

### Step 4: Security Hardening
1. Enable HTTPS only
2. Implement CSRF protection
3. Add rate limiting
4. Set up audit logging
5. Configure WAF rules

---

**Document Version**: 1.0  
**Last Updated**: January 2025  
**Maintained By**: Lilly Pad LLC Development Team

© 2025 Lilly Pad LLC. All Rights Reserved.

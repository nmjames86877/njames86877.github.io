/**
 * auth.js
 * MicroLink Prototype™ - Authentication Module
 * 
 * Copyright (c) 2025 Lilly Pad LLC. All Rights Reserved.
 * CONFIDENTIAL AND PROPRIETARY
 * 
 * TRADEMARK NOTICE: "MicroLink™", "Elizabeth AI™", "myCompanion™" are trademarks of Lilly Pad LLC.
 * 
 * PURPOSE: Centralized authentication and authorization logic with blockchain identity
 * SECURITY: Client-side prototype - NOT production-ready
 * FUTURE: Integrate with Azure AD B2C, OAuth 2.0, JWT tokens
 */

'use strict';

/**
 * Authentication Manager
 * Handles login, logout, registration, and token management with blockchain identity
 */
const AuthManager = {
    // Configuration
    config: {
        tokenExpiration: 3600000, // 1 hour in milliseconds
        refreshThreshold: 300000,  // 5 minutes before expiry
        maxLoginAttempts: 5,
        lockoutDuration: 900000,    // 15 minutes lockout
        enableBlockchain: true      // Enable blockchain identity
    },

    /**
     * Initialize authentication system
     */
    init() {
        console.log('[Auth] Initializing authentication system...');
        console.log('[Auth] Blockchain Identity:', this.config.enableBlockchain ? 'ENABLED' : 'DISABLED');
        this.checkSession();
        this.setupAutoRefresh();
        this.setupSessionMonitoring();
    },

    /**
     * User Registration with Blockchain Identity
     * @param {string} email - User email
     * @param {string} password - User password
     * @param {Object} additionalData - Optional user data
     * @returns {Promise<Object>} Registration result
     */
    async register(email, password, additionalData = {}) {
        try {
            console.log('[Auth] Registering user:', email);

            // Validate input
            if (!this.validateEmail(email)) {
                throw new Error('Invalid email format');
            }

            if (!this.validatePassword(password)) {
                throw new Error('Password does not meet requirements');
            }

            // Check if user already exists (in localStorage for prototype)
            if (this.userExists(email)) {
                throw new Error('User already exists');
            }

            // Create user object
            const user = {
                email: email,
                passwordHash: this.hashPassword(password), // Simple hash for prototype
                createdAt: new Date().toISOString(),
                profile: {
                    firstName: additionalData.firstName || '',
                    lastName: additionalData.lastName || '',
                    ...additionalData
                },
                settings: {
                    notifications: true,
                    darkMode: false,
                    language: 'en'
                },
                blockchainIdentity: null // Will be populated below
            };

            // Create blockchain identity if enabled
            if (this.config.enableBlockchain && typeof BlockchainIdentity !== 'undefined') {
                try {
                    console.log('[Auth] Creating blockchain identity...');
                    const identity = await BlockchainIdentity.createIdentity(user);
                    user.blockchainIdentity = {
                        identityHash: identity.identityHash,
                        publicKey: identity.publicKey,
                        trustScore: identity.trustScore,
                        createdAt: identity.createdAt
                    };
                    
                    // Store identity hash for quick lookup
                    localStorage.setItem('microlink_identity_map_' + email, identity.identityHash);
                    
                    console.log('[Auth] Blockchain identity created:', identity.identityHash);
                } catch (blockchainError) {
                    console.error('[Auth] Blockchain identity creation failed:', blockchainError);
                    // Continue without blockchain identity (graceful degradation)
                }
            }

            // Save user (localStorage for prototype)
            this.saveUser(user);

            // Auto-login after registration
            const loginResult = await this.login(email, password);

            console.log('[Auth] Registration successful');
            return {
                success: true,
                message: 'Registration successful',
                user: this.sanitizeUser(user),
                token: loginResult.token,
                blockchainIdentity: user.blockchainIdentity
            };

        } catch (error) {
            console.error('[Auth] Registration error:', error);
            return {
                success: false,
                message: error.message
            };
        }
    },

    /**
     * User Login with Blockchain Verification
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise<Object>} Login result with token
     */
    async login(email, password) {
        try {
            console.log('[Auth] Attempting login for:', email);

            // Check login attempts
            if (this.isLockedOut(email)) {
                throw new Error('Account temporarily locked. Please try again later.');
            }

            // Validate credentials
            const user = this.getUser(email);
            if (!user) {
                this.recordFailedAttempt(email);
                throw new Error('Invalid credentials');
            }

            // Verify password (simple comparison for prototype)
            if (user.passwordHash !== this.hashPassword(password)) {
                this.recordFailedAttempt(email);
                throw new Error('Invalid credentials');
            }

            // Verify blockchain identity if exists
            let blockchainVerification = null;
            if (this.config.enableBlockchain && user.blockchainIdentity && typeof BlockchainIdentity !== 'undefined') {
                try {
                    console.log('[Auth] Verifying blockchain identity...');
                    blockchainVerification = await BlockchainIdentity.verifyIdentity(user.blockchainIdentity.identityHash);
                    
                    if (blockchainVerification.verified) {
                        // Update user's blockchain info
                        user.blockchainIdentity.trustScore = blockchainVerification.trustScore;
                        user.blockchainIdentity.lastVerified = blockchainVerification.verifiedAt;
                        this.saveUser(user);
                        
                        console.log('[Auth] Blockchain identity verified. Trust score:', blockchainVerification.trustScore);
                    } else {
                        console.warn('[Auth] Blockchain verification failed:', blockchainVerification.reason);
                    }
                } catch (blockchainError) {
                    console.error('[Auth] Blockchain verification error:', blockchainError);
                    // Continue with login (graceful degradation)
                }
            }

            // Generate session token
            const token = this.generateToken(user);
            const expiresAt = Date.now() + this.config.tokenExpiration;

            // Create session
            const session = {
                userId: user.email,
                token: token,
                createdAt: Date.now(),
                expiresAt: expiresAt,
                lastActivity: Date.now(),
                ipAddress: 'N/A', // Would be from server in production
                userAgent: navigator.userAgent,
                blockchainVerified: blockchainVerification?.verified || false
            };

            // Save session
            this.saveSession(session);

            // Clear failed attempts
            this.clearFailedAttempts(email);

            console.log('[Auth] Login successful');
            return {
                success: true,
                message: 'Login successful',
                user: this.sanitizeUser(user),
                token: token,
                expiresAt: expiresAt,
                blockchainVerified: blockchainVerification?.verified || false,
                trustScore: user.blockchainIdentity?.trustScore || 0
            };

        } catch (error) {
            console.error('[Auth] Login error:', error);
            return {
                success: false,
                message: error.message
            };
        }
    },

    /**
     * User Logout
     */
    logout() {
        console.log('[Auth] Logging out user...');
        
        // Clear session
        sessionStorage.removeItem('microlink_session');
        sessionStorage.removeItem('microlink_token');
        sessionStorage.removeItem('microlink_user');
        
        // Clear any cached data
        this.clearCache();
        
        // Redirect to login page
        window.location.href = 'signRegistration.html';
    },

    /**
     * Check if user is authenticated
     * @returns {boolean} Authentication status
     */
    isAuthenticated() {
        const session = this.getSession();
        
        if (!session) {
            return false;
        }

        // Check if session is expired
        if (Date.now() > session.expiresAt) {
            console.log('[Auth] Session expired');
            this.logout();
            return false;
        }

        // Update last activity
        this.updateLastActivity();

        return true;
    },

    /**
     * Get current user
     * @returns {Object|null} User object or null
     */
    getCurrentUser() {
        const session = this.getSession();
        if (!session) {
            return null;
        }

        const user = this.getUser(session.userId);
        return user ? this.sanitizeUser(user) : null;
    },

    /**
     * Refresh authentication token
     * @returns {Promise<Object>} Refresh result
     */
    async refreshToken() {
        try {
            console.log('[Auth] Refreshing token...');

            const session = this.getSession();
            if (!session) {
                throw new Error('No active session');
            }

            // Generate new token
            const user = this.getUser(session.userId);
            const newToken = this.generateToken(user);
            const newExpiresAt = Date.now() + this.config.tokenExpiration;

            // Update session
            session.token = newToken;
            session.expiresAt = newExpiresAt;
            session.lastActivity = Date.now();

            this.saveSession(session);

            console.log('[Auth] Token refreshed successfully');
            return {
                success: true,
                token: newToken,
                expiresAt: newExpiresAt
            };

        } catch (error) {
            console.error('[Auth] Token refresh error:', error);
            return {
                success: false,
                message: error.message
            };
        }
    },

    /**
     * Password Reset Request
     * @param {string} email - User email
     * @returns {Promise<Object>} Reset result
     */
    async requestPasswordReset(email) {
        try {
            console.log('[Auth] Password reset requested for:', email);

            if (!this.validateEmail(email)) {
                throw new Error('Invalid email format');
            }

            const user = this.getUser(email);
            if (!user) {
                // Don't reveal if user exists (security best practice)
                return {
                    success: true,
                    message: 'If the email exists, a reset link has been sent.'
                };
            }

            // Generate reset token (prototype only)
            const resetToken = this.generateResetToken();
            const resetExpiry = Date.now() + 1800000; // 30 minutes

            // Save reset token
            sessionStorage.setItem('microlink_reset_' + email, JSON.stringify({
                token: resetToken,
                expiresAt: resetExpiry
            }));

            console.log('[Auth] Password reset token generated:', resetToken);

            return {
                success: true,
                message: 'If the email exists, a reset link has been sent.',
                resetToken: resetToken // Only for prototype demo
            };

        } catch (error) {
            console.error('[Auth] Password reset error:', error);
            return {
                success: false,
                message: 'Unable to process password reset request'
            };
        }
    },

    /**
     * Reset Password
     * @param {string} email - User email
     * @param {string} resetToken - Reset token
     * @param {string} newPassword - New password
     * @returns {Promise<Object>} Reset result
     */
    async resetPassword(email, resetToken, newPassword) {
        try {
            console.log('[Auth] Resetting password for:', email);

            // Validate reset token
            const storedReset = sessionStorage.getItem('microlink_reset_' + email);
            if (!storedReset) {
                throw new Error('Invalid or expired reset token');
            }

            const reset = JSON.parse(storedReset);
            if (reset.token !== resetToken || Date.now() > reset.expiresAt) {
                throw new Error('Invalid or expired reset token');
            }

            // Validate new password
            if (!this.validatePassword(newPassword)) {
                throw new Error('Password does not meet requirements');
            }

            // Update password
            const user = this.getUser(email);
            if (!user) {
                throw new Error('User not found');
            }

            user.passwordHash = this.hashPassword(newPassword);
            this.saveUser(user);

            // Clear reset token
            sessionStorage.removeItem('microlink_reset_' + email);

            console.log('[Auth] Password reset successful');
            return {
                success: true,
                message: 'Password reset successfully'
            };

        } catch (error) {
            console.error('[Auth] Password reset error:', error);
            return {
                success: false,
                message: error.message
            };
        }
    },

    // ===========================
    // INTERNAL HELPER METHODS
    // ===========================

    /**
     * Check current session on page load
     */
    checkSession() {
        if (this.isAuthenticated()) {
            console.log('[Auth] Valid session found');
            this.updateLastActivity();
        } else {
            console.log('[Auth] No valid session');
        }
    },

    /**
     * Setup automatic token refresh
     */
    setupAutoRefresh() {
        setInterval(() => {
            const session = this.getSession();
            if (session) {
                const timeUntilExpiry = session.expiresAt - Date.now();
                
                // Refresh if within threshold
                if (timeUntilExpiry < this.config.refreshThreshold && timeUntilExpiry > 0) {
                    console.log('[Auth] Auto-refreshing token...');
                    this.refreshToken();
                }
            }
        }, 60000); // Check every minute
    },

    /**
     * Setup session monitoring for inactivity
     */
    setupSessionMonitoring() {
        // Track user activity
        ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, () => {
                if (this.isAuthenticated()) {
                    this.updateLastActivity();
                }
            });
        });
    },

    /**
     * Update last activity timestamp
     */
    updateLastActivity() {
        const session = this.getSession();
        if (session) {
            session.lastActivity = Date.now();
            this.saveSession(session);
        }
    },

    /**
     * Generate authentication token
     * @param {Object} user - User object
     * @returns {string} Token
     */
    generateToken(user) {
        // Simple token for prototype (use JWT in production)
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 15);
        const userPart = btoa(user.email).substring(0, 10);
        return `mlp_${userPart}_${timestamp}_${random}`;
    },

    /**
     * Generate password reset token
     * @returns {string} Reset token
     */
    generateResetToken() {
        return 'rst_' + Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
    },

    /**
     * Simple password hashing (prototype only)
     * @param {string} password - Plain password
     * @returns {string} Hashed password
     */
    hashPassword(password) {
        // WARNING: This is NOT secure - use bcrypt/argon2 in production
        return btoa(password + '_microlink_salt');
    },

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} Valid or not
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Validate password strength
     * @param {string} password - Password to validate
     * @returns {boolean} Valid or not
     */
    validatePassword(password) {
        // Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number
        return password.length >= 8 &&
               /[a-z]/.test(password) &&
               /[A-Z]/.test(password) &&
               /[0-9]/.test(password);
    },

    /**
     * Check if user exists
     * @param {string} email - User email
     * @returns {boolean} Exists or not
     */
    userExists(email) {
        return localStorage.getItem('microlink_user_' + email) !== null;
    },

    /**
     * Get user from storage
     * @param {string} email - User email
     * @returns {Object|null} User object
     */
    getUser(email) {
        const userData = localStorage.getItem('microlink_user_' + email);
        return userData ? JSON.parse(userData) : null;
    },

    /**
     * Save user to storage
     * @param {Object} user - User object
     */
    saveUser(user) {
        localStorage.setItem('microlink_user_' + user.email, JSON.stringify(user));
    },

    /**
     * Get current session
     * @returns {Object|null} Session object
     */
    getSession() {
        const sessionData = sessionStorage.getItem('microlink_session');
        return sessionData ? JSON.parse(sessionData) : null;
    },

    /**
     * Save session to storage
     * @param {Object} session - Session object
     */
    saveSession(session) {
        sessionStorage.setItem('microlink_session', JSON.stringify(session));
        sessionStorage.setItem('microlink_token', session.token);
        
        // Also save user info for quick access
        const user = this.getUser(session.userId);
        if (user) {
            sessionStorage.setItem('microlink_user', JSON.stringify(this.sanitizeUser(user)));
        }
    },

    /**
     * Remove sensitive data from user object
     * @param {Object} user - User object
     * @returns {Object} Sanitized user
     */
    sanitizeUser(user) {
        const { passwordHash, ...safeUser } = user;
        return safeUser;
    },

    /**
     * Record failed login attempt
     * @param {string} email - User email
     */
    recordFailedAttempt(email) {
        const key = 'microlink_failed_' + email;
        const attempts = JSON.parse(sessionStorage.getItem(key) || '[]');
        attempts.push(Date.now());
        sessionStorage.setItem(key, JSON.stringify(attempts));
    },

    /**
     * Clear failed login attempts
     * @param {string} email - User email
     */
    clearFailedAttempts(email) {
        sessionStorage.removeItem('microlink_failed_' + email);
    },

    /**
     * Check if account is locked out
     * @param {string} email - User email
     * @returns {boolean} Locked out or not
     */
    isLockedOut(email) {
        const key = 'microlink_failed_' + email;
        const attempts = JSON.parse(sessionStorage.getItem(key) || '[]');
        
        // Filter recent attempts (within lockout duration)
        const recentAttempts = attempts.filter(time => 
            Date.now() - time < this.config.lockoutDuration
        );

        return recentAttempts.length >= this.config.maxLoginAttempts;
    },

    /**
     * Clear all cached data
     */
    clearCache() {
        // Clear specific session data (keep user accounts)
        const keysToRemove = [];
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key.startsWith('microlink_')) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => sessionStorage.removeItem(key));
    },

    /**
     * Get blockchain identity for current user
     * @returns {Object|null} Blockchain identity or null
     */
    async getBlockchainIdentity() {
        const user = this.getCurrentUser();
        if (!user || !user.blockchainIdentity) {
            return null;
        }

        // Get full identity details from ledger
        if (typeof BlockchainIdentity !== 'undefined') {
            return await BlockchainIdentity.getPublicTrustScore(user.blockchainIdentity.identityHash);
        }

        return user.blockchainIdentity;
    },

    /**
     * Add verification to user's blockchain identity
     * @param {string} verificationType - Type of verification
     * @param {Object} verificationData - Verification data
     * @returns {Promise<Object>} Result
     */
    async addBlockchainVerification(verificationType, verificationData) {
        try {
            const user = this.getCurrentUser();
            if (!user || !user.blockchainIdentity) {
                throw new Error('No blockchain identity found');
            }

            if (typeof BlockchainIdentity === 'undefined') {
                throw new Error('Blockchain system not available');
            }

            // Add verification to blockchain
            const updatedIdentity = await BlockchainIdentity.addVerification(
                user.blockchainIdentity.identityHash,
                verificationType,
                verificationData
            );

            // Update user record
            const fullUser = this.getUser(user.email);
            fullUser.blockchainIdentity.trustScore = updatedIdentity.trustScore;
            fullUser.blockchainIdentity.lastVerified = new Date().toISOString();
            this.saveUser(fullUser);

            console.log('[Auth] Verification added. New trust score:', updatedIdentity.trustScore);

            return {
                success: true,
                trustScore: updatedIdentity.trustScore,
                verifications: updatedIdentity.verifications.length
            };

        } catch (error) {
            console.error('[Auth] Error adding verification:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
};

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AuthManager.init());
} else {
    AuthManager.init();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthManager;
}

/**
 * session.js
 * MicroLink Prototype™ - Session Management & Page Protection
 * 
 * Copyright (c) 2025 Lilly Pad LLC. All Rights Reserved.
 * CONFIDENTIAL AND PROPRIETARY
 * 
 * TRADEMARK NOTICE: "MicroLink™", "Elizabeth AI™", "myCompanion™" are trademarks of Lilly Pad LLC.
 * 
 * PURPOSE: Session validation and page access control
 * USAGE: Include this file on all protected pages
 */

'use strict';

/**
 * Session Guard
 * Protects pages requiring authentication
 */
const SessionGuard = {
    // Configuration
    config: {
        loginPage: 'signRegistration.html',
        homePage: 'welcome.html',
        publicPages: [
            'signRegistration.html',
            'index.html'
        ],
        redirectDelay: 500 // milliseconds
    },

    /**
     * Initialize session guard on current page
     * @param {Object} options - Configuration options
     */
    init(options = {}) {
        console.log('[SessionGuard] Initializing page protection...');

        // Merge options
        this.config = { ...this.config, ...options };

        // Get current page
        const currentPage = this.getCurrentPage();
        console.log('[SessionGuard] Current page:', currentPage);

        // Check if page is public
        if (this.isPublicPage(currentPage)) {
            console.log('[SessionGuard] Public page, no authentication required');
            return;
        }

        // Verify session
        if (!this.verifySession()) {
            console.log('[SessionGuard] Session invalid, redirecting to login...');
            this.redirectToLogin();
            return;
        }

        console.log('[SessionGuard] Session valid, access granted');
        
        // Setup session monitoring
        this.setupMonitoring();
        
        // Display user info
        this.displayUserInfo();
    },

    /**
     * Verify current session is valid
     * @returns {boolean} Session validity
     */
    verifySession() {
        // Check if AuthManager is available
        if (typeof AuthManager === 'undefined') {
            console.error('[SessionGuard] AuthManager not loaded');
            return false;
        }

        return AuthManager.isAuthenticated();
    },

    /**
     * Redirect to login page
     */
    redirectToLogin() {
        // Save current page for redirect after login
        sessionStorage.setItem('microlink_return_url', window.location.href);

        setTimeout(() => {
            window.location.href = this.config.loginPage;
        }, this.config.redirectDelay);
    },

    /**
     * Redirect to home page
     */
    redirectToHome() {
        setTimeout(() => {
            window.location.href = this.config.homePage;
        }, this.config.redirectDelay);
    },

    /**
     * Get current page name
     * @returns {string} Page name
     */
    getCurrentPage() {
        const path = window.location.pathname;
        return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    },

    /**
     * Check if current page is public
     * @param {string} pageName - Page name
     * @returns {boolean} Is public
     */
    isPublicPage(pageName) {
        return this.config.publicPages.includes(pageName);
    },

    /**
     * Setup session monitoring
     */
    setupMonitoring() {
        // Check session every 30 seconds
        setInterval(() => {
            if (!this.verifySession()) {
                console.log('[SessionGuard] Session expired during monitoring');
                this.handleSessionExpired();
            }
        }, 30000);

        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && !this.verifySession()) {
                console.log('[SessionGuard] Session expired while page was hidden');
                this.handleSessionExpired();
            }
        });
    },

    /**
     * Handle session expiration
     */
    handleSessionExpired() {
        alert('Your session has expired. Please log in again.');
        this.redirectToLogin();
    },

    /**
     * Display user information in UI
     */
    displayUserInfo() {
        if (typeof AuthManager === 'undefined') {
            return;
        }

        const user = AuthManager.getCurrentUser();
        if (!user) {
            return;
        }

        // Update any user info elements
        const userEmailElements = document.querySelectorAll('[data-user-email]');
        userEmailElements.forEach(el => {
            el.textContent = user.email;
        });

        const userNameElements = document.querySelectorAll('[data-user-name]');
        userNameElements.forEach(el => {
            const name = user.profile?.firstName || user.email.split('@')[0];
            el.textContent = name;
        });

        console.log('[SessionGuard] User info displayed');
    },

    /**
     * Get session info for display
     * @returns {Object} Session information
     */
    getSessionInfo() {
        if (typeof AuthManager === 'undefined') {
            return null;
        }

        const session = AuthManager.getSession();
        const user = AuthManager.getCurrentUser();

        if (!session || !user) {
            return null;
        }

        const timeRemaining = session.expiresAt - Date.now();
        const minutesRemaining = Math.floor(timeRemaining / 60000);

        return {
            user: user,
            expiresAt: new Date(session.expiresAt).toLocaleString(),
            minutesRemaining: minutesRemaining,
            isActive: timeRemaining > 0
        };
    }
};

/**
 * Page Access Controller
 * Controls access to specific features based on user permissions
 */
const AccessController = {
    /**
     * Check if user has specific permission
     * @param {string} permission - Permission name
     * @returns {boolean} Has permission
     */
    hasPermission(permission) {
        if (typeof AuthManager === 'undefined') {
            return false;
        }

        const user = AuthManager.getCurrentUser();
        if (!user) {
            return false;
        }

        // Prototype: All authenticated users have all permissions
        // In production, check user.permissions array
        return true;
    },

    /**
     * Require permission for element
     * @param {string} selector - Element selector
     * @param {string} permission - Required permission
     */
    requirePermission(selector, permission) {
        if (!this.hasPermission(permission)) {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.display = 'none';
            });
        }
    },

    /**
     * Show elements only to authenticated users
     * @param {string} selector - Element selector
     */
    showToAuthenticated(selector) {
        const isAuth = typeof AuthManager !== 'undefined' && AuthManager.isAuthenticated();
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(el => {
            el.style.display = isAuth ? '' : 'none';
        });
    },

    /**
     * Show elements only to guests (non-authenticated)
     * @param {string} selector - Element selector
     */
    showToGuests(selector) {
        const isAuth = typeof AuthManager !== 'undefined' && AuthManager.isAuthenticated();
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(el => {
            el.style.display = isAuth ? 'none' : '';
        });
    }
};

/**
 * UI Session Components
 * Reusable UI components for session display
 */
const SessionUI = {
    /**
     * Create session status indicator
     * @returns {HTMLElement} Status element
     */
    createStatusIndicator() {
        const container = document.createElement('div');
        container.className = 'session-status';
        container.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.9);
            padding: 10px 15px;
            border-radius: 6px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            font-size: 14px;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
        `;

        const info = SessionGuard.getSessionInfo();
        if (info) {
            container.innerHTML = `
                <span style="color: #28a745;">? Online</span>
                <span style="color: #666;">${info.user.email}</span>
                <button id="session-logout-btn" style="
                    padding: 4px 12px;
                    background: #dc3545;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                ">Logout</button>
            `;

            // Add logout handler
            setTimeout(() => {
                const logoutBtn = document.getElementById('session-logout-btn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', () => {
                        if (confirm('Are you sure you want to logout?')) {
                            AuthManager.logout();
                        }
                    });
                }
            }, 100);
        } else {
            container.innerHTML = `
                <span style="color: #dc3545;">? Offline</span>
                <span style="color: #666;">Not logged in</span>
            `;
        }

        return container;
    },

    /**
     * Create session timer display
     * @returns {HTMLElement} Timer element
     */
    createSessionTimer() {
        const container = document.createElement('div');
        container.className = 'session-timer';
        container.style.cssText = `
            position: fixed;
            bottom: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.9);
            padding: 8px 12px;
            border-radius: 6px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            font-size: 12px;
            z-index: 1000;
            color: #666;
        `;

        const updateTimer = () => {
            const info = SessionGuard.getSessionInfo();
            if (info && info.isActive) {
                container.textContent = `Session expires in ${info.minutesRemaining} min`;
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
        };

        updateTimer();
        setInterval(updateTimer, 60000); // Update every minute

        return container;
    },

    /**
     * Show session expired modal
     */
    showSessionExpiredModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;

        modal.innerHTML = `
            <div style="
                background: white;
                padding: 30px;
                border-radius: 8px;
                max-width: 400px;
                text-align: center;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            ">
                <h2 style="margin-bottom: 15px; color: #333;">Session Expired</h2>
                <p style="margin-bottom: 20px; color: #666;">
                    Your session has expired for security reasons. 
                    Please log in again to continue.
                </p>
                <button id="session-expired-login-btn" style="
                    padding: 10px 20px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                ">Go to Login</button>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('session-expired-login-btn').addEventListener('click', () => {
            SessionGuard.redirectToLogin();
        });
    }
};

/**
 * Auto-initialize session guard on page load
 * Can be disabled by setting data-no-session-guard on body
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!document.body.dataset.noSessionGuard) {
            SessionGuard.init();
        }
    });
} else {
    if (!document.body.dataset.noSessionGuard) {
        SessionGuard.init();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SessionGuard, AccessController, SessionUI };
}

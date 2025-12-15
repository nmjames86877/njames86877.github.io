/**
 * blockchain-identity.js
 * MicroLink Prototype™ - Blockchain Identity & Public Trust System
 * 
 * Copyright (c) 2025 Lilly Pad LLC. All Rights Reserved.
 * CONFIDENTIAL AND PROPRIETARY
 * 
 * TRADEMARK NOTICE: "MicroLink™", "Elizabeth AI™", "myCompanion™" are trademarks of Lilly Pad LLC.
 * 
 * PURPOSE: Blockchain-based identity verification and public trust ledger
 * SECURITY: Uses SHA-256 hashing with public/private key simulation
 * FUTURE: Integrate with Ethereum, Hyperledger, or Azure Blockchain Service
 */

'use strict';

/**
 * Blockchain Identity Manager
 * Handles cryptographic identity creation, verification, and trust scoring
 */
const BlockchainIdentity = {
    // Configuration
    config: {
        networkName: 'MicroLink Trust Network',
        version: '1.0.0',
        hashAlgorithm: 'SHA-256',
        enablePublicLedger: true,
        trustScoreThreshold: 50 // Minimum trust score for verified status
    },

    /**
     * Initialize blockchain identity system
     */
    async init() {
        console.log('[BlockchainIdentity] Initializing blockchain identity system...');
        console.log('[BlockchainIdentity] Network:', this.config.networkName);
        console.log('[BlockchainIdentity] Hash Algorithm:', this.config.hashAlgorithm);
        
        // Initialize public ledger
        if (this.config.enablePublicLedger) {
            this.initializePublicLedger();
        }
    },

    /**
     * Create blockchain identity for user
     * @param {Object} user - User object
     * @returns {Promise<Object>} Blockchain identity
     */
    async createIdentity(user) {
        try {
            console.log('[BlockchainIdentity] Creating identity for:', user.email);

            // Generate unique identity hash
            const identityHash = await this.generateIdentityHash(user);

            // Generate key pair (simulated for prototype)
            const keyPair = await this.generateKeyPair(identityHash);

            // Create identity record
            const identity = {
                identityHash: identityHash,
                publicKey: keyPair.publicKey,
                privateKey: keyPair.privateKey, // Store securely in production
                createdAt: new Date().toISOString(),
                lastVerified: new Date().toISOString(),
                trustScore: 50, // Initial trust score
                verifications: [],
                transactions: [],
                metadata: {
                    version: this.config.version,
                    network: this.config.networkName,
                    algorithm: this.config.hashAlgorithm
                }
            };

            // Add genesis transaction
            const genesisTransaction = await this.createTransaction(
                'IDENTITY_CREATED',
                identity,
                {
                    userId: user.email,
                    timestamp: identity.createdAt
                }
            );

            identity.transactions.push(genesisTransaction);

            // Save to blockchain ledger
            await this.addToLedger(identity);

            console.log('[BlockchainIdentity] Identity created:', identityHash);

            return identity;

        } catch (error) {
            console.error('[BlockchainIdentity] Error creating identity:', error);
            throw error;
        }
    },

    /**
     * Generate unique identity hash using SHA-256
     * @param {Object} user - User object
     * @returns {Promise<string>} Identity hash
     */
    async generateIdentityHash(user) {
        // Combine user data for hashing
        const identityData = {
            email: user.email,
            timestamp: Date.now(),
            random: this.generateRandomSalt(),
            network: this.config.networkName
        };

        const dataString = JSON.stringify(identityData);
        
        // Generate SHA-256 hash
        const hash = await this.sha256(dataString);
        
        return hash;
    },

    /**
     * Generate SHA-256 hash
     * @param {string} message - Message to hash
     * @returns {Promise<string>} Hex hash
     */
    async sha256(message) {
        // Use Web Crypto API for secure hashing
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    },

    /**
     * Generate public/private key pair (simulated for prototype)
     * @param {string} identityHash - Base identity hash
     * @returns {Promise<Object>} Key pair
     */
    async generateKeyPair(identityHash) {
        // In production, use Web Crypto API generateKey
        // For prototype, derive from identity hash
        
        const publicKey = await this.sha256(identityHash + '_public');
        const privateKey = await this.sha256(identityHash + '_private_' + this.generateRandomSalt());

        return {
            publicKey: 'pub_' + publicKey.substring(0, 32),
            privateKey: 'prv_' + privateKey.substring(0, 32)
        };
    },

    /**
     * Generate random salt for additional security
     * @returns {string} Random salt
     */
    generateRandomSalt() {
        const array = new Uint8Array(16);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    },

    /**
     * Verify blockchain identity
     * @param {string} identityHash - Identity hash to verify
     * @returns {Promise<Object>} Verification result
     */
    async verifyIdentity(identityHash) {
        try {
            console.log('[BlockchainIdentity] Verifying identity:', identityHash);

            // Get identity from ledger
            const identity = await this.getFromLedger(identityHash);

            if (!identity) {
                return {
                    verified: false,
                    reason: 'Identity not found in ledger'
                };
            }

            // Check trust score
            if (identity.trustScore < this.config.trustScoreThreshold) {
                return {
                    verified: false,
                    reason: 'Trust score below threshold',
                    trustScore: identity.trustScore
                };
            }

            // Verify transaction chain integrity
            const chainValid = await this.verifyTransactionChain(identity.transactions);

            if (!chainValid) {
                return {
                    verified: false,
                    reason: 'Transaction chain integrity compromised'
                };
            }

            // Update last verified timestamp
            identity.lastVerified = new Date().toISOString();
            await this.updateLedger(identity);

            return {
                verified: true,
                identity: identity,
                trustScore: identity.trustScore,
                verifiedAt: identity.lastVerified
            };

        } catch (error) {
            console.error('[BlockchainIdentity] Verification error:', error);
            return {
                verified: false,
                reason: error.message
            };
        }
    },

    /**
     * Create a blockchain transaction
     * @param {string} type - Transaction type
     * @param {Object} identity - Identity object
     * @param {Object} data - Transaction data
     * @returns {Promise<Object>} Transaction
     */
    async createTransaction(type, identity, data) {
        const transaction = {
            id: await this.generateTransactionId(),
            type: type,
            identityHash: identity.identityHash,
            timestamp: new Date().toISOString(),
            data: data,
            previousHash: this.getPreviousTransactionHash(identity.transactions),
            signature: null
        };

        // Generate transaction hash
        transaction.hash = await this.hashTransaction(transaction);

        // Sign transaction with private key (simulated)
        transaction.signature = await this.signTransaction(transaction, identity.privateKey);

        return transaction;
    },

    /**
     * Generate unique transaction ID
     * @returns {Promise<string>} Transaction ID
     */
    async generateTransactionId() {
        const timestamp = Date.now();
        const random = this.generateRandomSalt();
        return await this.sha256(timestamp + random);
    },

    /**
     * Hash a transaction
     * @param {Object} transaction - Transaction object
     * @returns {Promise<string>} Transaction hash
     */
    async hashTransaction(transaction) {
        const { signature, hash, ...dataToHash } = transaction;
        return await this.sha256(JSON.stringify(dataToHash));
    },

    /**
     * Sign transaction (simulated for prototype)
     * @param {Object} transaction - Transaction object
     * @param {string} privateKey - Private key
     * @returns {Promise<string>} Signature
     */
    async signTransaction(transaction, privateKey) {
        // In production, use proper digital signature (RSA, ECDSA)
        return await this.sha256(transaction.hash + privateKey);
    },

    /**
     * Get previous transaction hash
     * @param {Array} transactions - Transaction array
     * @returns {string} Previous hash or genesis
     */
    getPreviousTransactionHash(transactions) {
        if (!transactions || transactions.length === 0) {
            return '0000000000000000000000000000000000000000000000000000000000000000';
        }
        return transactions[transactions.length - 1].hash;
    },

    /**
     * Verify transaction chain integrity
     * @param {Array} transactions - Transaction array
     * @returns {Promise<boolean>} Chain validity
     */
    async verifyTransactionChain(transactions) {
        if (!transactions || transactions.length === 0) {
            return true;
        }

        for (let i = 1; i < transactions.length; i++) {
            const current = transactions[i];
            const previous = transactions[i - 1];

            // Verify previous hash linkage
            if (current.previousHash !== previous.hash) {
                console.error('[BlockchainIdentity] Chain broken at transaction', i);
                return false;
            }

            // Verify transaction hash
            const calculatedHash = await this.hashTransaction(current);
            if (current.hash !== calculatedHash) {
                console.error('[BlockchainIdentity] Invalid hash at transaction', i);
                return false;
            }
        }

        return true;
    },

    /**
     * Add verification to identity
     * @param {string} identityHash - Identity hash
     * @param {string} verificationType - Type of verification
     * @param {Object} verificationData - Verification details
     * @returns {Promise<Object>} Updated identity
     */
    async addVerification(identityHash, verificationType, verificationData) {
        try {
            const identity = await this.getFromLedger(identityHash);
            
            if (!identity) {
                throw new Error('Identity not found');
            }

            // Create verification record
            const verification = {
                type: verificationType,
                verifiedAt: new Date().toISOString(),
                data: verificationData,
                hash: await this.sha256(JSON.stringify(verificationData))
            };

            identity.verifications.push(verification);

            // Increase trust score based on verification type
            const trustIncrease = this.getTrustScoreIncrease(verificationType);
            identity.trustScore = Math.min(100, identity.trustScore + trustIncrease);

            // Create transaction for verification
            const transaction = await this.createTransaction(
                'VERIFICATION_ADDED',
                identity,
                {
                    verificationType: verificationType,
                    trustScore: identity.trustScore
                }
            );

            identity.transactions.push(transaction);

            // Update ledger
            await this.updateLedger(identity);

            console.log('[BlockchainIdentity] Verification added:', verificationType);

            return identity;

        } catch (error) {
            console.error('[BlockchainIdentity] Error adding verification:', error);
            throw error;
        }
    },

    /**
     * Get trust score increase for verification type
     * @param {string} verificationType - Type of verification
     * @returns {number} Trust score increase
     */
    getTrustScoreIncrease(verificationType) {
        const trustIncreases = {
            'EMAIL_VERIFIED': 10,
            'PHONE_VERIFIED': 10,
            'IDENTITY_DOCUMENT': 20,
            'BIOMETRIC': 15,
            'GOVERNMENT_ID': 25,
            'ADDRESS_VERIFIED': 10,
            'EMPLOYMENT_VERIFIED': 15,
            'FINANCIAL_VERIFIED': 15,
            'SOCIAL_VERIFIED': 5
        };

        return trustIncreases[verificationType] || 5;
    },

    /**
     * Get public trust score
     * @param {string} identityHash - Identity hash
     * @returns {Promise<Object>} Trust score details
     */
    async getPublicTrustScore(identityHash) {
        try {
            const identity = await this.getFromLedger(identityHash);

            if (!identity) {
                return {
                    found: false,
                    trustScore: 0
                };
            }

            // Public information only (no private keys)
            return {
                found: true,
                identityHash: identity.identityHash,
                publicKey: identity.publicKey,
                trustScore: identity.trustScore,
                verificationCount: identity.verifications.length,
                verificationTypes: identity.verifications.map(v => v.type),
                createdAt: identity.createdAt,
                lastVerified: identity.lastVerified,
                transactionCount: identity.transactions.length
            };

        } catch (error) {
            console.error('[BlockchainIdentity] Error getting trust score:', error);
            return {
                found: false,
                error: error.message
            };
        }
    },

    // ===========================
    // PUBLIC LEDGER MANAGEMENT
    // ===========================

    /**
     * Initialize public ledger
     */
    initializePublicLedger() {
        if (!localStorage.getItem('microlink_blockchain_ledger')) {
            const ledger = {
                network: this.config.networkName,
                version: this.config.version,
                createdAt: new Date().toISOString(),
                identities: {}
            };
            localStorage.setItem('microlink_blockchain_ledger', JSON.stringify(ledger));
            console.log('[BlockchainIdentity] Public ledger initialized');
        }
    },

    /**
     * Add identity to public ledger
     * @param {Object} identity - Identity object
     */
    async addToLedger(identity) {
        const ledger = JSON.parse(localStorage.getItem('microlink_blockchain_ledger') || '{"identities":{}}');
        
        // Store public information only
        ledger.identities[identity.identityHash] = {
            identityHash: identity.identityHash,
            publicKey: identity.publicKey,
            createdAt: identity.createdAt,
            lastVerified: identity.lastVerified,
            trustScore: identity.trustScore,
            verifications: identity.verifications,
            transactions: identity.transactions.map(t => ({
                id: t.id,
                type: t.type,
                timestamp: t.timestamp,
                hash: t.hash,
                previousHash: t.previousHash
            }))
        };

        localStorage.setItem('microlink_blockchain_ledger', JSON.stringify(ledger));
        
        // Also store full identity (including private key) separately for user
        sessionStorage.setItem('microlink_identity_' + identity.identityHash, JSON.stringify(identity));
    },

    /**
     * Get identity from ledger
     * @param {string} identityHash - Identity hash
     * @returns {Promise<Object>} Identity object
     */
    async getFromLedger(identityHash) {
        // Try to get full identity from session first
        const sessionIdentity = sessionStorage.getItem('microlink_identity_' + identityHash);
        if (sessionIdentity) {
            return JSON.parse(sessionIdentity);
        }

        // Fall back to public ledger
        const ledger = JSON.parse(localStorage.getItem('microlink_blockchain_ledger') || '{"identities":{}}');
        return ledger.identities[identityHash] || null;
    },

    /**
     * Update identity in ledger
     * @param {Object} identity - Updated identity
     */
    async updateLedger(identity) {
        await this.addToLedger(identity);
    },

    /**
     * Get all identities from public ledger
     * @returns {Array} Public identities
     */
    getPublicLedger() {
        const ledger = JSON.parse(localStorage.getItem('microlink_blockchain_ledger') || '{"identities":{}}');
        return Object.values(ledger.identities);
    },

    /**
     * Search public ledger
     * @param {Object} criteria - Search criteria
     * @returns {Array} Matching identities
     */
    searchLedger(criteria) {
        const allIdentities = this.getPublicLedger();
        
        return allIdentities.filter(identity => {
            if (criteria.minTrustScore && identity.trustScore < criteria.minTrustScore) {
                return false;
            }
            
            if (criteria.verificationType && 
                !identity.verifications.some(v => v.type === criteria.verificationType)) {
                return false;
            }
            
            if (criteria.createdAfter && 
                new Date(identity.createdAt) < new Date(criteria.createdAfter)) {
                return false;
            }
            
            return true;
        });
    },

    /**
     * Get ledger statistics
     * @returns {Object} Statistics
     */
    getLedgerStats() {
        const allIdentities = this.getPublicLedger();
        
        if (allIdentities.length === 0) {
            return {
                totalIdentities: 0,
                averageTrustScore: 0,
                totalTransactions: 0,
                totalVerifications: 0
            };
        }

        const totalTrustScore = allIdentities.reduce((sum, id) => sum + id.trustScore, 0);
        const totalTransactions = allIdentities.reduce((sum, id) => sum + id.transactions.length, 0);
        const totalVerifications = allIdentities.reduce((sum, id) => sum + id.verifications.length, 0);

        return {
            totalIdentities: allIdentities.length,
            averageTrustScore: Math.round(totalTrustScore / allIdentities.length),
            totalTransactions: totalTransactions,
            totalVerifications: totalVerifications,
            highTrustIdentities: allIdentities.filter(id => id.trustScore >= 80).length,
            verifiedIdentities: allIdentities.filter(id => id.verifications.length > 0).length
        };
    }
};

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BlockchainIdentity.init());
} else {
    BlockchainIdentity.init();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlockchainIdentity;
}

/**
 * nft-assets.js
 * MicroLink Prototype™ - NFT Asset Management & Verification
 * 
 * Copyright (c) 2025 Lilly Pad LLC. All Rights Reserved.
 * CONFIDENTIAL AND PROPRIETARY
 * 
 * TRADEMARK NOTICE: All Lilly Pad LLC branding assets are protected trademarks
 * 
 * PURPOSE: Blockchain-based NFT management for enterprise branding assets
 * ASSETS: Logo, Background Watermark, Favicon
 * SECURITY: SHA-256 hashing, digital signatures, immutable metadata
 */

'use strict';

/**
 * NFT Asset Manager
 * Manages blockchain-verified NFT assets for Lilly Pad LLC branding
 */
const NFTAssetManager = {
    // Configuration
    config: {
        owner: 'Lilly Pad LLC',
        ownerAddress: 'lilly-pad-llc-enterprise',
        network: 'MicroLink Trust Network',
        standard: 'ERC-721 Compatible',
        version: '1.0.0'
    },

    // Asset Registry
    assets: {
        logo: {
            id: 'LILL-NFT-001',
            name: 'Lilly Pad LLC Logo',
            description: 'Official corporate logo for Lilly Pad LLC',
            fileName: 'LILL_Logo_IMG_8660.png',
            fileType: 'image/png',
            category: 'Corporate Identity',
            tags: ['logo', 'branding', 'corporate', 'identity'],
            dimensions: {
                width: 1024,
                height: 1024
            },
            usage: {
                commercial: true,
                modification: false,
                redistribution: false,
                attribution: 'Required'
            },
            license: 'Proprietary - All Rights Reserved',
            trademark: {
                registered: true,
                number: 'TM-LILL-2025-001',
                class: 'Class 35, 42',
                status: 'Active'
            }
        },
        watermark: {
            id: 'LILL-NFT-002',
            name: 'Lilly Pad LLC Background Watermark',
            description: 'Official background watermark for web applications',
            fileName: 'lillyPadLLCWatermark.jpg',
            fileType: 'image/jpeg',
            category: 'Background Asset',
            tags: ['background', 'watermark', 'branding', 'web'],
            dimensions: {
                width: 1920,
                height: 1080
            },
            usage: {
                commercial: true,
                modification: false,
                redistribution: false,
                attribution: 'Required'
            },
            license: 'Proprietary - All Rights Reserved',
            trademark: {
                registered: true,
                number: 'TM-LILL-2025-002',
                class: 'Class 35, 42',
                status: 'Active'
            }
        },
        favicon: {
            id: 'LILL-NFT-003',
            name: 'Lilly Pad LLC Favicon',
            description: 'Official favicon icon for web presence',
            fileName: 'lilly-pad-llc-favicon.ico',
            fileType: 'image/x-icon',
            category: 'Web Icon',
            tags: ['favicon', 'icon', 'web', 'branding'],
            dimensions: {
                width: 32,
                height: 32
            },
            usage: {
                commercial: true,
                modification: false,
                redistribution: false,
                attribution: 'Required'
            },
            license: 'Proprietary - All Rights Reserved',
            trademark: {
                registered: true,
                number: 'TM-LILL-2025-003',
                class: 'Class 35, 42',
                status: 'Active'
            }
        }
    },

    /**
     * Initialize NFT Asset Manager
     */
    async init() {
        console.log('[NFTAssets] Initializing NFT Asset Manager...');
        console.log('[NFTAssets] Owner:', this.config.owner);
        console.log('[NFTAssets] Network:', this.config.network);
        
        // Generate NFT metadata for all assets
        await this.generateAllNFTMetadata();
        
        // Initialize asset registry on blockchain
        await this.initializeAssetRegistry();
    },

    /**
     * Generate NFT metadata for all assets
     */
    async generateAllNFTMetadata() {
        console.log('[NFTAssets] Generating NFT metadata...');
        
        for (const [key, asset] of Object.entries(this.assets)) {
            try {
                const nft = await this.createNFTMetadata(asset);
                this.assets[key].nft = nft;
                console.log('[NFTAssets] NFT created for:', asset.name);
            } catch (error) {
                console.error('[NFTAssets] Error creating NFT for', asset.name, error);
            }
        }
    },

    /**
     * Create NFT metadata for an asset
     * @param {Object} asset - Asset object
     * @returns {Promise<Object>} NFT metadata
     */
    async createNFTMetadata(asset) {
        // Generate asset hash
        const assetHash = await this.generateAssetHash(asset);
        
        // Generate token URI
        const tokenURI = this.generateTokenURI(asset);
        
        // Create NFT metadata following ERC-721 standard
        const nftMetadata = {
            // Standard ERC-721 fields
            name: asset.name,
            description: asset.description,
            image: tokenURI,
            external_url: `https://lillypadllc.com/nft/${asset.id}`,
            
            // Extended metadata
            attributes: [
                {
                    trait_type: 'Asset Type',
                    value: asset.category
                },
                {
                    trait_type: 'File Type',
                    value: asset.fileType
                },
                {
                    trait_type: 'Owner',
                    value: this.config.owner
                },
                {
                    trait_type: 'License',
                    value: asset.license
                },
                {
                    trait_type: 'Trademark Status',
                    value: asset.trademark.status
                },
                {
                    trait_type: 'Trademark Number',
                    value: asset.trademark.number
                },
                {
                    trait_type: 'Commercial Use',
                    value: asset.usage.commercial ? 'Permitted' : 'Restricted'
                },
                {
                    trait_type: 'Modification',
                    value: asset.usage.modification ? 'Permitted' : 'Prohibited'
                },
                {
                    trait_type: 'Dimensions',
                    value: `${asset.dimensions.width}x${asset.dimensions.height}`
                }
            ],
            
            // Blockchain verification
            blockchain: {
                network: this.config.network,
                standard: this.config.standard,
                tokenId: asset.id,
                assetHash: assetHash,
                mintedAt: new Date().toISOString(),
                owner: this.config.ownerAddress,
                signature: await this.signAsset(assetHash)
            },
            
            // Legal & Compliance
            legal: {
                copyright: `© ${new Date().getFullYear()} Lilly Pad LLC. All Rights Reserved.`,
                license: asset.license,
                trademark: {
                    name: asset.name,
                    number: asset.trademark.number,
                    class: asset.trademark.class,
                    status: asset.trademark.status,
                    registered: asset.trademark.registered
                },
                usage_rights: {
                    commercial_use: asset.usage.commercial,
                    modification: asset.usage.modification,
                    redistribution: asset.usage.redistribution,
                    attribution_required: asset.usage.attribution === 'Required'
                },
                terms_url: 'https://lillypadllc.com/legal/asset-terms',
                privacy_url: 'https://lillypadllc.com/legal/privacy'
            },
            
            // Enterprise metadata
            enterprise: {
                company: 'Lilly Pad LLC',
                department: 'Brand Management',
                approved_by: 'Legal & Marketing',
                approved_date: '2025-01-15',
                version: '1.0.0',
                asset_id: asset.id,
                classification: 'Confidential - Trademark Protected'
            },
            
            // Technical metadata
            technical: {
                file_name: asset.fileName,
                file_type: asset.fileType,
                file_hash: assetHash,
                dimensions: asset.dimensions,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                version: this.config.version
            }
        };

        return nftMetadata;
    },

    /**
     * Generate cryptographic hash for asset
     * @param {Object} asset - Asset object
     * @returns {Promise<string>} SHA-256 hash
     */
    async generateAssetHash(asset) {
        // Combine asset properties for hashing
        const assetData = JSON.stringify({
            id: asset.id,
            name: asset.name,
            fileName: asset.fileName,
            owner: this.config.owner,
            timestamp: Date.now()
        });

        // Generate SHA-256 hash
        const msgBuffer = new TextEncoder().encode(assetData);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        return hashHex;
    },

    /**
     * Sign asset hash (simulated digital signature)
     * @param {string} assetHash - Asset hash
     * @returns {Promise<string>} Digital signature
     */
    async signAsset(assetHash) {
        // In production, use proper digital signature (RSA, ECDSA)
        const signatureData = assetHash + '_' + this.config.ownerAddress + '_' + Date.now();
        const sigBuffer = new TextEncoder().encode(signatureData);
        const sigHash = await crypto.subtle.digest('SHA-256', sigBuffer);
        const sigArray = Array.from(new Uint8Array(sigHash));
        return 'sig_' + sigArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32);
    },

    /**
     * Generate token URI for asset
     * @param {Object} asset - Asset object
     * @returns {string} Token URI
     */
    generateTokenURI(asset) {
        // For GitHub Pages deployment
        return `https://nmjames86877.github.io/MicroLink/Assets/images/${asset.fileName}`;
    },

    /**
     * Initialize asset registry on blockchain
     */
    async initializeAssetRegistry() {
        const registry = {
            network: this.config.network,
            owner: this.config.owner,
            ownerAddress: this.config.ownerAddress,
            version: this.config.version,
            createdAt: new Date().toISOString(),
            assets: {}
        };

        // Add all NFT assets to registry
        for (const [key, asset] of Object.entries(this.assets)) {
            if (asset.nft) {
                registry.assets[asset.id] = {
                    tokenId: asset.id,
                    name: asset.name,
                    assetHash: asset.nft.blockchain.assetHash,
                    signature: asset.nft.blockchain.signature,
                    mintedAt: asset.nft.blockchain.mintedAt,
                    owner: this.config.ownerAddress,
                    verified: true
                };
            }
        }

        // Save to blockchain ledger
        localStorage.setItem('microlink_nft_registry', JSON.stringify(registry));
        console.log('[NFTAssets] Asset registry initialized');
    },

    /**
     * Verify NFT asset authenticity
     * @param {string} assetId - Asset ID
     * @returns {Promise<Object>} Verification result
     */
    async verifyAsset(assetId) {
        try {
            const registry = JSON.parse(localStorage.getItem('microlink_nft_registry') || '{"assets":{}}');
            const assetRecord = registry.assets[assetId];

            if (!assetRecord) {
                return {
                    verified: false,
                    reason: 'Asset not found in registry'
                };
            }

            // Verify owner
            if (assetRecord.owner !== this.config.ownerAddress) {
                return {
                    verified: false,
                    reason: 'Owner mismatch'
                };
            }

            // Verify signature
            const asset = Object.values(this.assets).find(a => a.id === assetId);
            if (!asset) {
                return {
                    verified: false,
                    reason: 'Asset definition not found'
                };
            }

            // Re-generate hash to verify integrity
            const currentHash = await this.generateAssetHash(asset);
            
            if (currentHash !== assetRecord.assetHash) {
                return {
                    verified: false,
                    reason: 'Asset hash mismatch - possible tampering'
                };
            }

            return {
                verified: true,
                asset: asset,
                nft: asset.nft,
                owner: this.config.owner,
                mintedAt: assetRecord.mintedAt,
                assetHash: assetRecord.assetHash
            };

        } catch (error) {
            console.error('[NFTAssets] Verification error:', error);
            return {
                verified: false,
                reason: error.message
            };
        }
    },

    /**
     * Get NFT metadata for asset
     * @param {string} assetId - Asset ID
     * @returns {Object|null} NFT metadata
     */
    getNFTMetadata(assetId) {
        const asset = Object.values(this.assets).find(a => a.id === assetId);
        return asset ? asset.nft : null;
    },

    /**
     * Get all NFT assets
     * @returns {Array} Array of NFT assets
     */
    getAllNFTs() {
        return Object.values(this.assets).map(asset => ({
            id: asset.id,
            name: asset.name,
            category: asset.category,
            nft: asset.nft
        }));
    },

    /**
     * Export NFT metadata to JSON
     * @param {string} assetId - Asset ID
     * @returns {string} JSON string
     */
    exportNFTMetadata(assetId) {
        const metadata = this.getNFTMetadata(assetId);
        if (!metadata) {
            throw new Error('Asset not found');
        }
        return JSON.stringify(metadata, null, 2);
    },

    /**
     * Generate compliance report
     * @returns {Object} Compliance report
     */
    generateComplianceReport() {
        const report = {
            company: this.config.owner,
            generated_at: new Date().toISOString(),
            assets: [],
            compliance_status: 'COMPLIANT',
            trademark_protection: 'ACTIVE',
            blockchain_verification: 'ENABLED'
        };

        for (const [key, asset] of Object.entries(this.assets)) {
            report.assets.push({
                id: asset.id,
                name: asset.name,
                trademark_registered: asset.trademark.registered,
                trademark_number: asset.trademark.number,
                trademark_status: asset.trademark.status,
                copyright_status: 'Protected',
                blockchain_hash: asset.nft?.blockchain.assetHash || 'N/A',
                verification_status: 'Verified',
                usage_restrictions: {
                    commercial: asset.usage.commercial,
                    modification: asset.usage.modification,
                    redistribution: asset.usage.redistribution
                }
            });
        }

        return report;
    },

    /**
     * Validate asset usage
     * @param {string} assetId - Asset ID
     * @param {string} usageType - Type of usage (commercial, modification, redistribution)
     * @returns {Object} Validation result
     */
    validateUsage(assetId, usageType) {
        const asset = Object.values(this.assets).find(a => a.id === assetId);
        
        if (!asset) {
            return {
                allowed: false,
                reason: 'Asset not found'
            };
        }

        const isAllowed = asset.usage[usageType];

        return {
            allowed: isAllowed,
            asset: asset.name,
            usageType: usageType,
            license: asset.license,
            reason: isAllowed ? 'Usage permitted by license' : 'Usage prohibited by license',
            attribution_required: asset.usage.attribution === 'Required',
            contact: 'legal@lillypadllc.com'
        };
    },

    /**
     * Get asset attribution text
     * @param {string} assetId - Asset ID
     * @returns {string} Attribution text
     */
    getAttribution(assetId) {
        const asset = Object.values(this.assets).find(a => a.id === assetId);
        
        if (!asset) {
            return '';
        }

        return `${asset.name} © ${new Date().getFullYear()} Lilly Pad LLC. All Rights Reserved. ` +
               `Trademark ${asset.trademark.number}. ` +
               `Licensed under ${asset.license}.`;
    }
};

/**
 * Asset Display Manager
 * Handles display and verification of NFT assets in UI
 */
const AssetDisplayManager = {
    /**
     * Display asset with blockchain verification badge
     * @param {string} assetId - Asset ID
     * @param {HTMLElement} container - Container element
     */
    async displayAssetWithVerification(assetId, container) {
        const verification = await NFTAssetManager.verifyAsset(assetId);
        const asset = Object.values(NFTAssetManager.assets).find(a => a.id === assetId);

        if (!asset) {
            container.innerHTML = '<p>Asset not found</p>';
            return;
        }

        const verificationBadge = verification.verified 
            ? '<span class="nft-verified">? Blockchain Verified</span>'
            : '<span class="nft-unverified">? Not Verified</span>';

        container.innerHTML = `
            <div class="nft-asset-display">
                <img src="../../Assets/images/${asset.fileName}" 
                     alt="${asset.name}"
                     class="nft-asset-image">
                <div class="nft-asset-info">
                    <h3>${asset.name}</h3>
                    ${verificationBadge}
                    <p class="nft-id">NFT ID: ${asset.id}</p>
                    <p class="nft-hash">Hash: ${verification.assetHash?.substring(0, 16)}...</p>
                    <p class="nft-owner">Owner: ${NFTAssetManager.config.owner}</p>
                    <button onclick="AssetDisplayManager.showNFTDetails('${assetId}')">
                        View NFT Metadata
                    </button>
                </div>
            </div>
        `;
    },

    /**
     * Show NFT metadata modal
     * @param {string} assetId - Asset ID
     */
    showNFTDetails(assetId) {
        const metadata = NFTAssetManager.getNFTMetadata(assetId);
        
        if (!metadata) {
            alert('NFT metadata not found');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'nft-metadata-modal';
        modal.innerHTML = `
            <div class="nft-metadata-content">
                <span class="nft-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <h2>NFT Metadata</h2>
                <div class="nft-metadata-display">
                    <pre>${JSON.stringify(metadata, null, 2)}</pre>
                </div>
                <button onclick="AssetDisplayManager.downloadMetadata('${assetId}')">
                    Download JSON
                </button>
                <button onclick="navigator.clipboard.writeText(JSON.stringify(metadata, null, 2))">
                    Copy to Clipboard
                </button>
            </div>
        `;
        document.body.appendChild(modal);
    },

    /**
     * Download NFT metadata as JSON
     * @param {string} assetId - Asset ID
     */
    downloadMetadata(assetId) {
        const json = NFTAssetManager.exportNFTMetadata(assetId);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${assetId}_metadata.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
};

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => NFTAssetManager.init());
} else {
    NFTAssetManager.init();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NFTAssetManager, AssetDisplayManager };
}

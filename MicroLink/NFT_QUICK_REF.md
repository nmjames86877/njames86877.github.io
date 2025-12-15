# ?? NFT Assets Quick Reference Card

## ?? Protected Assets

| Asset | NFT ID | File | Trademark | Status |
|-------|--------|------|-----------|--------|
| Logo | `LILL-NFT-001` | LILL_Logo_IMG_8660.png | TM-LILL-2025-001 | ? |
| Watermark | `LILL-NFT-002` | lillyPadLLCWatermark.jpg | TM-LILL-2025-002 | ? |
| Favicon | `LILL-NFT-003` | lilly-pad-llc-favicon.ico | TM-LILL-2025-003 | ? |

---

## ?? Quick Code Examples

### Include NFT System
```html
<script src="../js/nft-assets.js"></script>
<link rel="stylesheet" href="../css/nft-assets.css">
```

### Verify Asset
```javascript
const verified = await NFTAssetManager.verifyAsset('LILL-NFT-001');
```

### Display Asset
```javascript
await AssetDisplayManager.displayAssetWithVerification(
    'LILL-NFT-001', 
    document.getElementById('container')
);
```

### Check Usage
```javascript
const canModify = NFTAssetManager.validateUsage('LILL-NFT-001', 'modification');
// Returns: { allowed: false, reason: "Prohibited by license" }
```

### Get Attribution
```javascript
const text = NFTAssetManager.getAttribution('LILL-NFT-001');
```

### Export Metadata
```javascript
const json = NFTAssetManager.exportNFTMetadata('LILL-NFT-001');
```

### Compliance Report
```javascript
const report = NFTAssetManager.generateComplianceReport();
```

---

## ?? Usage Rights

| Permission | Allowed | Notes |
|------------|---------|-------|
| Commercial Use | ? Yes | With license |
| Modification | ? No | Prohibited |
| Redistribution | ? No | Prohibited |
| Attribution | ? Required | Always |

---

## ?? UI Components

### Verification Badge
```html
<span class="nft-verified">? Blockchain Verified</span>
```

### Compliance Badge
```html
<div class="nft-compliance-badge">
    Blockchain Verified & Compliant
</div>
```

### Asset Card
```html
<div class="nft-card">
    <img src="..." class="nft-card-image">
    <div class="nft-card-title">Asset Name</div>
    <div class="nft-card-id">LILL-NFT-001</div>
</div>
```

---

## ?? NFT Metadata Fields

```json
{
  "name": "Asset Name",
  "blockchain": {
    "tokenId": "LILL-NFT-001",
    "assetHash": "SHA-256...",
    "signature": "sig_...",
    "owner": "lilly-pad-llc-enterprise"
  },
  "legal": {
    "trademark": {
      "number": "TM-LILL-2025-001",
      "status": "Active"
    },
    "usage_rights": {
      "commercial_use": true,
      "modification": false
    }
  }
}
```

---

## ?? Important Notes

### Legal Protection
- ? All assets are registered trademarks
- ? Copyright © 2025 Lilly Pad LLC
- ? Trademark Class 35, 42
- ? License: Proprietary - All Rights Reserved

### Blockchain Security
- ? SHA-256 cryptographic hashing
- ? Digital signature verification
- ? Public ledger transparency
- ? Immutable records

### Compliance
- ? ERC-721 standard metadata
- ? Attribution always required
- ? Modifications prohibited
- ? Contact: legal@lillypadllc.com

---

## ?? Contact

**Legal Inquiries**: legal@lillypadllc.com  
**Licensing**: licensing@lillypadllc.com  
**Support**: support@lillypadllc.com

---

**Quick Ref Version**: 1.0  
**Last Updated**: January 2025  
© 2025 Lilly Pad LLC

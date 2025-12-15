# ?? MicroLink Security & Session Implementation Guide

## ?? Executive Summary

This guide provides security best practices and implementation details for the MicroLink authentication system.

**Audience**: Developers implementing or maintaining MicroLink  
**Security Level**: Prototype ? Production Migration  
**Last Updated**: January 2025

---

## ?? Security Architecture Overview

### Three-Layer Security Model

```
???????????????????????????????????????????????????????????????????
?                    Security Architecture                         ?
???????????????????????????????????????????????????????????????????

Layer 1: Client-Side Protection (Current Prototype)
?? Input validation
?? Session token management
?? Auto-logout on expiry
?? UI access control

Layer 2: Transport Security (GitHub Pages)
?? HTTPS enforcement
?? CSP headers
?? XSS protection

Layer 3: Server-Side Security (Production Required)
?? Password hashing (bcrypt/argon2)
?? JWT token signing
?? Session verification
?? Database encryption
?? API rate limiting
```

---

## ?? Current Implementation (Prototype)

### What's Implemented

#### 1. Authentication Module (`auth.js`)

**Features:**
? User registration with validation  
? Login with credential verification  
? Password strength requirements  
? Failed attempt tracking (5 max, 15-min lockout)  
? Session token generation  
? Auto token refresh (5 min before expiry)  
? Password reset workflow  
? Logout with session cleanup  

**Storage:**
- **localStorage**: User accounts (persistent)
- **sessionStorage**: Active sessions (temporary)

**Token Format:**
```javascript
// Format: mlp_{userHash}_{timestamp}_{random}
Example: "mlp_dGVzdEBl_1704556800000_abc123def"
```

#### 2. Session Management Module (`session.js`)

**Features:**
? Page access protection (SessionGuard)  
? Public vs. protected page routing  
? Session validation on page load  
? Activity monitoring (mouse, keyboard, scroll)  
? Automatic session checks (every 30 seconds)  
? Visibility change detection  
? UI components (status indicator, timer)  

**Protection Mechanism:**
```javascript
// Auto-protect all pages except public pages
SessionGuard.init({
    publicPages: ['signRegistration.html', 'index.html'],
    loginPage: 'signRegistration.html'
});
```

### Current Security Measures

| Feature | Status | Details |
|---------|--------|---------|
| Password Validation | ? | Min 8 chars, upper, lower, number |
| Login Attempts Limit | ? | 5 attempts, 15-min lockout |
| Session Expiration | ? | 1 hour, auto-refresh at 5-min |
| Token Generation | ?? | Client-side (not cryptographic) |
| Password Storage | ?? | Base64 (NOT secure) |
| HTTPS | ? | Enforced by GitHub Pages |
| CSP Headers | ? | Configured in HTML |
| XSS Protection | ? | Input sanitization |

---

## ?? Security Warnings

### Current Limitations

? **CRITICAL: Not Production-Ready**

```javascript
// Current password "hashing" (INSECURE)
hashPassword(password) {
    return btoa(password + '_microlink_salt');
    // This is NOT secure - easily reversible
}
```

? **No Server-Side Validation**
- All validation happens in browser
- Users can bypass client-side checks
- No protection against automated attacks

? **Browser Storage Security**
- localStorage/sessionStorage accessible via JavaScript
- Vulnerable to XSS attacks
- No encryption at rest

? **No Real OAuth**
- OAuth integrations are placeholders only
- Social login buttons non-functional
- Would require server-side callback handlers

---

## ? Production Migration Plan

### Phase 1: Backend Setup (Essential)

#### 1.1 Password Security
```javascript
// Recommended: bcrypt with salt rounds 12+
const bcrypt = require('bcrypt');
const saltRounds = 12;

async function hashPassword(password) {
    return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}
```

#### 1.2 JWT Token Implementation
```javascript
// Server-side JWT generation
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET; // From environment

function generateToken(user) {
    return jwt.sign(
        {
            userId: user.id,
            email: user.email,
            role: user.role
        },
        SECRET_KEY,
        {
            expiresIn: '1h',
            issuer: 'microlink-api',
            audience: 'microlink-app'
        }
    );
}

function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}
```

#### 1.3 Session Store (Redis)
```javascript
// Use Redis for session management
const redis = require('redis');
const client = redis.createClient();

async function createSession(userId, token) {
    const sessionData = {
        userId,
        token,
        createdAt: Date.now(),
        lastActivity: Date.now()
    };
    
    // Store with 1-hour expiry
    await client.setEx(
        `session:${userId}`,
        3600,
        JSON.stringify(sessionData)
    );
}

async function getSession(userId) {
    const data = await client.get(`session:${userId}`);
    return data ? JSON.parse(data) : null;
}
```

### Phase 2: Database Integration

#### 2.1 User Schema (SQL)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    role VARCHAR(50) DEFAULT 'user'
);

CREATE INDEX idx_users_email ON users(email);

CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);

CREATE TABLE login_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    ip_address INET,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    success BOOLEAN NOT NULL
);

CREATE INDEX idx_login_attempts_email ON login_attempts(email);
```

#### 2.2 User Schema (MongoDB)
```javascript
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    profile: {
        firstName: String,
        lastName: String
    },
    settings: {
        notifications: { type: Boolean, default: true },
        darkMode: { type: Boolean, default: false },
        language: { type: String, default: 'en' }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    lastLogin: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.index({ email: 1 });
```

### Phase 3: OAuth Integration

#### 3.1 OAuth 2.0 Flow
```javascript
// Example: Google OAuth with Passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://yourdomain.com/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    // Find or create user
    let user = await User.findOne({ email: profile.emails[0].value });
    
    if (!user) {
      user = await User.create({
        email: profile.emails[0].value,
        profile: {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName
        },
        emailVerified: true,
        oauthProvider: 'google',
        oauthId: profile.id
      });
    }
    
    return cb(null, user);
  }
));
```

#### 3.2 OAuth Routes
```javascript
// Express.js routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Generate JWT token
    const token = generateToken(req.user);
    
    // Set secure HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3600000 // 1 hour
    });
    
    res.redirect('/welcome');
  }
);
```

### Phase 4: Azure AD B2C Integration (Recommended)

#### 4.1 Configuration
```javascript
const msal = require('@azure/msal-node');

const msalConfig = {
    auth: {
        clientId: process.env.AZURE_AD_CLIENT_ID,
        authority: `https://${process.env.AZURE_AD_TENANT}.b2clogin.com/${process.env.AZURE_AD_TENANT}.onmicrosoft.com/B2C_1_signupsignin`,
        clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
        knownAuthorities: [`${process.env.AZURE_AD_TENANT}.b2clogin.com`]
    }
};

const cca = new msal.ConfidentialClientApplication(msalConfig);
```

#### 4.2 Benefits
? Enterprise-grade security  
? Built-in MFA support  
? Compliance certifications (SOC 2, ISO 27001)  
? Social identity providers included  
? Custom branding  
? Self-service password reset  
? Audit logging  
? Conditional access policies  

---

## ??? Security Best Practices

### 1. Password Requirements

**Minimum Standards:**
```javascript
const passwordRequirements = {
    minLength: 12,           // Increased from 8
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    preventCommon: true,     // Block "Password123!"
    preventPersonalInfo: true // Block name, email
};
```

**Implementation:**
```javascript
function validatePassword(password, user) {
    const issues = [];
    
    if (password.length < 12) {
        issues.push('Password must be at least 12 characters');
    }
    
    if (!/[A-Z]/.test(password)) {
        issues.push('Password must contain uppercase letters');
    }
    
    if (!/[a-z]/.test(password)) {
        issues.push('Password must contain lowercase letters');
    }
    
    if (!/[0-9]/.test(password)) {
        issues.push('Password must contain numbers');
    }
    
    if (!/[!@#$%^&*]/.test(password)) {
        issues.push('Password must contain special characters');
    }
    
    // Check against common passwords
    if (commonPasswords.includes(password.toLowerCase())) {
        issues.push('Password is too common');
    }
    
    // Check against user personal info
    if (user) {
        const lowerPass = password.toLowerCase();
        if (lowerPass.includes(user.firstName.toLowerCase()) ||
            lowerPass.includes(user.email.split('@')[0].toLowerCase())) {
            issues.push('Password cannot contain personal information');
        }
    }
    
    return {
        valid: issues.length === 0,
        issues: issues
    };
}
```

### 2. Rate Limiting

**Implementation:**
```javascript
// Express-rate-limit
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: 'Too many login attempts, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    // Store in Redis for distributed systems
    store: new RedisStore({
        client: redisClient,
        prefix: 'rl:login:'
    })
});

app.post('/api/auth/login', loginLimiter, async (req, res) => {
    // Login logic
});
```

### 3. CSRF Protection

**Implementation:**
```javascript
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.use(csrfProtection);

app.get('/login', (req, res) => {
    res.render('login', { csrfToken: req.csrfToken() });
});

app.post('/api/auth/login', (req, res) => {
    // CSRF token automatically validated
    // Login logic
});
```

### 4. Secure Headers

**Implementation:**
```javascript
const helmet = require('helmet');

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net", "unpkg.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
            fontSrc: ["'self'", "fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "raw.githubusercontent.com"],
            connectSrc: ["'self'", "api.yourdomain.com"]
        }
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));
```

### 5. Input Validation

**Implementation:**
```javascript
const { body, validationResult } = require('express-validator');

app.post('/api/auth/register',
    // Validation middleware
    body('email')
        .isEmail()
        .normalizeEmail()
        .trim(),
    body('password')
        .isLength({ min: 12 })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .trim(),
    body('firstName')
        .isLength({ min: 1, max: 100 })
        .trim()
        .escape(),
    
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // Registration logic
    }
);
```

---

## ?? Security Checklist

### Pre-Production Checklist

#### Authentication
- [ ] Server-side password hashing (bcrypt/argon2)
- [ ] Secure session storage (Redis/database)
- [ ] JWT token signing with private key
- [ ] Token refresh mechanism
- [ ] Multi-factor authentication (MFA)
- [ ] Account lockout after failed attempts
- [ ] Password strength requirements enforced
- [ ] Password history (prevent reuse)

#### Authorization
- [ ] Role-based access control (RBAC)
- [ ] Permission-based restrictions
- [ ] API endpoint protection
- [ ] Resource ownership verification

#### Session Management
- [ ] Secure HTTP-only cookies
- [ ] HTTPS-only flag on cookies
- [ ] SameSite cookie attribute
- [ ] Session timeout implementation
- [ ] Concurrent session limits
- [ ] Session invalidation on logout
- [ ] Session fixation prevention

#### Data Protection
- [ ] Database encryption at rest
- [ ] TLS/SSL for data in transit
- [ ] Sensitive data encryption (PII)
- [ ] Secure key management (Azure Key Vault)
- [ ] Data backup encryption

#### Input Validation
- [ ] Server-side validation on all inputs
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS protection (output encoding)
- [ ] CSRF token validation
- [ ] File upload validation
- [ ] JSON payload size limits

#### Monitoring & Logging
- [ ] Authentication event logging
- [ ] Failed login attempt tracking
- [ ] Session activity monitoring
- [ ] Anomaly detection
- [ ] Security incident alerting
- [ ] Audit trail for sensitive operations

#### Compliance
- [ ] GDPR data protection compliance
- [ ] CCPA privacy requirements
- [ ] SOC 2 Type II certification
- [ ] PCI DSS (if handling payments)
- [ ] HIPAA (if handling health data)

---

## ?? Security Testing

### Test Scenarios

#### 1. Authentication Bypass Test
```bash
# Try to access protected page without session
curl -I https://yourdomain.com/welcome.html
# Expected: 302 Redirect to login

# Try with invalid token
curl -H "Authorization: Bearer invalid_token" \
     https://yourdomain.com/api/user/profile
# Expected: 401 Unauthorized
```

#### 2. SQL Injection Test
```javascript
// Test with malicious input
POST /api/auth/login
{
    "email": "admin'--",
    "password": "anything"
}
// Expected: 400 Bad Request (validation error)
```

#### 3. XSS Test
```javascript
// Test with script injection
POST /api/user/profile
{
    "firstName": "<script>alert('XSS')</script>"
}
// Expected: Sanitized or rejected
```

#### 4. CSRF Test
```bash
# Try POST without CSRF token
curl -X POST https://yourdomain.com/api/auth/login \
     -d "email=test@example.com&password=Test1234"
# Expected: 403 Forbidden (CSRF token missing)
```

#### 5. Rate Limiting Test
```bash
# Rapid-fire login attempts
for i in {1..10}; do
    curl -X POST https://yourdomain.com/api/auth/login \
         -d "email=test@example.com&password=wrong"
done
# Expected: 429 Too Many Requests after 5 attempts
```

---

## ?? Security Contacts

### Reporting Security Issues

**Email**: security@lillypadllc.com  
**PGP Key**: [Available on request]  
**Response Time**: Within 24 hours

### Security Disclosure Policy

1. Report vulnerability privately
2. Allow 90 days for fix implementation
3. Coordinate public disclosure
4. Credit researchers (if desired)

---

**Document Version**: 1.0  
**Last Updated**: January 2025  
**Classification**: Internal Use Only

© 2025 Lilly Pad LLC. All Rights Reserved.

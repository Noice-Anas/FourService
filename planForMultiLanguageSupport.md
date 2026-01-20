# Multi-Language Support Plan for 4Service

## Overview
This document outlines the strategy for adding English language support to the 4Service landing page while maintaining the Arabic version as the default.

## Approach Options

### Option A: Separate HTML Files (Recommended for Static Sites)
Simple approach suitable for GitHub Pages without a build process.

**Folder Structure:**
```
FourService/
├── index.html              # Arabic version (default)
├── en/
│   └── index.html          # English version
├── src/
│   ├── css/
│   │   └── styles.css      # Shared styles
│   ├── js/
│   │   └── main.js         # Shared JavaScript
│   └── assets/             # Shared assets
```

**Pros:**
- No build tools required
- Works directly with GitHub Pages
- Simple to implement and maintain
- Each page can be fully customized

**Cons:**
- Content duplication
- Updates need to be made in multiple files

### Option B: JSON-based i18n (For Future SPA Migration)
Use JavaScript to load translations dynamically.

**Folder Structure:**
```
FourService/
├── index.html
├── src/
│   ├── locales/
│   │   ├── ar.json         # Arabic translations
│   │   └── en.json         # English translations
│   ├── js/
│   │   ├── main.js
│   │   └── i18n.js         # Translation handler
```

## Implementation Plan (Option A)

### Step 1: Add Language Toggle
Add a language switcher button to the header navigation.

```html
<!-- In header -->
<button class="lang-toggle" onclick="window.location.href='/en/'">
    EN
</button>
```

### Step 2: CSS Updates for LTR
Add LTR-specific styles to handle English text direction.

```css
/* LTR Support */
html[dir="ltr"] {
    direction: ltr;
}

html[dir="ltr"] .nav {
    right: auto;
    left: -100%;
}

html[dir="ltr"] .nav.active {
    left: 0;
}
```

### Step 3: Create English Version
Create `en/index.html` with:
- `dir="ltr"` and `lang="en"` attributes
- Translated content
- Language toggle pointing back to Arabic

### Step 4: English Content

**Header Navigation:**
- Home
- Our Services
- Location
- Contact Us

**Hero Section:**
- Title: "4Service Car Maintenance Center"
- Subtitle: "Expert and professional car maintenance, inspection, and programming"
- CTA: "Contact us on WhatsApp"

**Services Section:**
- Badge: "Comprehensive"
- Title: "Our Premium Services"
- Card 1: "Mechanical Maintenance" - "Comprehensive maintenance for all car types with genuine parts and service warranty"
- Card 2: "Inspection & Programming" - "Complete computer diagnostics and advanced programming for all vehicle electronic systems"

**Location Section:**
- Title: "Our Location"
- Card Title: "Kingdom of Saudi Arabia"
- Description: "We welcome you at our center"
- Button: "View on Google Maps"

**Contact Section:**
- Title: "Contact Information"
- Labels: Phone, Email, TikTok, Snapchat

**Footer:**
- "4Service Center - All Rights Reserved © 2026"

## Language Detection (Future Enhancement)

### Browser Language Detection
```javascript
function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const savedLang = localStorage.getItem('preferred-language');

    if (savedLang) {
        return savedLang;
    }

    return browserLang.startsWith('ar') ? 'ar' : 'en';
}
```

### URL-based Language Routing
- Arabic (default): `https://4service.github.io/`
- English: `https://4service.github.io/en/`

## SEO Considerations

### Hreflang Tags
Add to both language versions:
```html
<!-- In Arabic version -->
<link rel="alternate" hreflang="ar" href="https://yoursite.com/" />
<link rel="alternate" hreflang="en" href="https://yoursite.com/en/" />
<link rel="alternate" hreflang="x-default" href="https://yoursite.com/" />

<!-- In English version -->
<link rel="alternate" hreflang="ar" href="https://yoursite.com/" />
<link rel="alternate" hreflang="en" href="https://yoursite.com/en/" />
<link rel="alternate" hreflang="x-default" href="https://yoursite.com/" />
```

### Meta Tags
Update meta descriptions for each language:
```html
<!-- Arabic -->
<meta name="description" content="مركز 4Service لخدمات السيارات - صيانة ميكانيكية وفحص وبرمجة">

<!-- English -->
<meta name="description" content="4Service Car Maintenance Center - Mechanical maintenance, inspection and programming">
```

## Implementation Timeline

1. **Phase 1**: Add language toggle UI to current Arabic site
2. **Phase 2**: Create English HTML version with translated content
3. **Phase 3**: Add LTR CSS support
4. **Phase 4**: Implement SEO tags (hreflang)
5. **Phase 5**: Test and deploy

## Notes
- Keep Arabic as the default language (index.html)
- Ensure all shared assets work for both versions
- Consider RTL/LTR image mirroring if needed
- Test thoroughly on mobile devices for both languages

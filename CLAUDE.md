# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

4Service is a static landing page for a car maintenance center in Saudi Arabia. It's a mobile-first, RTL (Right-to-Left) Arabic website designed for GitHub Pages hosting.

## Project Structure

```
FourService/
├── index.html              # Main entry point (Arabic, RTL)
├── src/
│   ├── css/styles.css      # Mobile-first responsive styles
│   ├── js/main.js          # Hamburger menu, smooth scroll, animations
│   └── assets/
│       └── images/         # Logo, hero background, favicons
```

## Development

No build tools required. Open `index.html` directly in a browser or use a local server:

```bash
open index.html
# or
python -m http.server 8000
```

## Key Technical Details

- **Language/Direction**: Arabic (`lang="ar"` `dir="rtl"`)
- **CSS Architecture**: Mobile-first with CSS custom properties for theming
- **Animations**: Intersection Observer-based scroll animations (classes: `animate-on-scroll`, `fade-in-up`, `scale-up`, `stagger-1` through `stagger-4`)
- **Font**: Cairo (Google Fonts)
- **Icons**: Font Awesome 6.x CDN

## RTL Considerations

- Navigation drawer slides from right (not left)
- Use `dir="ltr"` on phone numbers and social handles for proper display
- When adding LTR (English) support, add CSS rules for `html[dir="ltr"]` selectors

## Multi-Language Support

See `planForMultiLanguageSupport.md` for the strategy to add English. The recommended approach is separate HTML files (`/en/index.html`) sharing the same CSS/JS assets.

## External Links

- WhatsApp: `https://wa.me/9660582707405`
- Google Maps: `https://maps.app.goo.gl/nc9Px4EWfei5Mk1m7`

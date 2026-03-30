

# UIS Office 1320 — Fundraising Platform

## Overview
A multilingual (Dhivehi/English/Arabic) fundraising website for the United Islamic Society office construction project, centered around a "Sponsor 1 Square Foot for 1320 MVR" concept. Clean, dignified, Islamic-organization feel.

## Design System
- **Primary**: Deep green `#1F5E4A`, **Background**: `#F7F8F7`, **Accent**: Gold `#C9A96A`, **Text**: `#1A1A1A`
- **Fonts**: MV Utheemu (uploaded) for Dhivehi text, clean sans-serif for English, proper Arabic font
- RTL support for Dhivehi and Arabic
- Generous spacing, calm animations, large accessible buttons

## Pages & Features

### 1. Homepage
- Hero with building image + headline "Build the United Islamic Society Office Together"
- CTA: "Sponsor 1 Square Foot – 1320 MVR"
- Animated donation progress bar (e.g., 320/1320 sq ft)
- Language switcher (Dhivehi 🇲🇻 / English 🇬🇧 / Arabic 🇸🇦)
- Brief project explanation section
- Bank account details with BML Islamic info

### 2. Sponsor a Square Foot Page
- Visual progress display (square feet sponsored vs total)
- Clean donation card with price and purpose
- Bank account section with transfer details
- Simple, no-pressure layout

### 3. Project Details Page
- Building purpose and community importance
- Architectural images (uploaded building renders)
- Square-foot concept explanation
- Trust-building content

### 4. CMS Admin Panel
- Email/password login (Lovable Cloud auth)
- Edit multilingual content (Dhivehi, English, Arabic)
- Update donation progress (square feet completed)
- Update bank account details
- Upload building progress photos
- Edit homepage sections

## Technical Approach
- **Frontend**: React + Vite + TypeScript + Tailwind + shadcn/ui
- **Backend**: Lovable Cloud for database (site content, donation progress, images), auth, and storage
- **i18n**: Context-based language system with RTL support
- **Custom font**: MV Utheemu loaded via @font-face for Dhivehi text
- Smooth progress bar animation, gentle fade transitions

## Database Tables
- `site_content` — multilingual text blocks (key, locale, value)
- `donation_progress` — current square feet sponsored, total target
- `bank_accounts` — account name, number, bank name
- `project_images` — uploaded photos with captions
- `site_settings` — general config (hero text, CTA text per locale)


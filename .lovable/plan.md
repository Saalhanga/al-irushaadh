# Full Rebrand: "UIS Office 1320" → "Al Irushaadh"

Replace all user-facing branding with **Al Irushaadh** (Dhivehi: އަލް އިރުޝާދު, Arabic: الإرشاد). No remaining "UIS", "1320", or "United Islamic Society" text anywhere user-facing.

## Changes

### 1. `index.html` — page metadata
- `<title>` → "Al Irushaadh"
- `meta description`, `og:title`, `og:description`, `twitter:title`, `twitter:description` → reworded to Al Irushaadh community fundraising
- `meta author` → "Al Irushaadh"

### 2. `src/components/Navbar.tsx`
- Brand text "UIS Office 1320" → "Al Irushaadh"

### 3. `src/components/Footer.tsx`
- Any UIS branding → Al Irushaadh

### 4. `src/i18n/translations.ts` — all 3 locales
- **English**: hero title, about texts, footer rights "© 2026 Al Irushaadh. All rights reserved.", bank reference "Al Irushaadh" instead of "UIS Office 1320", bank account name value → "Al Irushaadh", project purpose item → "Administrative hub for Al Irushaadh"
- **Dhivehi**: transliterate as "އަލް އިރުޝާދު" everywhere "United Islamic Society" / "UIS Office 1320" appears (hero, about, sponsor note, step 3, footer rights)
- **Arabic**: transliterate as "الإرشاد" everywhere the org name appears
- Campaign reference text ("Include 'UIS Office 1320' as your reference") → "Include 'Al Irushaadh' as your reference" (and Dhivehi/Arabic equivalents)

### 5. `src/pages/Admin.tsx`, `src/pages/Index.tsx`, `src/pages/ProjectDetails.tsx`
- Update any hardcoded "UIS Office 1320" / org-name strings (admin panel title, headings) to Al Irushaadh

### 6. Database content (migration)
- `bank_accounts` row: update account name from "United Islamic Society" to "Al Irushaadh"
- Any `site_content` rows containing "UIS Office 1320" → "Al Irushaadh"

### Not changed
- Logo image (user-provided) — kept as-is; flag if it visibly contains the old name
- Social media URLs, colors, layout, fonts — unchanged
- Route paths and component filenames (internal only)

### Technical details
- Simple string replacements; no structural changes
- Verify after: scan `rg -i "UIS|1320"` to confirm zero user-facing leftovers, then spot-check homepage in all 3 languages

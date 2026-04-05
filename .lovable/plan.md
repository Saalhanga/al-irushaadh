

## Change "Sponsor" to "Share" (Waqf concept)

Replace all user-facing "Sponsor" text with "Share" across all three languages, aligning with the Islamic Waqf concept of sharing/contributing.

### Changes

**`src/i18n/translations.ts`** — Update all sponsor-related translation strings:

English:
- `nav.sponsor`: "Sponsor" → "Share"
- `hero.cta`: "Sponsor 1 Square Foot – 1320 MVR" → "Share 1 Square Foot – 1320 MVR"
- `sponsor.title`: "Sponsor a Square Foot" → "Share a Square Foot"
- `sponsor.subtitle`: update "sponsor" → "share"
- `sponsor.howto`: "How to Sponsor" → "How to Share"
- `sponsor.step1`: "sponsor" → "share"
- `sponsor.step4`: "contribution" stays (already neutral)

Dhivehi:
- `nav.sponsor`: "ސްޕޮންސަރ" → "ޙިއްޞާ" (share/waqf)
- `hero.cta`: update "ސްޕޮންސަރ" → "ޙިއްޞާ"
- `sponsor.title`, `sponsor.subtitle`, `sponsor.howto`, `sponsor.step1`: replace "ސްޕޮންސަރ" with "ޙިއްޞާ"

Arabic:
- `nav.sponsor`: "رعاية" → "مشاركة" (share)
- `hero.cta`: update "ارعَ" → "شارِك"
- `sponsor.title`, `sponsor.subtitle`, `sponsor.howto`, `sponsor.step1`: replace sponsorship terms with sharing terms

No route or component renames needed — the `/sponsor` URL and component name are internal and don't affect user-facing text.


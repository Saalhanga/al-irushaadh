

## Add Social Media Links to Footer

### Changes

**`src/components/Footer.tsx`**
- Add a row of social media icon links between the dua text and copyright
- Icons: Facebook, Instagram, X (Twitter), TikTok, Telegram, YouTube
- Use `lucide-react` for Facebook, Instagram, Youtube
- For X, TikTok, Telegram (not in lucide), use simple SVG icons or lucide alternatives (`Twitter` for X, `Send` for Telegram, custom SVG for TikTok)
- Links open in new tab (`target="_blank" rel="noopener noreferrer"`)
- Style: horizontal flex row, opacity hover effect, matching footer color scheme

### Technical Details
- Lucide has: `Facebook`, `Instagram`, `Youtube`, `Send` (Telegram)
- For X/Twitter: lucide has `Twitter` icon
- For TikTok: use a small inline SVG since lucide doesn't have it
- Icons sized at 20-24px with hover opacity transition


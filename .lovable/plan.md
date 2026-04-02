

## Fix: Replace Emoji Flags with SVG Flag Images

### Problem
Flag emojis (🇬🇧, 🇲🇻, 🇸🇦) don't render on Windows and some browsers — they show as two-letter country codes ("GB", "MV", "SA") instead of actual flags.

### Solution
Replace emoji flags with small inline SVG flag icons using a free CDN (flagcdn.com) that serves country flag images reliably across all platforms.

### Change

**`src/components/LanguageSwitcher.tsx`**
- Change the `flag` property from emoji strings to country code strings (`gb`, `mv`, `sa`)
- Replace the emoji `<span>` with an `<img>` tag loading from `https://flagcdn.com/20x15/{code}.png`
- Add `width={20} height={15}` and appropriate `alt` text for accessibility


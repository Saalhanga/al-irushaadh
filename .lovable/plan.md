

## Apply MV Utheemu Font to Dhivehi Language Button

### Change

**`src/components/LanguageSwitcher.tsx`** — Add a `fontFamily` style to the Dhivehi (`dv`) button so its label renders in MV Utheemu instead of the default font.

- Add a `font` property to the languages array for `dv`: `font: "'MV Utheemu', sans-serif"`
- Apply it as an inline `style={{ fontFamily: lang.font }}` on the label `<span>`
- The font is already loaded in `index.css` via `@font-face`, so no additional setup needed


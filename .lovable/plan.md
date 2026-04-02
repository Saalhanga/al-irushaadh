

## Update Logo and Favicon with New UIS Image

### Changes

1. **Copy the uploaded image** to both locations:
   - `src/assets/uis-logo.png` (overwrite existing, for navbar)
   - `public/favicon.png` (for favicon)

2. **`index.html`** — Update favicon reference:
   - Change `<link rel="icon" type="image/x-icon" href="/favicon.ico">` to `<link rel="icon" type="image/png" href="/favicon.png">`
   - Delete `public/favicon.ico` if it exists

3. **Navbar** — No code changes needed, already imports from `src/assets/uis-logo.png`


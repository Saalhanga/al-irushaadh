

## Add UIS Logo to Navbar

### Changes

1. **Save logo asset** — Copy uploaded image to `src/assets/uis-logo.png`

2. **Update Navbar (`src/components/Navbar.tsx`)**
   - Import logo: `import uisLogo from "@/assets/uis-logo.png"`
   - Replace the green circle placeholder (lines 23-25) with `<img src={uisLogo} alt="UIS Logo" className="h-8 w-8 rounded-full object-cover" />`
   - Keep the "UIS Office 1320" text beside it

Footer remains unchanged.


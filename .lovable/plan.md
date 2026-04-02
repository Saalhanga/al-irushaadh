

## Remove target amount display and update label

The user wants two changes in the donation progress section:
1. Remove the `"/ MVR 1,700,000"` part (the `{t('progress.of')} {formatMVR(totalAmount)}` portion on line 44)
2. Change the Dhivehi translation of `progress.goal` from "ޓާގެޓް" to "ލިބިފައި" (meaning "received" instead of "target/goal")

### Changes

**`src/components/DonationProgress.tsx`** (line 44)
- Change the bottom-left text from `{formatMVR(currentAmount)} {t('progress.of')} {formatMVR(totalAmount)} {t('progress.goal')}` to just `{formatMVR(currentAmount)} {t('progress.goal')}` — removing the "of MVR 1,700,000" portion.

**`src/i18n/translations.ts`**
- Dhivehi: Change `'progress.goal': 'ޓާގެޓް'` to `'progress.goal': 'ލިބިފައި'`


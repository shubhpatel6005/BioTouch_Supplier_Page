Photo cards on the Supplier tab load images from this folder by filename.
If a file below is missing, the card falls back to a branded icon automatically
(see PhotoCard in src/SupplierPage.jsx) — nothing breaks either way.

  how-we-do-business.jpg     <- frozen vial cold-storage photo (supplied)
  supplier-registration.jpg  <- barcode scanning photo (supplied)
  supplier-maintenance.jpg   <- not supplied yet

Recommended: landscape, ~4:3, at least 800x600px, JPG or WebP.
To replace a photo, just overwrite the file with the same name.

Account Creation step screenshots (CSP tab > Account Creation) — same
graceful fallback, shows a "Screenshot coming soon" box if missing (see
StepImage in src/SupplierPage.jsx):

  account-creation-step-1.png   <- Join and Respond (supplied — "Profile Information Request" email)
  account-creation-step-2.png   <- Create an Account form (supplied)
  account-creation-step-3a.png  <- Email Verification code-entry screen (supplied)
  account-creation-step-3b.jpg  <- "Your Coupa Verification Code" email (supplied)

  account-creation-adding-users-step-1.png  <- Setup button (supplied — Admin > Users screen)
  account-creation-adding-users-step-2.png  <- Users menu option (supplied — same Admin > Users screen)
  account-creation-adding-users-step-3.png  <- Invite User (supplied — "Invite User" modal)

  account-creation-purchase-orders.png      <- Purchase Orders screen (supplied)
  account-creation-invoice-creation.png     <- Invoice Creation screen (supplied)

Recommended: screenshot/UI capture, landscape, PNG.

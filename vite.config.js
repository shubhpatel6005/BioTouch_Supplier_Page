import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This project contains ONLY the Supplier page. It is built as a
// standalone bundle so it can be deployed on its own (e.g. as a static
// page at /suppliers on biotouchglobal.com) without pulling in the rest
// of the site.
export default defineConfig({
  plugins: [react()],
})

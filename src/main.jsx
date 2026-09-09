import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import SupplierPage from './SupplierPage.jsx'
import './index.css'

// NOTE: intentionally no site header/footer here — per request, this
// bundle is just the Supplier page itself, meant to be dropped into the
// existing biotouchglobal.com shell (or deployed standalone).
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SupplierPage />
    <Analytics />
  </React.StrictMode>,
)

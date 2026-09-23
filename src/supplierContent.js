// Content transcribed from "COUPA WEBSITE PAGE.txt".
// A few spots in the source doc still reference other companies/domains
// (e.g. "Molex", "WM", "wm.com", "biotocuh.com") — left verbatim here.
// See the README for the full list to verify before go-live.

// The three large promo cards on the Supplier tab (image + big heading +
// body) — plain display content, not clickable. `image` = filename in
// /public/images/supplier/ — falls back to a styled placeholder if missing.
export const supplierPromoCards = [
  {
    id: 'relationships',
    image: 'how-we-do-business.jpg',
    heading: 'Relationships That Work for You',
    body: 'BioTouch provides innovative, customized, & cost-effective solutions to optimize healthcare services.',
  },
  {
    id: 'commitment',
    image: 'our-commitment.jpg',
    heading: 'Our Commitment to Customers',
    body: 'We are committed to our customers and developing partnerships with business enterprises to help build the world-class kits.',
  },
  {
    id: 'become-a-supplier-promo',
    image: 'supplier-registration.jpg',
    heading: 'Become a BioTouch Supplier',
    // NOTE: source text said "WM supplier network" (leftover from the WM
    // template this page was adapted from) — corrected to BioTouch here,
    // confirm this is the intended wording.
    // Rich-text body (same { text, tab } shape as renderRichText elsewhere)
    // so "Become a Supplier" and "Contact Us" jump tabs in-page.
    body: [
      'Interested in joining the BioTouch supplier network? To learn more and apply, visit the ',
      { text: 'Become a Supplier', tab: 'become-a-supplier' },
      ' and ',
      { text: 'Contact Us', tab: 'contact' },
      ' pages.',
    ],
  },
]

export const supplierTab = {
  // Rendered on the "Become a Supplier" tab (see BecomeSupplierTab in
  // SupplierPage.jsx) as flat, alternating-background sections (no card
  // box), matching the WM reference. `id` = anchor id on each section, kept
  // for deep-linking. Each entry in `body` is either a plain string or an
  // array of segments (strings mixed with { text, href } inline links) —
  // rendered as one paragraph either way. `image` is unused by this flat
  // layout but kept for reference/possible future use.
  sections: [
    {
      id: 'how-we-do-business',
      image: 'how-we-do-business.jpg',
      heading: 'How Do We Do Business',
      body: [
        'As part of our standard business practices, BioTouch has automated our Procure-to-Pay Process to improve operational efficiency and cost effectiveness. We are now using the Coupa Operating Network to manage purchase orders and receive invoices from suppliers. By implementing this tool, we have streamlined our work processes and payments to suppliers within contract terms.',
      ],
    },
    {
      id: 'supplier-registration',
      image: 'supplier-registration.jpg',
      heading: 'Supplier Registration',
      body: [
        'We invite all suppliers to register through Coupa, our Supplier Onboarding Portal. Suppliers are not required to register with Coupa to participate in RFI and RFP processes.',
        [
          'If a supplier is not registered, the supplier will be invited to become a Supplier for BioTouch. See the ',
          { text: 'FAQs & Coupa Guides', tab: 'faqs' },
          ' and ',
          { text: 'Coupa Supplier Portal', tab: 'csp' },
          ' pages for onboarding processes and answers to general onboarding questions. Note, incomplete or inaccurate information will result in a delay in supplier registration.',
        ],
        [
          'If you have any questions or technical issues about registering on the Coupa network, please contact Coupa directly or visit ',
          {
            text: 'the Coupa Success Portal for Suppliers',
            href: 'https://compass.coupa.com/en-us/products/product-documentation/supplier-resources/for-suppliers',
          },
          '.',
        ],
        ['For help with the registration process, ', { text: 'click here to view our onboarding video', href: '#' }, '.'],
        [
          'If you are a current supplier and are required to deliver goods and services via a purchase order, there are ',
          { text: 'the terms and conditions', href: '#' },
          ' that apply.',
        ],
      ],
    },
    {
      id: 'supplier-maintenance',
      image: 'supplier-maintenance.jpg',
      heading: 'Supplier Maintenance',
      body: [
        'If you are a current supplier, it is your responsibility to keep BioTouch informed of any changes to the following:',
      ],
      checklist: [
        {
          label: 'Certificate of Insurance (COI)',
          detail: 'If you are performing any service on a BioTouch site, ensure that your COI is up to date.',
        },
        {
          label: 'Address Information',
          detail: "Ensure that your addresses are up to date, both your company's ordering and remittance address.",
        },
        {
          label: 'Email Address Information',
          detail: "Ensure that your company's email address is up to date for receiving purchase orders.",
        },
        {
          label: 'Company Bank Account',
          detail: "Ensure that your company's bank account information is current.",
        },
        {
          label: 'Primary Contact Information',
          detail: "Ensure that your company's primary contact is up to date in our system.",
        },
      ],
      footer: [
        'You can initiate these changes via ',
        { text: 'the Coupa Supplier Portal', href: 'https://supplier.coupahost.com/sessions/new' },
        '. If you do not have a Coupa Supplier Portal account, see the ',
        {
          text: 'Coupa Onboarding Guide',
          href: 'https://compass.coupa.com/en-us/products/product-documentation/supplier-resources/for-suppliers/core-supplier-onboarding',
        },
        ' to create one.',
      ],
    },
  ],
}

export const cspTab = {
  subTabs: ['Overview', 'How To Register', 'First Time Users', 'Account Creation', 'PO Collaboration'],
  overview: {
    intro:
      'Welcome to the Coupa Supplier Portal (CSP), our secure and integrated platform designed to facilitate efficient collaboration between our organization and our valued suppliers. The portal enables streamlined management of procurement transactions, improves transparency, and ensures timely processing of orders and payments. Through CSP, suppliers can access real-time information, submit documents electronically, and maintain accurate company records within a centralized system.',
    whyCoupa: [
      'The Coupa Supplier Portal enables deeper collaboration with our indirect material suppliers',
      "BioTouch's preferred method of transacting with indirect suppliers",
      'Reduces supply chain risks, disruptions and shortages',
    ],
    benefits: [
      'Ability to receive and confirm purchase orders and submit invoices electronically',
      'Easy invoice creation via PO flip — automatically sends invoice for processing',
      'Improve visibility into the status of e-routed transactions',
      'Improve ability to get paid on time with automated invoice matching',
    ],
    quickIntroNote: 'Review the Quick Intro if you are new to Coupa.',
  },
  howToRegister: {
    who: {
      method: 'By BioTouch Invitation',
      body: 'Only suppliers who receive a direct invitation from BioTouch can register for the Coupa Supplier Portal.',
    },
    recipient: {
      role: 'Primary Contact',
      definition:
        "Supplier's assigned primary point of contact, responsible for receiving BioTouch communications. One primary contact per supplier account",
    },
    where: {
      intro:
        'As a BioTouch Supplier, your confirmed primary contact will receive an email invite to join the Coupa Supplier Portal (CSP)',
      lead: 'Once the primary contact accepts the invitation, he/she will be able to',
      items: [
        'Access the Coupa Supplier Portal',
        'Add multiple users and set-up login preferences',
        'Enable user notifications',
        'Automatically connected to BioTouch for e-routed transactions',
      ],
    },
    considerations:
      'You have to wait for BioTouch to send the invitation email. If you are the confirmed primary contact, and cannot find the invite, contact BioTouch for support.',
    // Rich-text body (same { text, tab } shape as renderRichText elsewhere) so
    // "Contact Us" switches tabs in-page rather than linking out.
    requestingInvitation: {
      body: [
        'You can request an invitation to join the Coupa Supplier Portal. Reach out to BioTouch using the ',
        { text: 'Contact Us', tab: 'contact' },
        ' page and select “Coupa Registration” under Category.',
      ],
    },
  },
  firstTimeUsers: {
    title: 'CSP Supplier Checklist - New Users',
    intro: 'Use this checklist to get started with CSP',
    items: [
      {
        label: 'Register for the CSP',
        detail:
          'The primary contact needs to process the email invitation to register on the CSP. NOTE: You cannot register for the CSP without the invitation from Coupa.',
      },
      {
        label: 'Create your account',
        detail: 'After receiving the invitation, create the CSP Account.',
      },
      {
        label: 'Create Custom Views',
        detail:
          'Change the view settings depending on how you want to see information on orders, invoices, catalogs, ASNs, or payments from BioTouch.',
      },
      {
        label: 'Manage your account',
        detail: 'Change your personal information, set your preferences.',
      },
      {
        label: 'Navigate and Get Help',
        detail: "Learn where to find what's in the CSP by using the OnDemand Microlessons guidance.",
      },
      {
        label: 'View and Manage Notifications',
        detail: 'Set your notification preferences.',
      },
    ],
  },
  accountCreation: {
    // NOTE: an array so more sub-headings can be added under "Account
    // Creation" later without restructuring — "First Time Registration" is
    // just the first one.
    sections: [
      {
        id: 'first-time-registration',
        heading: 'First Time Registration',
        intro:
          'If this is your first time registering, you will receive an email from do_not_reply@biotouchglobal.coupahost.com. You must click on the link at the bottom of the email to begin the registration process.',
        stepsIntro: 'To begin the registration process:',
        steps: [
          {
            text: 'Click on Join and Respond to create an account for the CSP.',
            images: ['account-creation-step-1.png'],
          },
          {
            text: 'Create your account in CSP by entering the information required below. Click "I accept the Privacy Policy and Terms of Use." Once you click ‘Create an Account’ you will be sent a Verification code.',
            images: ['account-creation-step-2.png'],
          },
          {
            text: 'Enter the Email Verification Code that was sent to your email address and click Next to finish setting up your profile.',
            // Two images: the code-entry screen, and the email it came from.
            images: ['account-creation-step-3a.png', 'account-creation-step-3b.jpg'],
          },
        ],
      },
      {
        id: 'adding-users-to-csp-portal',
        heading: 'Adding Users to CSP Portal',
        intro: 'To add your colleagues to the Coupa Supplier Portal, please follow the steps listed below:',
        steps: [
          {
            text: 'Click the Setup button on the CSP home page.',
            images: ['account-creation-adding-users-step-1.png'],
          },
          {
            text: 'Select the Users option from the menu bar.',
            images: ['account-creation-adding-users-step-2.png'],
          },
          {
            text: 'Click Invite User.',
            images: ['account-creation-adding-users-step-3.png'],
          },
          { text: 'Enter your colleagues’ contact information.' },
          { text: 'Select/deselect their permissions.' },
          { text: 'Send invitation.' },
        ],
      },
      {
        id: 'purchase-orders',
        heading: 'Purchase Orders',
        intro: 'This is where you will find your BioTouch Purchase Orders and create invoices directly from the portal.',
        link: {
          before: 'Please click on ',
          text: 'this link',
          after: ' to access the video tutorial for managing your Purchase Orders.',
          href: 'https://compass.coupa.com/en-us/products/product-documentation/supplier-resources/for-suppliers/coupa-supplier-portal/set-up-the-csp/purchase-orders',
        },
        images: ['account-creation-purchase-orders.png'],
      },
      {
        id: 'invoice-creation',
        heading: 'Invoice Creation',
        intro: 'This is where you will be able to create, edit and manage your invoices for BioTouch.',
        link: {
          before: 'Please click on ',
          text: 'this link',
          after: ' to access the video tutorials for managing your invoices.',
          href: 'https://compass.coupa.com/en-us/products/product-documentation/supplier-resources/for-suppliers/coupa-supplier-portal/set-up-the-csp/invoices/invoices-faq',
        },
        images: ['account-creation-invoice-creation.png'],
      },
    ],
  },
  poCollaboration: {
    video: { src: '/videos/po-collaboration-training.mp4' },
    guide: {
      before: 'Watch the video above for a full walkthrough, or download the ',
      text: 'PO Collaboration Training Guide (PDF)',
      after: '.',
      href: '/documents/po-collaboration-guide.pdf',
    },
  },
}

export const faqTab = {
  groups: [
    {
      id: 'coupa-at-biotouch',
      title: 'Coupa at BioTouch',
      items: [
        {
          q: 'Why has BioTouch Global partnered with Coupa?',
          a: "The Coupa solution provides many benefits to our suppliers, including free access to the Coupa Supplier Portal (CSP) where suppliers can manage their company information, view their POs, invoices, payment status and initiate e-invoicing to eliminate paper and support BioTouch's initiatives.",
        },
        {
          q: 'Is enrollment with Coupa required?',
          a: 'We hope that all our suppliers will partner with us by signing up for a Coupa account to transact electronically. To begin this process, contact Supplier Support at suppliersupport@biotouch.com. Please include your company name and contact information so that we can reach out to you.',
        },
        {
          q: 'How much does it cost to join the Coupa Supplier Portal (CSP)?',
          a: "Coupa doesn't charge suppliers to use the CSP.",
        },
        {
          q: 'Where can I get help registering in Coupa?',
          a: 'Suppliers that need registration help can use the Coupa Success Portal or download the Suppliers Guide for Registration and E-Invoicing.',
        },
        {
          q: 'Will BioTouch make payment using Coupa?',
          a: 'BioTouch will not issue payments through Coupa. However, you will be able to see your payment details through the Coupa Supplier Portal.',
        },
      ],
    },
    {
      id: 'invoicing',
      title: 'Invoicing',
      items: [
        {
          q: 'How do I cancel an invoice?',
          a: 'Contact the BioTouch Corporate Accounts Payable team and request to have your Coupa invoice disputed. Once the invoice shows in disputed status, you can submit a correction or void the invoice. Disputed invoices will be voided after 90 days of inactivity.',
        },
        {
          q: 'What type of files can I attach to an invoice?',
          a: 'For invoice image scans, attachments must be of the following types: PNG, GIF, JPG, JPEG, PJPEG, TIFF, or PDF.',
          after:
            'One attachment can be up to 100 MB, but for performance reasons, consider limiting the attachment size to 16 MB or so.',
        },
        {
          q: "What if I have an invoice that hasn't been paid?",
          a: 'For questions regarding payment information, contact BioTouch Global directly.',
        },
        {
          q: 'Once an invoice has been approved, what do I do next?',
          a: "Nothing. The invoice is in BioTouch's queue and you'll be paid based on the payment terms.",
        },
      ],
    },
    {
      id: 'orders',
      title: 'Orders',
      items: [
        {
          q: 'What if a purchase order was cancelled?',
          a: 'For any purchase order issues, email the BioTouch Corporate Accounts Payable team at purchasing@biotouchglobal.com.',
        },
        {
          q: 'How do I see BioTouch Global purchase orders?',
          a: 'On the main menu, click on the Orders tab. If you are connected to more than one Coupa customer, select their name from the Select Customer dropdown menu. You can see BioTouch Global purchase orders only if you have access.',
        },
        {
          q: 'How do I invoice a blanket purchase order?',
          a: "You can invoice multiple times against a single PO. Just click the gold coin icon for the PO as you normally would and enter the amount you'd like to appear on the invoice. The next time you want to invoice against the PO, just do the same thing.",
        },
        {
          q: 'What is the purpose of acknowledgment by the supplier?',
          a: "You can let your customers know that you've received the order. Some Coupa customers like their suppliers to use that field. Ask them if they want you to use it.",
        },
      ],
    },
    {
      id: 'technical-support-and-help',
      title: 'Technical Support and Help',
      items: [
        {
          q: 'What browser should I use with Coupa?',
          a: 'All browsers are supported, but Google Chrome is preferred.',
        },
        {
          q: 'What types of files can be attached in the Coupa Supplier Portal (CSP)?',
          a: 'Invoices can be attached in the Image Scan section of Coupa. Additional documents can be attached in the documents section using any of the following file types:',
          list: ['PDF', 'TIFF', 'DOC', 'JPG', 'XLS', 'XML', 'CSV', 'TXT'],
        },
        {
          q: 'What if I am not receiving password reset emails?',
          a: 'Check your spam/junk email folder.',
        },
        {
          q: 'Where can I go for help with Coupa?',
          a: 'There are two places you can visit for help with Coupa:',
          listType: 'ol',
          listItems: [
            {
              text: 'Coupa Success Portal for Suppliers',
              href: 'https://compass.coupa.com/en-us/products/product-documentation/supplier-resources/for-suppliers',
            },
            { text: 'Coupa Live Chat' },
          ],
          after: 'You must be logged in to the Coupa Supplier Portal to take advantage of the live chat feature.',
        },
        {
          q: 'What should I do if I get locked out of the Coupa Supplier Portal (CSP)?',
          a: "If you don't have your six-digit backup validation code, contact Coupa Support directly.",
        },
        {
          q: 'What should I do if I receive a "We\'re sorry, but something went wrong" error?',
          a: 'Contact Coupa Support directly.',
        },
      ],
    },
  ],
}

// Rendered on the Supplier tab (see UsefulDocuments in SupplierPage.jsx).
// NOTE: these exact 9 titles were copied from the WM reference screenshot to
// match its design 1:1 — they're WM's own document names, not BioTouch's.
// Swap in BioTouch's real supplier documents (and PDF links) before go-live.
export const usefulDocuments = [
  { title: 'Supplier Code of Conduct – English' },
  { title: 'Supplier Code of Conduct – French (Canada)' },
  { title: 'Supplier Code of Conduct – Spanish' },
  { title: 'General Terms and Conditions of Purchase' },
  { title: 'Privacy and Data Protection' },
  { title: 'Supplier Insurance Requirements' },
  { title: 'Supplier Safety and Health Declaration' },
  { title: 'Travel and Expense Guidelines' },
  { title: 'Consumer Privacy Rights' },
]

// Rendered on the "FAQs & Coupa Guides" tab, below the FAQ groups (see
// FaqTab in SupplierPage.jsx) — same DocAccordion box design as
// usefulDocuments above, per request.
export const supplierGuides = [
  { title: 'Coupa Supplier Registration and Electronic Invoicing' },
  { title: 'Creating an Invoice' },
  { title: 'Creating a Credit Note' },
  { title: 'Receiving a Purchase Order' },
  { title: 'Supplier Profile Information Request Guide' },
  { title: 'Coupa Overview Guide' },
  { title: 'Coupa Supplier Portal Admin and User Guide' },
]

// Rendered on the "Contact Us" tab (see ContactTab in SupplierPage.jsx).
// NOTE: field layout copied 1:1 from the WM reference screenshot. The
// "Location Country"/"Location Province/Territory" labels have been
// corrected to BioTouch — the option lists below are still WM's own
// wording, confirm the real country/category lists and a submission
// endpoint (there's currently no backend — Submit just shows a local
// thank-you message) before this goes live.
export const contactTab = {
  countryOptions: ['United States'],
  categoryOptions: [
    'General Inquiry',
    'Supplier Registration',
    'Coupa Registration',
    'Invoicing & Payments',
    'Technical Support',
    'Other',
  ],
}

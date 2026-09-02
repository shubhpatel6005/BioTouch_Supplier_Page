import { useState, useEffect, useRef } from 'react'
import './SupplierPage.css'
import {
  supplierTab,
  supplierPromoCards,
  cspTab,
  faqTab,
  usefulDocuments,
  supplierGuides,
  contactTab,
} from './supplierContent.js'
import {
  ChevronIcon,
  HandshakeIcon,
  ClipboardIcon,
  StarIcon,
  DocumentDownloadIcon,
  SearchIcon,
} from './icons.jsx'

const MAIN_TABS = [
  { id: 'supplier', label: 'Supplier' },
  { id: 'become-a-supplier', label: 'Become a Supplier' },
  { id: 'csp', label: 'Coupa Supplier Portal' },
  { id: 'faqs', label: 'FAQs & Coupa Guides' },
  { id: 'contact', label: 'Contact Us' },
]

// Hero title/sub/body swap per active tab. Any tab id not listed here falls
// back to the 'supplier' copy.
const HERO_CONTENT = {
  supplier: {
    title: 'Suppliers',
    sub: 'Our suppliers are essential to our business and the care we deliver.',
    body: 'BioTouch uses the Coupa Operating Network to manage purchase orders, invoices and supplier records. Explore the tabs below to register, learn how we pay, and find answers to common questions. This content applies to suppliers in the U.S.',
  },
  'become-a-supplier': {
    title: 'Become a Supplier',
    sub: 'Play an integral part in helping our business run.',
  },
  csp: {
    title: 'Coupa Supplier Portal (CSP)',
    sub: "Coupa is BioTouch's global platform for indirect procurement and Source-to-Pay (S2P) activities. It connects teams and suppliers to streamline purchasing, collaboration, and value creation.",
  },
  faqs: {
    title: 'Supplier FAQs',
    sub: 'The supplier knowledge you need, all in one place.',
  },
  contact: {
    title: 'Contact Us',
    sub: 'Please reach out to BioTouch using the form below.',
  },
}

export default function SupplierPage() {
  const [activeTab, setActiveTab] = useState('supplier')

  return (
    <div className="sp-page">
      <Hero content={HERO_CONTENT[activeTab] ?? HERO_CONTENT.supplier} />
      <TabNav activeTab={activeTab} onChange={setActiveTab} />
      <main className="sp-container">
        {activeTab === 'supplier' && <SupplierTab onNavigate={setActiveTab} />}
        {activeTab === 'become-a-supplier' && <BecomeSupplierTab onNavigate={setActiveTab} />}
        {activeTab === 'csp' && <CspTab />}
        {activeTab === 'faqs' && <FaqTab />}
        {activeTab === 'contact' && <ContactTab />}
      </main>
    </div>
  )
}

function Hero({ content }) {
  return (
    <header className="sp-hero">
      <div className="sp-hero-blob sp-hero-blob-a" aria-hidden="true" />
      <div className="sp-hero-blob sp-hero-blob-b" aria-hidden="true" />
      <div className="sp-hero-grid" aria-hidden="true" />
      <div className="sp-hero-inner">
        <h1 className="sp-hero-title">{content.title}</h1>
        <p className="sp-hero-sub">{content.sub}</p>
        {content.body && <p className="sp-hero-body">{content.body}</p>}
      </div>
    </header>
  )
}

function TabNav({ activeTab, onChange }) {
  return (
    <nav className="sp-tabnav" aria-label="Supplier page sections">
      <div className="sp-tabnav-inner">
        {MAIN_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`sp-tab ${activeTab === tab.id ? 'is-active' : ''}`}
            onClick={() => onChange(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

/* ---------------------------- Supplier tab ---------------------------- */

/* ------------------------- Promo cards (2-up, top) ----------------------- */
// The two large "Relationships That Work for You" / "Become a BioTouch
// Supplier" cards. Drop matching photos into public/images/supplier/ (see
// the README.txt in that folder for filenames + recommended size) — each
// card falls back to a branded icon placeholder automatically if missing.
// Mostly plain display content — the "Become a Supplier" tab in the nav is
// the way to reach the detail cards below. `body` can be a plain string or
// a renderRichText segment array (see the "Become a BioTouch Supplier" card,
// whose body links out to the Become a Supplier / Contact Us tabs).

const PROMO_ICONS = [HandshakeIcon, StarIcon, ClipboardIcon]

function PromoCard({ card, icon: Icon, onNavigate }) {
  const [imgOk, setImgOk] = useState(true)

  return (
    <div className="sp-promo-card">
      <span className="sp-promo-frame">
        {imgOk ? (
          <img
            className="sp-promo-img"
            src={`/images/supplier/${card.image}`}
            alt=""
            onError={() => setImgOk(false)}
          />
        ) : (
          <span className="sp-promo-placeholder" aria-hidden="true">
            <Icon />
          </span>
        )}
      </span>
      <span className="sp-promo-underline" aria-hidden="true" />
      <h2 className="sp-promo-heading">{card.heading}</h2>
      <p className="sp-promo-body">{renderRichText(card.body, onNavigate)}</p>
    </div>
  )
}

function PromoCards({ onNavigate }) {
  return (
    <div className="sp-promo-grid">
      {supplierPromoCards.map((card, i) => (
        <PromoCard card={card} icon={PROMO_ICONS[i % PROMO_ICONS.length]} onNavigate={onNavigate} key={card.id} />
      ))}
    </div>
  )
}

function SupplierTab({ onNavigate }) {
  return (
    <div className="sp-tabpanel">
      <PromoCards onNavigate={onNavigate} />
      <DocAccordion title="Useful Documents" documents={usefulDocuments} defaultOpen />
    </div>
  )
}

// Collapsible document-grid section: heading doubles as the expand toggle
// (+/-), revealing a 3-up card grid and a "Download All" button. Reused for
// "Useful Documents" (Supplier tab) and "Supplier Guides" (FAQs tab) — same
// box design both places, per request.
function DocAccordion({ id, title, documents, defaultOpen = false, query = '' }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div id={id} className={`sp-accordion-item sp-doc-accordion ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="sp-doc-accordion-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <h2 className="sp-doc-accordion-title">{title}</h2>
        <span className="sp-doc-toggle" aria-hidden="true" />
      </button>
      <div className="sp-accordion-panel">
        <div className="sp-accordion-panel-inner">
          <div className="sp-doc-accordion-body">
            <div className="sp-doc-grid">
              {documents.map((doc) => (
                <a className="sp-doc-card" href="#" key={doc.title}>
                  <h4>{highlightText(doc.title, query)}</h4>
                  <span className="sp-doc-download">
                    Download PDF
                    <DocumentDownloadIcon />
                  </span>
                </a>
              ))}
            </div>
            <div className="sp-doc-download-all-row">
              <a className="sp-btn-download-all" href="#">
                Download All
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* --------------------------- Become a Supplier tab ------------------------ */
// How Do We Do Business / Supplier Registration / Supplier Maintenance —
// reached via the "Become a Supplier" tab in the nav.

function BecomeSupplierTab({ onNavigate }) {
  return (
    <div className="sp-tabpanel sp-tabpanel-flush">
      {supplierTab.sections.map((section) => (
        <section className="sp-flat-section" id={section.id} key={section.heading}>
          <h2 className="sp-flat-heading">{section.heading}</h2>

          {section.body.map((p, i) => (
            <p className="sp-text" key={i}>
              {renderRichText(p, onNavigate)}
            </p>
          ))}

          {section.checklist && (
            <ul className="sp-checklist sp-checklist-dots">
              {section.checklist.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}:</strong> {item.detail}
                </li>
              ))}
            </ul>
          )}

          {section.footer && <p className="sp-text sp-text-muted">{renderRichText(section.footer, onNavigate)}</p>}
        </section>
      ))}
    </div>
  )
}

// A body paragraph is either a plain string or an array mixing strings with
// inline links: { text, href } opens a URL, { text, tab } switches to
// another MAIN_TABS id in-page (e.g. the "FAQs & Coupa Guides" mention).
function renderRichText(paragraph, onNavigate) {
  if (!Array.isArray(paragraph)) return paragraph
  return paragraph.map((segment, i) => {
    if (typeof segment === 'string') return segment
    if (segment.tab) {
      return (
        <button type="button" className="sp-inline-link sp-inline-link-btn" onClick={() => onNavigate(segment.tab)} key={i}>
          {segment.text}
        </button>
      )
    }
    return (
      <a className="sp-inline-link" href={segment.href} target="_blank" rel="noreferrer" key={i}>
        {segment.text}
      </a>
    )
  })
}

// Wraps every case-insensitive match of `query` inside `text` in a <mark>
// (yellow-highlighted). Returns `text` unchanged when there's no query.
// Used by the FAQ search to highlight matches in questions, answers, and
// guide titles.
function highlightText(text, query) {
  if (!query || !text) return text
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'ig'))
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark className="sp-search-highlight" key={i}>
        {part}
      </mark>
    ) : (
      part
    )
  )
}

/* ------------------------------- CSP tab -------------------------------- */

function CspTab() {
  const [subTab, setSubTab] = useState(cspTab.subTabs[0])

  return (
    <div className="sp-tabpanel">
      <div className="sp-subtabs">
        {cspTab.subTabs.map((t) => (
          <button
            key={t}
            type="button"
            className={`sp-pill ${subTab === t ? 'is-active' : ''}`}
            onClick={() => setSubTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {subTab === 'Overview' && <CspOverview />}
      {subTab === 'How To Register' && <CspHowToRegister />}
      {subTab === 'First Time Users' && <CspFirstTimeUsers />}
      {subTab === 'Account Creation' && <CspAccountCreation />}
      {subTab === 'PO Collaboration' && <CspPoCollaboration />}
    </div>
  )
}

function CspOverview() {
  const { overview } = cspTab
  return (
    <>
      <section className="sp-flat-section">
        <h2 className="sp-register-heading">Coupa Supplier Portal (CSP)</h2>
        <p className="sp-text">{overview.intro}</p>
      </section>

      <section className="sp-flat-section">
        <h2 className="sp-register-heading">Quick Intro and Benefits</h2>

        <div className="sp-quick-intro-grid">
          <span className="sp-quick-intro-frame">
            <img className="sp-quick-intro-img" src="/images/supplier/quick-intro.png" alt="" />
          </span>

          <div>
            <h3 className="sp-plain-subheading">Why Coupa?</h3>
            <ul className="sp-checklist sp-checklist-dots">
              {overview.whyCoupa.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h3 className="sp-plain-subheading">Benefits of using Coupa</h3>
            <ul className="sp-checklist sp-checklist-dots">
              {overview.benefits.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h3 className="sp-plain-subheading">Quick Intro</h3>
            <ul className="sp-checklist sp-checklist-dots">
              <li>
                Review the{' '}
                <a
                  className="sp-plain-link"
                  href="https://compass.coupa.com/en-us/products/product-documentation/supplier-resources/for-suppliers#Intro"
                  target="_blank"
                  rel="noreferrer"
                >
                  Quick Intro
                </a>{' '}
                if you are new to Coupa.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

// Anchors the "How To Register" sections link and matches the ids used by
// the TocCard's scroll-spy below.
const REGISTER_TOC_ITEMS = [
  { id: 'who-can-register', label: 'Who can Register?' },
  { id: 'where-do-i-register', label: 'Where Do I Register?' },
  { id: 'considerations', label: 'Considerations' },
  { id: 'requesting-an-invitation', label: 'Requesting an Invitation' },
]

function CspHowToRegister() {
  const { howToRegister } = cspTab
  return (
    <div className="sp-toc-layout">
      <div className="sp-toc-content">
        <section className="sp-register-section" id="who-can-register">
          <h2 className="sp-register-heading">Who can Register?</h2>
          <p className="sp-text">
            <strong>Method</strong>: {howToRegister.who.method}
          </p>
          <p className="sp-text">{howToRegister.who.body}</p>
          <p className="sp-text">
            <strong>Recipient:</strong> {howToRegister.recipient.role}
          </p>
          <p className="sp-text">Definition: {howToRegister.recipient.definition}</p>
        </section>

        <section className="sp-register-section" id="where-do-i-register">
          <h2 className="sp-register-heading">Where Do I Register?</h2>
          <p className="sp-text">{howToRegister.where.intro}</p>
          <p className="sp-text">{howToRegister.where.lead}</p>
          <ul className="sp-checklist sp-checklist-dots">
            {howToRegister.where.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="sp-register-section" id="considerations">
          <h2 className="sp-register-heading">Considerations</h2>
          <p className="sp-text">{howToRegister.considerations}</p>
        </section>

        <section className="sp-register-section" id="requesting-an-invitation">
          <h2 className="sp-register-heading">Requesting an Invitation</h2>
          <p className="sp-text">
            {howToRegister.requestingInvitation.body}{' '}
            <a
              className="sp-plain-link"
              href={howToRegister.requestingInvitation.linkHref}
              target="_blank"
              rel="noreferrer"
            >
              {howToRegister.requestingInvitation.linkText}
            </a>
          </p>
        </section>
      </div>

      <TocCard items={REGISTER_TOC_ITEMS} />
    </div>
  )
}

function TocCard({ items }) {
  const [active, setActive] = useState(items[0]?.id)
  // While a click-triggered smooth scroll is in flight (and briefly after),
  // ignore scroll-driven updates entirely — see the click-line comment
  // below for why.
  const suppressUntilRef = useRef(0)

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter(Boolean)
    if (!sections.length) return undefined

    // Walk the sections in order and take the last one whose top has
    // crossed this line — i.e. the section we're currently inside. The line
    // sits around the middle of the viewport rather than close to the top:
    // a line near the top stays "inside" a tall section (e.g. "Where Do I
    // Register", with its multi-item checklist) for the entire time its
    // heading is still visible at all, even once a later, shorter section
    // has scrolled substantially into view below it — exactly the
    // "lingering on the previous heading" bug this replaced.
    let ticking = false
    const updateActive = () => {
      ticking = false
      if (Date.now() < suppressUntilRef.current) return
      const line = window.innerHeight * 0.55
      let current = sections[0].id
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) {
          current = section.id
        } else {
          break
        }
      }
      setActive(current)
    }
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(updateActive)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    updateActive()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [items])

  // Plain href="#id" anchors silently do nothing when the URL hash is
  // already sitting on that id (e.g. click a TOC entry, scroll away by
  // hand, click the same entry again) — browsers only re-scroll on a hash
  // *change*. Scrolling manually on click sidesteps that entirely.
  //
  // The mid-viewport line above is deliberately generous, which creates a
  // separate problem for *clicking*: a short section's very next neighbor
  // (e.g. "Requesting an Invitation", right below "Considerations") can
  // already be sitting above that line the instant the clicked section
  // finishes landing at the top — the scroll-driven check would then
  // immediately steal the highlight back. Setting `active` directly and
  // suppressing the scroll-driven check for under a second sidesteps that:
  // the click is the source of truth until the scroll settles, then normal
  // scroll tracking resumes.
  const handleClick = (event, id) => {
    event.preventDefault()
    setActive(id)
    suppressUntilRef.current = Date.now() + 900
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <aside className="sp-toc-card">
      <h3 className="sp-toc-card-title">Table of Content</h3>
      <ul className="sp-toc-card-list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              className={`sp-toc-card-link ${active === item.id ? 'is-active' : ''}`}
              href={`#${item.id}`}
              onClick={(event) => handleClick(event, item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

function CspFirstTimeUsers() {
  const { firstTimeUsers } = cspTab
  return (
    <section className="sp-flat-section">
      <h2 className="sp-register-heading">{firstTimeUsers.title}</h2>
      <p className="sp-text">{firstTimeUsers.intro}</p>

      <ul className="sp-checklist sp-checklist-dots">
        {firstTimeUsers.items.map((item) => (
          <li key={item.label}>
            <strong>{item.label}</strong>: {item.detail}
          </li>
        ))}
      </ul>
    </section>
  )
}

// "Table of Content" entries for the Account Creation side card — one per
// sub-heading (currently "First Time Registration" and "Adding Users to CSP
// Portal", see cspTab.accountCreation.sections in supplierContent.js).
const ACCOUNT_CREATION_TOC_ITEMS = cspTab.accountCreation.sections.map((section) => ({
  id: section.id,
  label: section.heading,
}))

function CspAccountCreation() {
  const { accountCreation } = cspTab
  return (
    <div className="sp-toc-layout">
      <div className="sp-toc-content">
        {accountCreation.sections.map((section) => (
          <section className="sp-register-section" id={section.id} key={section.id}>
            <h2 className="sp-register-heading">{section.heading}</h2>
            <p className="sp-text">{section.intro}</p>

            {section.stepsIntro && <p className="sp-text">{section.stepsIntro}</p>}
            {section.steps && (
              <ol className="sp-account-steps">
                {section.steps.map((step, i) => (
                  <li key={i}>
                    <p className="sp-text">{step.text}</p>
                    {step.images && (
                      <div className="sp-step-images">
                        {step.images.map((image) => (
                          <StepImage key={image} src={`/images/supplier/${image}`} alt="" />
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            )}

            {section.link && (
              <p className="sp-text">
                {section.link.before}
                <a className="sp-plain-link" href={section.link.href} target="_blank" rel="noreferrer">
                  {section.link.text}
                </a>
                {section.link.after}
              </p>
            )}

            {section.images && (
              <div className="sp-step-images">
                {section.images.map((image) => (
                  <StepImage key={image} src={`/images/supplier/${image}`} alt="" />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      <TocCard items={ACCOUNT_CREATION_TOC_ITEMS} />
    </div>
  )
}

// A step screenshot that hasn't been supplied yet falls back to a plain
// "Screenshot coming soon" box instead of a broken image icon — same
// graceful-fallback convention as PromoCard's photos.
function StepImage({ src, alt }) {
  const [imgOk, setImgOk] = useState(true)
  if (!imgOk) {
    return <span className="sp-step-image-placeholder">Screenshot coming soon</span>
  }
  return <img className="sp-step-image" src={src} alt={alt} onError={() => setImgOk(false)} />
}

function CspPoCollaboration() {
  const { poCollaboration } = cspTab
  return (
    <section className="sp-flat-section sp-po-page">
      <span className="sp-po-video-frame">
        {/* preload="metadata" avoids pulling the full training video down
            before a visitor actually presses play. */}
        <video className="sp-po-video" src={poCollaboration.video.src} controls preload="metadata" />
      </span>
      <p className="sp-text">
        {poCollaboration.guide.before}
        <a className="sp-plain-link" href={poCollaboration.guide.href} target="_blank" rel="noreferrer">
          {poCollaboration.guide.text}
        </a>
        {poCollaboration.guide.after}
      </p>
    </section>
  )
}

/* ------------------------------- FAQ tab -------------------------------- */
// Flat divider-list style (heading + plain +/- rows), matching the WM
// reference — no boxed card, no icon chip, no circular chevron badge.

function FaqTab() {
  const [query, setQuery] = useState('')
  const needle = query.trim().toLowerCase()

  // Empty query short-circuits to the full, unfiltered lists — searching
  // matches a question's text or its answer, and a guide's title.
  const filteredGroups = needle
    ? faqTab.groups
        .map((group) => ({
          ...group,
          items: group.items.filter(
            (item) => item.q.toLowerCase().includes(needle) || item.a?.toLowerCase().includes(needle)
          ),
        }))
        .filter((group) => group.items.length > 0)
    : faqTab.groups

  const filteredGuides = needle
    ? supplierGuides.filter((doc) => doc.title.toLowerCase().includes(needle))
    : supplierGuides

  const showGuides = !needle || filteredGuides.length > 0
  const hasResults = filteredGroups.length > 0 || showGuides

  // The Table of Content only lists whatever's actually showing, so a
  // search that filters a whole group (or the guides) out doesn't leave a
  // link pointing at an empty section.
  const tocItems = [
    ...filteredGroups.map((group) => ({ id: group.id, label: group.title })),
    ...(showGuides ? [{ id: 'guides-accordion', label: 'Supplier Guides' }] : []),
  ]

  return (
    <div className="sp-tabpanel">
      <div className="sp-toc-layout">
        <div className="sp-toc-content">
          <label className="sp-faq-search-field">
            <input
              type="search"
              className="sp-faq-search-input"
              placeholder="Search by Keyword"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <SearchIcon className="sp-faq-search-icon" aria-hidden="true" />
          </label>

          {!hasResults && (
            <p className="sp-text sp-text-muted">No results for “{query}”. Try a different search term.</p>
          )}

          {filteredGroups.map((group) => (
            <section className="sp-faq-group" id={group.id} key={group.title}>
              <h2 className="sp-faq-heading">{group.title}</h2>
              <div className="sp-accordion">
                {group.items.map((item) => (
                  <AccordionItem key={item.q} item={item} forceOpen={Boolean(needle)} query={needle} />
                ))}
              </div>
            </section>
          ))}

          {showGuides && (
            <DocAccordion
              id="guides-accordion"
              title="Supplier Guides"
              documents={filteredGuides}
              defaultOpen
              query={needle}
            />
          )}
        </div>

        {tocItems.length > 0 && <TocCard items={tocItems} />}
      </div>
    </div>
  )
}

function AccordionItem({ item, forceOpen = false, query = '' }) {
  const { q, a, list, listType = 'ul', listItems, after } = item
  const [open, setOpen] = useState(forceOpen)
  const ListTag = listType === 'ol' ? 'ol' : 'ul'

  // Re-syncs to forceOpen only when *it* changes (search started/cleared),
  // not on every render, so a question the user manually collapsed while
  // still searching stays collapsed instead of snapping back open.
  useEffect(() => {
    setOpen(forceOpen)
  }, [forceOpen])

  return (
    <div className={`sp-accordion-item sp-accordion-item-flat ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="sp-accordion-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{highlightText(q, query)}</span>
        <span className="sp-doc-toggle" aria-hidden="true" />
      </button>
      <div className="sp-accordion-panel">
        <div className="sp-accordion-panel-inner">
          <div className="sp-accordion-body">
            <p>{highlightText(a, query)}</p>

            {list && (
              <ul className="sp-accordion-list">
                {list.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            )}

            {listItems && (
              <ListTag className="sp-accordion-list">
                {listItems.map((entry) => (
                  <li key={entry.text}>
                    {entry.href ? (
                      <a className="sp-accordion-link" href={entry.href} target="_blank" rel="noreferrer">
                        {entry.text}
                      </a>
                    ) : (
                      entry.text
                    )}
                  </li>
                ))}
              </ListTag>
            )}

            {after && <p>{after}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------ Contact Us tab --------------------------- */
// Layout/fields copied 1:1 from the WM reference screenshot per request.
// No backend wired up — Submit just shows a local thank-you message. See the
// NOTE above contactTab in supplierContent.js for what needs confirming.

const CONTACT_INITIAL = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  locationCountry: '',
  locationProvince: '',
  category: '',
  serviceType: '',
  message: '',
}

const CONTACT_REQUIRED = ['firstName', 'lastName', 'email', 'phone', 'companyName', 'message']

function ContactTab() {
  const [values, setValues] = useState(CONTACT_INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const update = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }))
  const canSubmit = CONTACT_REQUIRED.every((name) => values[name].trim().length > 0)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit || submitting) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="sp-tabpanel">
      <section className="sp-card sp-card-sharp">

        {submitted ? (
          <p className="sp-text">
            Thanks — your message has been received. A member of the BioTouch supplier team will be in
            touch shortly.
          </p>
        ) : (
          <form className="sp-contact-grid" onSubmit={handleSubmit} noValidate>
            <ContactField
              label="First Name"
              name="firstName"
              value={values.firstName}
              onChange={update('firstName')}
              maxLength={150}
            />
            <ContactField
              label="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={update('lastName')}
              maxLength={150}
            />
            <ContactField
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={update('email')}
              maxLength={150}
            />
            <ContactField
              label="Phone"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={update('phone')}
              maxLength={150}
            />
            <ContactField
              label="Company Name"
              name="companyName"
              value={values.companyName}
              onChange={update('companyName')}
              maxLength={150}
            />
            <ContactSelect
              label="BioTouch Location Country"
              name="locationCountry"
              value={values.locationCountry}
              onChange={update('locationCountry')}
              options={contactTab.countryOptions}
            />
            <ContactField
              label="BioTouch Location Province/Territory"
              name="locationProvince"
              value={values.locationProvince}
              onChange={update('locationProvince')}
              maxLength={150}
            />
            <ContactSelect
              label="Category"
              name="category"
              value={values.category}
              onChange={update('category')}
              options={contactTab.categoryOptions}
            />
            <ContactField
              label="What type of service do you provide?"
              name="serviceType"
              value={values.serviceType}
              onChange={update('serviceType')}
              maxLength={150}
              counterBelow
            />
            <ContactField
              label="Message / Question"
              name="message"
              value={values.message}
              onChange={update('message')}
              maxLength={500}
              textarea
            />

            {error && <p className="sp-text sp-contact-error">{error}</p>}

            <div className="sp-contact-submit-row">
              <button type="submit" className="sp-contact-submit" disabled={!canSubmit || submitting}>
                {submitting ? 'Sending…' : 'Submit'}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}

function ContactField({ label, name, value, onChange, maxLength, type = 'text', textarea = false, counterBelow = false }) {
  return (
    <label className={`sp-field ${counterBelow ? 'sp-field-counter-layout' : ''}`}>
      {textarea ? (
        <textarea
          className="sp-field-control sp-field-textarea"
          name={name}
          placeholder={label}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          rows={5}
        />
      ) : (
        <input
          className="sp-field-control"
          name={name}
          type={type}
          placeholder={label}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
        />
      )}
      <span className={counterBelow ? 'sp-field-counter-static' : 'sp-field-counter'}>
        {value.length}/{maxLength}
      </span>
    </label>
  )
}

function ContactSelect({ label, name, value, onChange, options }) {
  return (
    <label className="sp-field">
      <select className="sp-field-control sp-field-select" name={name} value={value} onChange={onChange} required>
        <option value="" disabled hidden>
          {label}
        </option>
        {options.map((opt) => (
          <option value={opt} key={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronIcon className="sp-field-chevron" />
    </label>
  )
}

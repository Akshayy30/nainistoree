'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { supabase } from '../../lib/supabase'
import { SEARCH_ITEMS, PRODUCTS, STORES, CATEGORIES, BESTSELLERS } from '../../lib/data'

/* ─── CART ─── */
interface CartItem { id: string; icon: string; name: string; price: number; qty: number }
function useCart() {
  const [cart, setCart] = useState<Record<string, CartItem>>({})
  const add = useCallback((id: string, icon: string, name: string, price: number) => {
    setCart(prev => ({ ...prev, [id]: prev[id] ? { ...prev[id], qty: prev[id].qty + 1 } : { id, icon, name, price, qty: 1 } }))
  }, [])
  const change = useCallback((id: string, delta: number) => {
    setCart(prev => {
      if (!prev[id]) return prev
      const qty = prev[id].qty + delta
      if (qty <= 0) { const next = { ...prev }; delete next[id]; return next }
      return { ...prev, [id]: { ...prev[id], qty } }
    })
  }, [])
  const count = Object.values(cart).reduce((s, i) => s + i.qty, 0)
  const total = Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0)
  return { cart, add, change, count, total }
}

/* ─── TOAST ─── */
function useToast() {
  const [msg, setMsg] = useState('')
  const [show, setShow] = useState(false)
  const toast = useCallback((m: string) => {
    setMsg(m); setShow(true)
    setTimeout(() => setShow(false), 2200)
  }, [])
  return { msg, show, toast }
}

/* ─── HIGHLIGHT ─── */
function hl(text: string, q: string) {
  const i = text.toLowerCase().indexOf(q.toLowerCase())
  if (i < 0) return <>{text}</>
  return <><span>{text.slice(0, i)}</span><mark style={{ background: 'transparent', color: '#C47A08', fontWeight: 700 }}>{text.slice(i, i + q.length)}</mark><span>{text.slice(i + q.length)}</span></>
}

export default function Home() {
  const { cart, add, change, count, total } = useCart()
  const { msg: toastMsg, show: toastVisible, toast } = useToast()

  const [cartOpen, setCartOpen] = useState(false)
  const [activeStore, setActiveStore] = useState('tamang')
  const [activeCat, setActiveCat] = useState('all')
  const [activeHeroCat, setActiveHeroCat] = useState('all')
  const [navQ, setNavQ] = useState('')
  const [navSugOpen, setNavSugOpen] = useState(false)
  const [session, setSession] = useState<any>(null)
  const navWrapRef = useRef<HTMLDivElement>(null)

  const navMatches = navQ.trim()
    ? SEARCH_ITEMS.filter((i: any) => i.name.toLowerCase().includes(navQ.toLowerCase()) || i.store.toLowerCase().includes(navQ.toLowerCase())).slice(0, 7)
    : []

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: any) => setSession(session as any))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e: any, session: any) => setSession(session as any))
    
    const h = (e: MouseEvent) => { if (navWrapRef.current && !navWrapRef.current.contains(e.target as Node)) setNavSugOpen(false) }
    document.addEventListener('mousedown', h)
    return () => {
      document.removeEventListener('mousedown', h)
      subscription.unsubscribe()
    }
  }, [])

  const copyCode = () => {
    navigator.clipboard?.writeText('NAINI50').catch(() => {})
    toast('✅ Code NAINI50 copied!')
  }

  return (
    <>
      {/* TOP BAR */}
      <div className="topbar">
        🏔️ Delivering across Nainital in <strong>35 minutes</strong> · Use code <strong>NAINI50</strong> for ₹50 off your first order
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="#" className="nav-logo">
            <div className="nav-logo-icon">🏪</div>
            <div className="nav-logo-text">Naini<span>Store</span></div>
          </a>
          <div className="nav-location">
            <span style={{ fontSize: 16 }}>📍</span>
            <div>
              <div className="nav-location-text">Mall Road</div>
              <div className="nav-location-sub">Nainital, Uttarakhand ▾</div>
            </div>
          </div>
          <div className="nav-search" ref={navWrapRef}>
            <div className="nav-search-bar">
              <span className="nav-search-icon">🔍</span>
              <input
                className="nav-search-input"
                placeholder="Search for momos, medicines, sweets..."
                value={navQ}
                onChange={e => { setNavQ(e.target.value); setNavSugOpen(true) }}
                onFocus={() => setNavSugOpen(true)}
                onKeyDown={e => e.key === 'Escape' && setNavSugOpen(false)}
                autoComplete="off"
              />
              <span className="nav-search-mic">🎙️</span>
            </div>
            <div className={`nav-suggestions${navSugOpen && navMatches.length ? ' open' : ''}`}>
              {navMatches.map((item: any, i: number) => (
                <div key={i} className="sug-item" onClick={() => { setNavQ(item.name); setNavSugOpen(false) }}>
                  <span className="sug-icon">{item.icon}</span>
                  <div className="sug-info">
                    <div className="sug-name">{hl(item.name, navQ)}</div>
                    <div className="sug-store">{item.store}</div>
                  </div>
                  <span className="sug-price">₹{item.price}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="nav-actions">
            <div className="nav-wallet">
              <span style={{ fontSize: 16 }}>💰</span>
              <span className="nav-wallet-text">₹0</span>
            </div>
            <div className="nav-cart" onClick={() => setCartOpen(true)}>
              🛒
              {count > 0 && <div className="nav-cart-badge">{count}</div>}
            </div>
            {session ? (
              <a href="/profile" className="nav-profile" style={{ textDecoration: 'none', background: '#D4860A', color: 'white', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {session?.user?.email?.charAt(0).toUpperCase()}
              </a>
            ) : (
              <a href="/auth" className="nav-profile" style={{ textDecoration: 'none', whiteSpace: 'nowrap', fontSize: '13px', padding: '8px 16px', background: '#E8F5E9', color: '#2E7D32', borderRadius: '50px', fontWeight: 'bold' }}>
                Login
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-inner">
          <div className="hero-top-row">
            <div>
              <div className="hero-brand-label">NainiStore</div>
              <div className="hero-eta-row">
                <span className="hero-eta-time">35 minutes</span>
                <span className="hero-km-chip">🏪 1.2 km</span>
              </div>
              <div className="hero-addr-row">
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>📍</span>
                <span className="hero-addr-text">Mall Road, Nainital, Uttarakhand</span>
                <span className="hero-addr-arrow">▾</span>
              </div>
            </div>
            <div className="hero-actions-col">
              {/* Removed duplicate wallet and avatar icons */}
            </div>
          </div>

          <div className="hero-search">
            <span className="hero-search-icon">🔍</span>
            <input className="hero-search-input" placeholder='Search "momos, medicine, sweets..."' autoComplete="off" />
            <span className="hero-search-mic">🎙️</span>
          </div>

          <div className="hero-cat-tabs">
            {CATEGORIES.map((cat: any) => (
              <button key={cat.id} className={`hero-cat-tab${activeHeroCat === cat.id ? ' active' : ''}`} onClick={() => setActiveHeroCat(cat.id)}>
                <span className="hero-cat-icon" style={{ position: 'relative' }}>
                  {cat.icon}
                  {cat.isNew && <span className="hero-cat-new">New</span>}
                </span>
                <span className="hero-cat-label">{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="hero-welcome-strip">
            <div className="hero-welcome-bag hero-welcome-bag-left">🛍️</div>
            <div className="hero-welcome-bag hero-welcome-bag-right">🛍️</div>
            <div className="hero-welcome-title">
              <span className="hero-welcome-star">✦</span>
              WELCOME
              <span className="hero-welcome-star">✦</span>
            </div>
            <div className="hero-welcome-sub">Order now &amp; enjoy FREE delivery</div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main>

        {/* CATEGORIES */}
        <section className="section-sm">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Shop by Category</h2>
            </div>
            <div className="cat-grid">
              {CATEGORIES.map((cat: any) => (
                <div key={cat.id} className={`cat-card${activeCat === cat.id ? ' active' : ''}`} onClick={() => setActiveCat(cat.id)}>
                  {cat.isNew && <span className="cat-card-new">New</span>}
                  <div className="cat-card-img" style={{ backgroundImage: `url(${cat.image})` }}></div>
                  <span className="cat-card-label">{cat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OFFER BANNER */}
        <section className="section-sm" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="offer-banner fade-up">
              <div className="offer-left">
                <span className="offer-emoji">🎉</span>
                <div>
                  <div className="offer-text-head">First order? Get ₹50 off instantly!</div>
                  <div className="offer-text-sub">Valid on all stores · Minimum order ₹199 · No questions asked</div>
                </div>
              </div>
              <div className="offer-code-pill" onClick={copyCode}>NAINI50 — Tap to copy</div>
            </div>
          </div>
        </section>

        {/* OUR STORES */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our Partner Stores</h2>
              <a href="#" className="section-link">View all stores →</a>
            </div>
            <div className="stores-grid">
              {STORES.map((store: any) => (
                <div key={store.id} className={`store-card${activeStore === store.id ? ' active' : ''}`} onClick={() => setActiveStore(store.id)}>
                  {store.featured && <div className="store-card-featured">⭐ Popular</div>}
                  <div className="store-card-img" style={{ backgroundImage: `url(${store.image})` }}></div>
                  <div className="store-card-name">{store.name}</div>
                  <div className="store-card-eta">⚡ {store.eta}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BESTSELLERS */}
        <section className="section" style={{ background: '#F7F6F2', margin: 0, padding: '48px 0' }}>
          <div className="container">
            <div className="section-header">
              <h2 className="section-title" style={{ fontSize: '32px', color: '#1A3636' }}>Bestsellers 🔥</h2>
              <a href="#" className="section-link">Browse all →</a>
            </div>
            <div className="bestsellers-grid">
              {BESTSELLERS.map((g: any, i: number) => {
                return (
                  <div key={g.name} className={`bestseller-card fade-up d${(i % 3) + 1} bs-animate-hover`}>
                    <div className="bestseller-imgs">
                      {g.images?.map((imgUrl: any, j: number) => (
                        <div 
                          key={j} 
                          className="bestseller-img-cell bs-animate-icon" 
                          style={{ 
                            backgroundImage: `url(${imgUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        />
                      ))}
                    </div>
                    <div className="bestseller-footer">
                      <div>
                        <div className="bestseller-more" style={{ color: '#666' }}>{g.count}</div>
                        <div className="bestseller-name">{g.name}</div>
                      </div>
                      <button className="bestseller-cta btn-animated">Shop →</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* POPULAR PRODUCTS */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Popular Near You 🔥</h2>
              <a href="#" className="section-link">See all products →</a>
            </div>
            <div className="products-grid">
              {PRODUCTS.map((p: any) => {
                const qty = cart[p.id]?.qty ?? 0
                return (
                  <div key={p.id} className="product-card">
                    <div className="product-img" style={{ backgroundImage: `url(${p.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      {p.discount && <span className="product-discount">{p.discount}% OFF</span>}
                    </div>
                    <div className="product-body">
                      <div className="product-name">{p.name}</div>
                      <div className="product-store">{p.store}</div>
                      <div className="product-price-row">
                        <div>
                          <span className="product-price">₹{p.price}</span>
                          {p.orig && <span className="product-orig">₹{p.orig}</span>}
                        </div>
                        {qty === 0 ? (
                          <button className="product-add" onClick={() => { add(p.id, p.icon, p.name, p.price); toast(`${p.icon} Added to cart!`) }}>+</button>
                        ) : (
                          <div className="product-qty-ctrl">
                            <button className="product-qty-btn minus" onClick={() => change(p.id, -1)}>−</button>
                            <span className="product-qty-val">{qty}</span>
                            <button className="product-qty-btn plus" onClick={() => add(p.id, p.icon, p.name, p.price)}>+</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* PAHADI SPECIALS */}
        <section className="section-sm" style={{ paddingTop: 0 }}>
          <div className="container">
            <div style={{ background: 'linear-gradient(135deg,#1A2E3D,#1B4D72)', borderRadius: 20, padding: '32px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
              <div>
                <div style={{ fontFamily: "'Libre Caslon Display',Georgia,serif", fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 8 }}>Pahadi Specials 🏔️</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>Curated local produce and handmade goods from Nainital&apos;s artisans</div>
              </div>
              <div style={{ fontFamily: "'Libre Caslon Display',Georgia,serif", fontSize: 13, fontWeight: 700, color: '#F5C96A', background: 'rgba(255,255,255,0.1)', padding: '10px 22px', borderRadius: 50, whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.2)' }}>Coming Soon →</div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-brand-name">NainiStore</div>
            <p className="footer-brand-desc">Nainital&apos;s fastest hyperlocal delivery platform. Fresh from local stores to your door in 35 minutes.</p>
          </div>
          <div>
            <div className="footer-col-title">Quick Links</div>
            <ul className="footer-links">
              {['Home', 'All Stores', 'My Orders', 'Offers'].map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Partner Stores</div>
            <ul className="footer-links">
              {['Tamang Momos', 'Himani Medicals', 'Saraswati Sweets', 'Ram Lal & Sons', "Prince's"].map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Help</div>
            <ul className="footer-links">
              {['Contact Us', 'Track Order', 'Return Policy', 'About Us'].map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 NainiStore · Nainital, Uttarakhand</span>
          <span>Made with ❤️ in the hills</span>
        </div>
      </footer>

      {/* CART OVERLAY */}
      <div className={`cart-overlay${cartOpen ? ' open' : ''}`} onClick={() => setCartOpen(false)} />

      {/* CART DRAWER */}
      <div className={`cart-drawer${cartOpen ? ' open' : ''}`}>
        <div className="cart-header">
          <div className="cart-title">Your Cart 🛒</div>
          <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>
        <div className="cart-items">
          {Object.keys(cart).length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <div className="cart-empty-text">Your cart is empty</div>
              <div style={{ fontSize: 13, color: '#aaa', marginTop: 6 }}>Add items to get started</div>
            </div>
          ) : Object.values(cart).map(item => (
            <div key={item.id} className="cart-item">
              <span className="cart-item-icon">{item.icon}</span>
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">₹{item.price} × {item.qty} = ₹{item.price * item.qty}</div>
              </div>
              <div className="cart-item-ctrl">
                <button className="cart-item-btn minus" onClick={() => change(item.id, -1)}>−</button>
                <span className="cart-item-qty">{item.qty}</span>
                <button className="cart-item-btn plus" onClick={() => change(item.id, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>
        {Object.keys(cart).length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span className="cart-total-lbl">Total</span>
              <span className="cart-total-val">₹{total}</span>
            </div>
            <button className="cart-checkout-btn">Proceed to Checkout →</button>
          </div>
        )}
      </div>

      {/* TOAST */}
      <div className={`toast${toastVisible ? ' show' : ''}`}>{toastMsg}</div>
    </>
  )
}

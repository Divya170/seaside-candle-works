/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function HeaderView({ v }: { v: any }) {
  return (
    <>
    {v.showChrome && (
      <>
        <header style={{ position: "sticky", top: "0", zIndex: "40", background: v.navBg, borderBottom: `1px solid ${v.navBorder}`, backdropFilter: "blur(10px)", transition: "background-color .35s, border-color .35s" }}>
          <div style={{ maxWidth: "1440px", margin: "0 auto", padding: `${v.navPad} clamp(20px,4vw,56px)`, display: "flex", alignItems: "center", gap: "clamp(16px,3vw,40px)", transition: "padding .35s ease" }}>
            <a href="/" aria-label="Seaside Candle Works, home" style={{ display: "flex", flexDirection: "column", gap: "3px", textDecoration: "none", color: "#152828", marginRight: "auto" }}>
              <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(21px,2vw,26px)", fontWeight: "500", lineHeight: "1", letterSpacing: ".01em", whiteSpace: "nowrap" }}>
                Seaside Candle Works
              </span>
              <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: ".24em", textTransform: "uppercase", color: "#3A4643", whiteSpace: "nowrap" }}>
                Rehoboth Beach · DE
              </span>
            </a>
            {v.isDesktop && (
              <>
                <nav aria-label="Primary">
                  <ul style={{ display: "flex", gap: "clamp(18px,2.2vw,34px)", listStyle: "none", margin: "0", padding: "0" }}>
                    {v.navLinks.map((l: any, i_l: number) => (
                      <Fragment key={i_l}>
                        <li>
                          <a className="hv-e85304" href={l.href} aria-current={l.current} style={{ display: "inline-block", padding: "10px 0", fontSize: "14px", fontWeight: "500", letterSpacing: ".02em", color: "#152828", textDecoration: "none", borderBottom: `1px solid ${l.line}`, transition: "border-color .25s" }}>
                            {l.label}
                          </a>
                        </li>
                      </Fragment>
                    ))}
                  </ul>
                </nav>
              </>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <button type="button" onClick={v.openSearch} aria-label="Search products" style={{ minWidth: "44px", height: "44px", padding: "0 10px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "none", border: "0", cursor: "pointer", fontSize: "14px", fontWeight: "500", color: "#152828" }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <circle cx="11" cy="11" r="6.5"></circle>
                  <path d="M16 16l4.5 4.5"></path>
                </svg>
                {v.isDesktop && (
                  <>
                    <span>
                      Search
                    </span>
                  </>
                )}
              </button>
              <button type="button" onClick={v.openDrawer} aria-label={`Cart, ${v.cartCount} items`} style={{ minWidth: "44px", height: "44px", padding: "0 10px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "none", border: "0", cursor: "pointer", fontSize: "14px", fontWeight: "500", color: "#152828" }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M5 8h14l-1.2 12H6.2L5 8z"></path>
                  <path d="M9 8V6.5a3 3 0 0 1 6 0V8"></path>
                </svg>
                {v.isDesktop && (
                  <>
                    <span>
                      Cart
                    </span>
                  </>
                )}
                {v.hasCart && (
                  <>
                    <span aria-hidden="true" style={{ minWidth: "20px", height: "20px", padding: "0 6px", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "10px", background: "#2B5352", color: "#FCFBF7", fontSize: "11px", fontWeight: "700" }}>
                      {v.cartCount}
                    </span>
                  </>
                )}
              </button>
              {v.isCompactNav && (
                <>
                  <button type="button" onClick={v.openMenu} aria-label="Open menu" aria-expanded={v.menuExpanded} style={{ minWidth: "44px", height: "44px", padding: "0 6px 0 10px", display: "inline-flex", alignItems: "center", gap: "8px", background: "none", border: "0", cursor: "pointer", fontSize: "14px", fontWeight: "600", color: "#152828" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <path d="M4 9h16M4 15h16"></path>
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </header>
      </>
    )}
    </>
  );
}

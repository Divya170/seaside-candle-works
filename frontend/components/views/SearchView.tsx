/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function SearchView({ v }: { v: any }) {
  return (
    <>
    {v.search && (
      <>
        <div onClick={v.closeSearch} style={{ position: "fixed", inset: "0", zIndex: "70", background: "rgba(36,59,59,.4)" }}>
          <div role="dialog" aria-modal="true" aria-label="Search" onClick={v.stop} style={{ background: "#F7F3EA", padding: "24px clamp(20px,4vw,56px) 32px", maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 60px rgba(36,59,59,.15)" }}>
            <div style={{ maxWidth: "880px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "18px" }}>
              <form role="search" onSubmit={v.submitSearch} style={{ display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid #152828", paddingBottom: "8px" }}>
                <label htmlFor="scw-search" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
                  Search products
                </label>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#152828" strokeWidth="1.5" aria-hidden="true">
                  <circle cx="11" cy="11" r="6.5"></circle>
                  <path d="M16 16l4.5 4.5"></path>
                </svg>
                <input id="scw-search" type="search" value={v.sq} onChange={v.setSq} placeholder="Search candles, scents, collections" autoComplete="off" style={{ flex: "1", minWidth: "0", border: "0", background: "transparent", fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(26px,3.4vw,40px)", padding: "8px 0", color: "#152828" }} />
                {v.hasSq && (
                  <>
                    <button type="button" onClick={v.clearSq} style={{ minHeight: "44px", padding: "0 8px", border: "0", background: "none", fontSize: "13px", fontWeight: "600", color: "#2B5352", cursor: "pointer" }}>
                      Clear
                    </button>
                  </>
                )}
                <button type="button" onClick={v.closeSearch} style={{ minHeight: "44px", padding: "0 8px", border: "0", background: "none", fontSize: "14px", fontWeight: "600", color: "#152828", cursor: "pointer" }}>
                  Close
                </button>
              </form>
              <p aria-live="polite" style={{ margin: "0", fontSize: "13px", color: "#3A4643" }}>
                {v.searchCountText}
              </p>
              <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,260px),1fr))", gap: "8px 24px" }}>
                {v.searchResults.map((sr: any, i_sr: number) => (
                  <Fragment key={i_sr}>
                    <li>
                      <a className="hv-34f3a1" href={sr.href} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "8px", borderRadius: "4px", color: "#152828", textDecoration: "none" }}>
                        <img src={sr.img} alt="" style={{ width: "52px", height: "64px", objectFit: "cover", objectPosition: sr.pos, borderRadius: "3px" }} />
                        <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "20px", fontWeight: "500" }}>
                            {sr.name}
                          </span>
                          <span style={{ fontSize: "13px", color: "#3A4643" }}>
                            {sr.meta}
                          </span>
                        </span>
                      </a>
                    </li>
                  </Fragment>
                ))}
              </ul>
              {v.searchEmpty && (
                <>
                  <p style={{ margin: "0", fontSize: "15px", color: "#323F3D" }}>
                    No candles match “{v.sq}{"”. "}
                    <a href="/shop" style={{ fontWeight: "600" }}>
                      Browse all candles
                    </a>
                  </p>
                </>
              )}
              {v.searchIdle && (
                <>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "13px", color: "#3A4643", marginRight: "4px" }}>
                      Browse:
                    </span>
                    <a href="/collection/seasonal" style={{ minHeight: "40px", display: "inline-flex", alignItems: "center", padding: "0 14px", border: "1px solid rgba(36,59,59,.2)", borderRadius: "4px", fontSize: "14px", color: "#152828", textDecoration: "none" }}>
                      Seasonal
                    </a>
                    <a href="/collection/best" style={{ minHeight: "40px", display: "inline-flex", alignItems: "center", padding: "0 14px", border: "1px solid rgba(36,59,59,.2)", borderRadius: "4px", fontSize: "14px", color: "#152828", textDecoration: "none" }}>
                      Best Sellers
                    </a>
                    <a href="/shop" style={{ minHeight: "40px", display: "inline-flex", alignItems: "center", padding: "0 14px", border: "1px solid rgba(36,59,59,.2)", borderRadius: "4px", fontSize: "14px", color: "#152828", textDecoration: "none" }}>
                      All candles
                    </a>
                  </div>
                </>
              )}
              {v.hasSqResults && (
                <>
                  <button type="button" onClick={v.submitSearch} style={{ alignSelf: "flex-start", minHeight: "48px", padding: "0 22px", background: "#2B5352", color: "#FCFBF7", border: "0", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                    {v.viewAllText}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    )}
    </>
  );
}

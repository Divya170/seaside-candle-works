/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';
import { ProductCard } from '../ProductCard';

export default function GridView({ v }: { v: any }) {
  return (
    <>
    {v.showGrid && (
      <>
        <div style={{ position: "sticky", top: v.navH, zIndex: "30", background: "rgba(247,243,234,.96)", backdropFilter: "blur(8px)", borderTop: "1px solid rgba(36,59,59,.12)", borderBottom: "1px solid rgba(36,59,59,.12)", transition: "top .35s" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "12px clamp(20px,4vw,56px)", display: "flex", alignItems: "flex-end", gap: "12px", flexWrap: "wrap" }}>
            <div role="search" style={{ position: "relative", flex: "1 1 260px", minWidth: "0" }}>
              <label htmlFor="scw-shop-q" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
                Search the shop
              </label>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3A4643" strokeWidth="1.7" aria-hidden="true" style={{ position: "absolute", left: "15px", top: "16px" }}>
                <circle cx="11" cy="11" r="6.5"></circle>
                <path d="M16 16l4.5 4.5"></path>
              </svg>
              <input className="fc-2630ca" id="scw-shop-q" type="search" value={v.q} onChange={v.setQ} placeholder="Search by name, scent or collection" autoComplete="off" style={{ width: "100%", minHeight: "50px", padding: "0 70px 0 42px", border: "1px solid rgba(36,59,59,.24)", borderRadius: "6px", background: "#FCFBF7", fontSize: "15px", color: "#152828" }} />
              {v.hasQ && (
                <>
                  <button type="button" onClick={v.clearQ} aria-label="Clear search" style={{ position: "absolute", right: "3px", top: "3px", height: "44px", padding: "0 12px", border: "0", background: "none", fontSize: "13px", fontWeight: "600", color: "#2B5352", cursor: "pointer" }}>
                    Clear
                  </button>
                </>
              )}
            </div>
            {v.isWideControls && (
              <>
                {v.selects.map((s: any, i_s: number) => (
                  <Fragment key={i_s}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <label htmlFor={s.id} style={{ fontSize: "11px", fontWeight: "700", letterSpacing: ".14em", textTransform: "uppercase", color: "#3A4643" }}>
                        {s.label}
                      </label>
                      <select id={s.id} value={s.value} onChange={s.onChange} style={{ minHeight: "50px", minWidth: "160px", padding: "0 38px 0 14px", border: "1px solid rgba(36,59,59,.24)", borderRadius: "6px", background: "#FCFBF7 url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23243B3B' stroke-width='1.5'/%3E%3C/svg%3E\") no-repeat right 14px center", appearance: "none", WebkitAppearance: "none", fontSize: "14px", fontWeight: "500", color: "#152828", cursor: "pointer" }}>
                        {s.options.map((o: any, i_o: number) => (
                          <Fragment key={i_o}>
                            <option value={o.value} disabled={o.disabled}>
                              {o.label}
                            </option>
                          </Fragment>
                        ))}
                      </select>
                    </div>
                  </Fragment>
                ))}
              </>
            )}
            {v.isNarrowControls && (
              <>
                <button type="button" onClick={v.openSheet} aria-haspopup="dialog" style={{ flex: "1 1 100%", minHeight: "50px", padding: "0 18px", display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #152828", borderRadius: "6px", background: "#FCFBF7", fontSize: "15px", fontWeight: "600", color: "#152828", cursor: "pointer" }}>
                  <span>
                    Filter & sort
                  </span>
                  <span style={{ fontWeight: "500", color: "#3A4643" }}>
                    {v.filterCountText}
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "20px clamp(20px,4vw,56px) 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <p aria-live="polite" style={{ margin: "0", fontSize: "14px", color: "#3A4643" }}>
            {v.resultText}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
            {v.activeChips.map((ch: any, i_ch: number) => (
              <Fragment key={i_ch}>
                <button type="button" onClick={ch.remove} aria-label={`Remove filter: ${ch.label}`} style={{ minHeight: "36px", padding: "0 12px", display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid rgba(36,59,59,.2)", borderRadius: "4px", background: "#E4F0ED", fontSize: "13px", fontWeight: "500", color: "#152828", cursor: "pointer" }}>
                  {ch.label}{" "}
                  <span aria-hidden="true">
                    ×
                  </span>
                </button>
              </Fragment>
            ))}
            {v.hasActive && (
              <>
                <button type="button" onClick={v.clearAll} style={{ minHeight: "36px", padding: "0 6px", border: "0", background: "none", fontSize: "13px", fontWeight: "600", color: "#2B5352", textDecoration: "underline", cursor: "pointer" }}>
                  Clear all
                </button>
              </>
            )}
            {v.isMobile && (
              <>
                <div role="group" aria-label="Grid layout" style={{ display: "flex", border: "1px solid rgba(36,59,59,.2)", borderRadius: "4px", overflow: "hidden" }}>
                  <button type="button" onClick={v.grid2} aria-pressed={v.grid2Pressed} style={{ minWidth: "44px", minHeight: "36px", border: "0", background: v.grid2Bg, fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                    2 col
                  </button>
                  <button type="button" onClick={v.grid1} aria-pressed={v.grid1Pressed} style={{ minWidth: "44px", minHeight: "36px", border: "0", background: v.grid1Bg, fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                    1 col
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "24px clamp(20px,4vw,56px) clamp(80px,10vw,140px)" }}>
          {v.loading && (
            <>
              <div aria-busy="true" aria-label="Loading candles" style={{ display: "grid", gridTemplateColumns: v.gridCols, gap: "clamp(28px,3vw,44px) clamp(14px,2vw,28px)" }}>
                {v.skeletons.map((sk: any, i_sk: number) => (
                  <Fragment key={i_sk}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div style={{ aspectRatio: "4 / 5", background: "#ECE4D4", borderRadius: "3px" }}></div>
                      <div style={{ width: "70%", height: "18px", background: "#ECE4D4", borderRadius: "2px" }}></div>
                      <div style={{ width: "45%", height: "12px", background: "#F0E9DC", borderRadius: "2px" }}></div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </>
          )}
          {v.showCards && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: v.gridCols, gap: "clamp(32px,3.4vw,52px) clamp(14px,2vw,28px)" }}>
                {v.gridCards.map((g: any, i_g: number) => (
                  <Fragment key={i_g}>
                    <ProductCard c={g} size={v.cardSize} />
                  </Fragment>
                ))}
              </div>
            </>
          )}
          {v.showEmpty && (
            <>
              <div style={{ maxWidth: "580px", margin: "32px auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", padding: "clamp(40px,6vw,64px) 24px", border: "1px dashed rgba(36,59,59,.28)", borderRadius: "6px" }}>
                <h2 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "38px", lineHeight: "1.05" }}>
                  Nothing matches — yet.
                </h2>
                <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#323F3D" }}>
                  {v.emptyText}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
                  <button className="hv-112f10" type="button" onClick={v.clearAll} style={{ minHeight: "52px", padding: "0 26px", background: "#2B5352", color: "#FCFBF7", border: "1px solid #2B5352", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                    Reset filters
                  </button>
                  <button className="hv-d66214" type="button" onClick={v.continueShopping} style={{ minHeight: "52px", padding: "0 26px", background: "transparent", color: "#152828", border: "1px solid #152828", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                    Continue shopping
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    )}
    </>
  );
}

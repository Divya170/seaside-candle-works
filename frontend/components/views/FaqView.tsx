/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function FaqView({ v }: { v: any }) {
  return (
    <>
    {v.isFaq && (
      <>
        <section style={{ padding: "clamp(44px,6vw,96px) 0 clamp(36px,4vw,56px)" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "28px 48px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: ".22em", textTransform: "uppercase", color: "#2B5352" }}>
                Help
              </p>
              <h1 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(52px,6.4vw,100px)", lineHeight: ".96", letterSpacing: "-.015em" }}>
                {"Frequently asked "}
                <em style={{ color: "#2B5352" }}>
                  questions
                </em>
              </h1>
            </div>
            <div role="search" style={{ flex: "0 1 420px", minWidth: "min(100%,260px)", display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="scw-faq-q" style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".14em", textTransform: "uppercase", color: "#3A4643" }}>
                Search the FAQ
              </label>
              <input className="fc-2630ca" id="scw-faq-q" type="search" value={v.faqQ} onChange={v.setFaqQ} placeholder="Try “shipping”, “wick” or “returns”" autoComplete="off" style={{ width: "100%", minHeight: "52px", padding: "0 16px", border: "1px solid rgba(36,59,59,.24)", borderRadius: "6px", background: "#FCFBF7", fontSize: "16px", color: "#152828" }} />
            </div>
          </div>
        </section>
        <section style={{ padding: "0 0 clamp(80px,10vw,140px)" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)", display: "flex", flexWrap: "wrap", gap: "clamp(28px,5vw,88px)", alignItems: "flex-start" }}>
            <nav aria-label="FAQ categories" style={{ flex: "0 1 250px", position: v.faqNavPos, top: v.stickyTop, display: "flex", flexDirection: v.faqNavDir, flexWrap: "wrap", gap: "4px" }}>
              {v.faqNav.map((n: any, i_n: number) => (
                <Fragment key={i_n}>
                  <a className="hv-34f3a1" href={n.href} aria-current={n.current} style={{ minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "14px", padding: "0 14px", borderRadius: "4px", background: n.bg, color: "#152828", textDecoration: "none", fontSize: "15px", fontWeight: n.weight, transition: "background-color .2s" }}>
                    {n.label}{" "}
                    <span style={{ fontSize: "12px", color: "#3A4643" }}>
                      {n.count}
                    </span>
                  </a>
                </Fragment>
              ))}
            </nav>
            <div style={{ flex: "1 1 480px", minWidth: "0", display: "flex", flexDirection: "column", gap: "56px" }}>
              {v.faqGroups.map((g: any, i_g: number) => (
                <Fragment key={i_g}>
                  <section aria-labelledby={g.hid}>
                    <h2 id={g.hid} style={{ margin: "0 0 12px", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(32px,3vw,42px)", lineHeight: "1.05" }}>
                      {g.label}
                    </h2>
                    <div style={{ borderBottom: "1px solid rgba(36,59,59,.16)" }}>
                      {g.items.map((it: any, i_it: number) => (
                        <Fragment key={i_it}>
                          <div style={{ borderTop: "1px solid rgba(36,59,59,.16)" }}>
                            <h3 style={{ margin: "0" }}>
                              <button type="button" id={it.btnId} aria-expanded={it.expanded} aria-controls={it.panelId} onClick={it.toggle} style={{ width: "100%", minHeight: "62px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "16px 0", background: "none", border: "0", cursor: "pointer", textAlign: "left", color: "#152828", fontSize: "17px", fontWeight: "500", lineHeight: "1.4" }}>
                                <span>
                                  {it.q}
                                </span>
                                <span aria-hidden="true" style={{ fontSize: "24px", fontWeight: "300", lineHeight: "1", transform: it.rot, transition: "transform .35s" }}>
                                  +
                                </span>
                              </button>
                            </h3>
                            <div id={it.panelId} role="region" aria-labelledby={it.btnId} style={{ display: "grid", gridTemplateRows: it.rows, visibility: it.vis, transition: "grid-template-rows .4s cubic-bezier(.2,.7,.2,1), visibility .4s" }}>
                              <div style={{ overflow: "hidden" }}>
                                <p style={{ margin: "0", padding: "0 40px 22px 0", fontSize: "15px", lineHeight: "1.7", color: "#323F3D" }}>
                                  {it.a}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  </section>
                </Fragment>
              ))}
              {v.faqEmpty && (
                <>
                  <div role="status" style={{ padding: "clamp(36px,5vw,56px) 28px", border: "1px dashed rgba(36,59,59,.28)", borderRadius: "6px", display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
                    <h2 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "34px", lineHeight: "1.05" }}>
                      No questions match “{v.faqQ}”.
                    </h2>
                    <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#323F3D" }}>
                      Try a shorter word, or ask us directly.
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                      <button className="hv-112f10" type="button" onClick={v.clearFaqQ} style={{ minHeight: "50px", padding: "0 24px", background: "#2B5352", color: "#FCFBF7", border: "1px solid #2B5352", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                        Clear search
                      </button>
                      <a className="hv-d66214" href="/contact" style={{ display: "inline-flex", alignItems: "center", minHeight: "50px", padding: "0 24px", border: "1px solid #152828", borderRadius: "6px", color: "#152828", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>
                        Contact us
                      </a>
                    </div>
                  </div>
                </>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "20px", padding: "28px", background: "#FCFBF7", border: "1px solid rgba(36,59,59,.1)", borderRadius: "6px" }}>
                <div>
                  <h2 style={{ margin: "0 0 6px", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "30px" }}>
                    Didn't find your answer?
                  </h2>
                  <p style={{ margin: "0", fontSize: "15px", color: "#323F3D" }}>
                    Send us a note — we're happy to help.
                  </p>
                </div>
                <a className="hv-fa67e7" href="/contact" style={{ display: "inline-flex", alignItems: "center", minHeight: "52px", padding: "0 26px", background: "#2B5352", color: "#FCFBF7", borderRadius: "6px", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </section>
      </>
    )}
    </>
  );
}

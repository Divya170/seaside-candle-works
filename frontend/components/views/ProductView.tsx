/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';
import { ProductCard } from '../ProductCard';

export default function ProductView({ v }: { v: any }) {
  return (
    <>
    {v.isProduct && (
      <>
        <section style={{ padding: "clamp(24px,3vw,40px) 0 clamp(64px,8vw,120px)" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)" }}>
            <nav aria-label="Breadcrumb" style={{ fontSize: "13px", color: "#3A4643" }}>
              <a href="/" style={{ color: "#3A4643" }}>
                Home
              </a>
              {" / "}
              <a href="/shop" style={{ color: "#3A4643" }}>
                Shop
              </a>
              {" / "}
              <span aria-current="page">
                {v.pd.name}
              </span>
            </nav>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px,5vw,88px)", alignItems: "flex-start", marginTop: "24px" }}>
              <div style={{ flex: "1.25 1 460px", minWidth: "0", display: "flex", flexDirection: "column", gap: "14px" }}>
                {v.isMobile && (
                  <>
                    <div id="scw-gal" onScroll={v.galScroll} role="region" aria-label="Product images — swipe to browse" style={{ display: "grid", gridAutoFlow: "column", gridAutoColumns: "100%", overflowX: "auto", scrollSnapType: "x mandatory", borderRadius: "3px", scrollbarWidth: "none" }}>
                      {v.gallery.map((gi: any, i_gi: number) => (
                        <Fragment key={i_gi}>
                          <button type="button" onClick={gi.zoom} aria-label={`Enlarge image ${gi.num}: ${gi.label}`} style={{ position: "relative", scrollSnapAlign: "start", aspectRatio: "4 / 5", overflow: "hidden", padding: "0", border: "0", background: "#EDE5D6", cursor: "zoom-in" }}>
                            <img src={gi.src} alt={gi.alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: gi.pos, transform: gi.scale, transformOrigin: gi.pos }} />
                          </button>
                        </Fragment>
                      ))}
                    </div>
                    <div aria-hidden="true" style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                      {v.gallery.map((gd: any, i_gd: number) => (
                        <Fragment key={i_gd}>
                          <span style={{ width: gd.dotW, height: "3px", borderRadius: "2px", background: gd.dotBg, transition: "width .3s" }}></span>
                        </Fragment>
                      ))}
                    </div>
                  </>
                )}
                {v.isNotMobile && (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "84px minmax(0,1fr)", gap: "16px" }}>
                      <div role="group" aria-label="Choose image" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {v.gallery.map((gi: any, i_gi: number) => (
                          <Fragment key={i_gi}>
                            <button type="button" onClick={gi.select} aria-label={`Show image ${gi.num}: ${gi.label}`} aria-pressed={gi.pressed} style={{ padding: "0", border: `1px solid ${gi.border}`, aspectRatio: "4 / 5", overflow: "hidden", borderRadius: "3px", background: "#EDE5D6", cursor: "pointer", opacity: gi.op, transition: "opacity .2s, border-color .2s" }}>
                              <img src={gi.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: gi.pos, transform: gi.scale, transformOrigin: gi.pos }} />
                            </button>
                          </Fragment>
                        ))}
                      </div>
                      <button type="button" onClick={v.openLightbox} aria-label={`Enlarge image: ${v.mainImg.label}`} style={{ position: "relative", padding: "0", border: "0", aspectRatio: "4 / 5", overflow: "hidden", borderRadius: "3px", background: "#EDE5D6", cursor: "zoom-in" }}>
                        <img src={v.mainImg.src} alt={v.mainImg.alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: v.mainImg.pos, transform: v.mainImg.scale, transformOrigin: v.mainImg.pos, transition: "transform .6s cubic-bezier(.2,.7,.2,1)" }} />
                        <span style={{ position: "absolute", right: "14px", bottom: "14px", padding: "8px 12px", background: "rgba(252,251,247,.94)", borderRadius: "4px", fontSize: "12px", fontWeight: "700", letterSpacing: ".06em", color: "#152828" }}>
                          Enlarge
                        </span>
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div style={{ flex: "1 1 380px", minWidth: "0", maxWidth: "560px", position: "sticky", top: v.stickyTop, display: "flex", flexDirection: "column", gap: "22px" }}>
                <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: ".22em", textTransform: "uppercase", color: "#2B5352" }}>
                  {v.pd.collText}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <h1 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(40px,4.4vw,64px)", lineHeight: "1", letterSpacing: "-.01em" }}>
                    {v.pd.name}
                  </h1>
                  <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.5", color: "#323F3D" }}>
                    {v.pd.scent}
                  </p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px", padding: "16px 0", borderTop: "1px solid rgba(36,59,59,.14)", borderBottom: "1px solid rgba(36,59,59,.14)" }}>
                  <span style={{ fontSize: "24px", fontWeight: "500" }}>
                    {v.pd.price}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "500", color: "#152828" }}>
                    <span aria-hidden="true" style={{ width: "8px", height: "8px", borderRadius: "50%", background: v.pd.dot }}></span>
                    {v.pd.statusLabel}
                  </span>
                </div>
                <dl style={{ margin: "0", display: "flex", gap: "10px", fontSize: "15px" }}>
                  <dt style={{ fontWeight: "600" }}>
                    Size
                  </dt>
                  <dd style={{ margin: "0", color: "#323F3D" }}>
                    {v.pd.size}
                  </dd>
                </dl>
                <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.7", color: "#323F3D" }}>
                  {v.pd.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "stretch" }}>
                  <div role="group" aria-label="Quantity" style={{ display: "inline-flex", alignItems: "center", border: "1px solid rgba(36,59,59,.3)", borderRadius: "6px", height: "56px" }}>
                    <button type="button" onClick={v.qtyDec} disabled={v.qtyMin} aria-label="Decrease quantity" style={{ width: "48px", height: "100%", border: "0", background: "none", cursor: "pointer", fontSize: "20px", color: "#152828" }}>
                      −
                    </button>
                    <span aria-live="polite" aria-label={`Quantity ${v.qty}`} style={{ minWidth: "32px", textAlign: "center", fontSize: "16px", fontWeight: "600" }}>
                      {v.qty}
                    </span>
                    <button type="button" onClick={v.qtyInc} disabled={v.pd.sold} aria-label="Increase quantity" style={{ width: "48px", height: "100%", border: "0", background: "none", cursor: "pointer", fontSize: "20px", color: "#152828" }}>
                      +
                    </button>
                  </div>
                  <button type="button" onClick={v.pdAdd} disabled={v.addDisabled} aria-busy={v.addBusy} style={{ flex: "1 1 220px", minHeight: "56px", padding: "0 24px", background: v.addBg, color: v.addColor, border: `1px solid ${v.addBg}`, borderRadius: "6px", fontSize: "15px", fontWeight: "600", letterSpacing: ".03em", cursor: "pointer", transition: "background-color .3s, border-color .3s" }}>
                    {v.addLabel}
                  </button>
                </div>
                <p aria-live="polite" style={{ margin: "-8px 0 0", fontSize: "14px", color: "#2B5352", minHeight: "20px" }}>
                  {v.addAnnounce}
                </p>
                {v.pd.sold && (
                  <>
                    <p style={{ margin: "-14px 0 0", fontSize: "14px", lineHeight: "1.6", color: "#323F3D" }}>
                      {"This candle is currently sold out. "}
                      <a href="/contact" style={{ fontWeight: "600" }}>
                        Ask about availability
                      </a>
                    </p>
                  </>
                )}
                <div style={{ borderBottom: "1px solid rgba(36,59,59,.16)" }}>
                  {v.pdSections.map((ps: any, i_ps: number) => (
                    <Fragment key={i_ps}>
                      <div style={{ borderTop: "1px solid rgba(36,59,59,.16)" }}>
                        <h2 style={{ margin: "0" }}>
                          <button type="button" id={ps.btnId} aria-expanded={ps.expanded} aria-controls={ps.panelId} onClick={ps.toggle} style={{ width: "100%", minHeight: "58px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "12px 0", background: "none", border: "0", cursor: "pointer", textAlign: "left", fontSize: "15px", fontWeight: "600", color: "#152828" }}>
                            <span>
                              {ps.title}
                            </span>
                            <span aria-hidden="true" style={{ fontSize: "22px", fontWeight: "300", lineHeight: "1", transform: ps.rot, transition: "transform .35s" }}>
                              +
                            </span>
                          </button>
                        </h2>
                        <div id={ps.panelId} role="region" aria-labelledby={ps.btnId} style={{ display: "grid", gridTemplateRows: ps.rows, visibility: ps.vis, transition: "grid-template-rows .4s cubic-bezier(.2,.7,.2,1), visibility .4s" }}>
                          <div style={{ overflow: "hidden" }}>
                            <p style={{ margin: "0", padding: "0 0 20px", fontSize: "15px", lineHeight: "1.7", color: "#323F3D" }}>
                              {ps.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="h-related" style={{ background: "#FCFBF7", padding: "clamp(64px,8vw,120px) 0" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)" }}>
            <h2 id="h-related" style={{ margin: "0 0 clamp(28px,3vw,44px)", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(34px,3.6vw,52px)", lineHeight: "1" }}>
              You may also like
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: v.gridColsFixed, gap: "clamp(28px,3vw,44px) clamp(14px,2vw,28px)" }}>
              {v.relatedCards.map((rc: any, i_rc: number) => (
                <Fragment key={i_rc}>
                  <ProductCard c={rc} size={v.cardSize} />
                </Fragment>
              ))}
            </div>
          </div>
        </section>
      </>
    )}
    </>
  );
}

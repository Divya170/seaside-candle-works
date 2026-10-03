/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';
import { ProductCard } from '../ProductCard';

export default function HomeView({ v }: { v: any }) {
  return (
    <>
    {v.isHome && (
      <>
        <section aria-label="Introduction" style={{ display: "flex", flexWrap: "wrap", flexDirection: "row-reverse", background: "#F7F3EA" }}>
          <div onMouseEnter={v.heroEnter} onMouseLeave={v.heroLeave} onFocus={v.heroEnter} onBlur={v.heroLeave} style={{ position: "relative", flex: "1.6 1 560px", height: "clamp(400px,min(82vh,118vw),880px)", overflow: "hidden", background: "#E6DDCB" }}>
            {v.heroSlides.map((s: any, i_s: number) => (
              <Fragment key={i_s}>
                <img src={s.src} alt={s.alt} aria-hidden={s.hidden} loading={s.loading} style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: s.pos, opacity: s.opacity, transform: s.transform, transition: "opacity 1.8s ease, transform 9s linear" }} />
              </Fragment>
            ))}
            <div style={{ position: "absolute", left: "clamp(14px,2.4vw,32px)", bottom: "clamp(14px,2.4vw,32px)", display: "flex", alignItems: "center", gap: "14px", padding: "4px 6px 4px 16px", background: "rgba(252,251,247,.94)", borderRadius: "4px" }}>
              <span aria-hidden="true" style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".14em", color: "#152828" }}>
                {v.heroCounter}
              </span>
              <div role="group" aria-label="Choose hero image" style={{ display: "flex", gap: "6px" }}>
                {v.heroDots.map((d: any, i_d: number) => (
                  <Fragment key={i_d}>
                    <button type="button" onClick={d.go} aria-label={`Show image ${d.num}`} aria-pressed={d.pressed} style={{ width: "28px", height: "44px", padding: "0", border: "0", background: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                      <span style={{ display: "block", width: "100%", height: "2px", background: d.bar, transition: "background-color .4s" }}></span>
                    </button>
                  </Fragment>
                ))}
              </div>
              <button type="button" onClick={v.toggleHero} aria-label={v.pauseLabel} style={{ minHeight: "36px", padding: "0 12px", border: "1px solid rgba(36,59,59,.28)", borderRadius: "4px", background: "none", fontSize: "12px", fontWeight: "700", letterSpacing: ".06em", color: "#152828", cursor: "pointer" }}>
                {v.pauseText}
              </button>
            </div>
          </div>
          <div style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "28px", padding: "clamp(36px,6vw,96px) clamp(20px,4.5vw,80px)" }}>
            <p style={{ margin: "0", display: "flex", alignItems: "center", gap: "14px", fontSize: "12px", fontWeight: "600", letterSpacing: ".22em", textTransform: "uppercase", color: "#2B5352" }}>
              <span aria-hidden="true" style={{ width: "32px", height: "1px", background: "#2B5352" }}></span>
              Rehoboth Beach, Delaware
            </p>
            <h1 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(50px,6.2vw,104px)", lineHeight: ".96", letterSpacing: "-.015em", textWrap: "balance" }}>
              {"Light the feeling of the "}
              <em style={{ fontStyle: "italic", color: "#2B5352" }}>
                coast.
              </em>
            </h1>
            <p style={{ margin: "0", maxWidth: "34ch", fontSize: "clamp(16px,1.25vw,19px)", lineHeight: "1.65", color: "#323F3D" }}>
              Candles for open windows, salt air, and the slow hours at the end of a beach day.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "8px" }}>
              <a className="hv-fa67e7" href="/shop" style={{ flex: v.ctaFlex, display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "54px", padding: "0 30px", background: "#2B5352", color: "#FCFBF7", border: "1px solid #2B5352", borderRadius: "6px", fontSize: "14px", fontWeight: "600", letterSpacing: ".04em", textDecoration: "none", transition: "background-color .2s" }}>
                Shop candles
              </a>
              <a className="hv-d66214" href="/collections" style={{ flex: v.ctaFlex, display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "54px", padding: "0 30px", background: "transparent", color: "#152828", border: "1px solid #152828", borderRadius: "6px", fontSize: "14px", fontWeight: "600", letterSpacing: ".04em", textDecoration: "none", transition: "background-color .2s, color .2s" }}>
                Explore collections
              </a>
            </div>
          </div>
        </section>
        <section aria-labelledby="h-featured" style={{ padding: "clamp(80px,10vw,150px) 0 clamp(64px,8vw,120px)" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)" }}>
            <div data-reveal="" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "20px", flexWrap: "wrap", marginBottom: "clamp(36px,4vw,60px)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: ".22em", textTransform: "uppercase", color: "#2B5352" }}>
                  Featured
                </p>
                <h2 id="h-featured" style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(38px,4.4vw,64px)", lineHeight: "1", letterSpacing: "-.01em" }}>
                  Featured candles
                </h2>
              </div>
              <a className="hv-36ea72" href="/shop" style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", color: "#152828", fontSize: "14px", fontWeight: "600", letterSpacing: ".04em", textDecoration: "none", backgroundImage: "linear-gradient(currentColor,currentColor)", backgroundRepeat: "no-repeat", backgroundPosition: "0 calc(100% - 10px)", backgroundSize: "40% 1px", transition: "background-size .4s cubic-bezier(.2,.7,.2,1)" }}>
                Shop all candles →
              </a>
            </div>
            <div data-reveal="" style={{ display: "flex", flexWrap: "wrap", gap: "clamp(24px,3.2vw,56px)", alignItems: "flex-start" }}>
              <div style={{ flex: "1.25 1 420px", minWidth: "0" }}>
                <ProductCard c={v.featuredMain} size="lg" />
              </div>
              <div style={{ flex: "1 1 420px", minWidth: "0", display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "clamp(16px,2.4vw,36px)", paddingTop: "clamp(0px,9vw,150px)" }}>
                {v.featuredSide.map((f: any, i_f: number) => (
                  <Fragment key={i_f}>
                    <div style={{ marginTop: f.offset, minWidth: "0" }}>
                      <ProductCard c={f} size="md" />
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
            <div data-reveal="" style={{ marginTop: "clamp(64px,8vw,110px)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", borderTop: "1px solid rgba(36,59,59,.14)", paddingTop: "18px", marginBottom: "22px" }}>
                <h3 style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: ".22em", textTransform: "uppercase", color: "#152828" }}>
                  More from the shop
                </h3>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button className="hv-d66214" type="button" onClick={v.railPrev} aria-label="Scroll products left" style={{ width: "44px", height: "44px", border: "1px solid rgba(36,59,59,.3)", borderRadius: "6px", background: "none", cursor: "pointer", fontSize: "16px" }}>
                    ←
                  </button>
                  <button className="hv-d66214" type="button" onClick={v.railNext} aria-label="Scroll products right" style={{ width: "44px", height: "44px", border: "1px solid rgba(36,59,59,.3)", borderRadius: "6px", background: "none", cursor: "pointer", fontSize: "16px" }}>
                    →
                  </button>
                </div>
              </div>
              <div id="scw-rail" style={{ display: "grid", gridAutoFlow: "column", gridAutoColumns: "clamp(210px,22vw,290px)", gap: "clamp(16px,2vw,28px)", overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: "14px", scrollbarWidth: "thin" }}>
                {v.featuredMore.map((r: any, i_r: number) => (
                  <Fragment key={i_r}>
                    <div style={{ scrollSnapAlign: "start", minWidth: "0" }}>
                      <ProductCard c={r} size="sm" />
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="h-collections" style={{ background: "#152828", color: "#F7F3EA", padding: "clamp(80px,10vw,150px) 0" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)" }}>
            <div data-reveal="" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", flexWrap: "wrap", marginBottom: "clamp(40px,5vw,72px)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: ".22em", textTransform: "uppercase", color: "#A9D5CF" }}>
                  Collections
                </p>
                <h2 id="h-collections" style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(38px,4.4vw,64px)", lineHeight: "1", letterSpacing: "-.01em" }}>
                  Browse by collection
                </h2>
              </div>
              <p style={{ margin: "0", maxWidth: "36ch", fontSize: "16px", lineHeight: "1.65", color: "#CBD5D1" }}>
                Start with what's in season, or with the candles people come back for.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px,4.5vw,72px)", alignItems: "flex-start" }}>
              {v.homeCollections.map((k: any, i_k: number) => (
                <Fragment key={i_k}>
                  <a href={k.href} style={{ flex: k.flex, minWidth: "0", marginTop: k.offset, display: "flex", flexDirection: "column", gap: "24px", color: "#F7F3EA", textDecoration: "none" }}>
                    <div style={{ overflow: "hidden", aspectRatio: k.ratio, borderRadius: "3px", background: "#2E4848" }}>
                      <img className="hv-664ef3" src={k.img} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: k.pos, transition: "transform 1.6s cubic-bezier(.2,.7,.2,1)" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px", flexWrap: "wrap" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "40ch" }}>
                        <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: ".2em", color: "#A9D5CF" }}>
                          {k.index}{" — "}{k.count}
                        </span>
                        <h3 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(36px,3.6vw,52px)", lineHeight: "1" }}>
                          {k.name}
                        </h3>
                        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#CBD5D1" }}>
                          {k.desc}
                        </p>
                      </div>
                      <span className="hv-36ea72" style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", fontSize: "14px", fontWeight: "600", letterSpacing: ".04em", backgroundImage: "linear-gradient(currentColor,currentColor)", backgroundRepeat: "no-repeat", backgroundPosition: "0 calc(100% - 10px)", backgroundSize: "40% 1px", transition: "background-size .4s" }}>
                        {"Explore "}{k.name}{" →"}
                      </span>
                    </div>
                  </a>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        <section aria-labelledby="h-story" style={{ background: "#FCFBF7", padding: "clamp(80px,10vw,150px) 0" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)", display: "flex", flexWrap: "wrap", gap: "clamp(40px,6vw,110px)", alignItems: "center" }}>
            <figure data-reveal="" style={{ margin: "0", flex: "1.1 1 420px", minWidth: "0" }}>
              <div style={{ aspectRatio: "4 / 5", overflow: "hidden", borderRadius: "3px", background: "#EDE5D6" }}>
                <img src="/assets/workshop.webp" alt="Candle makers pouring wax into rows of glass vessels at a long wooden workbench in a sunlit workshop" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "40% 50%" }} />
              </div>
              <figcaption style={{ marginTop: "12px", fontSize: "13px", color: "#3A4643" }}>
                [Photo caption — confirm location and people pictured]
              </figcaption>
            </figure>
            <div data-reveal="" style={{ flex: "1 1 360px", minWidth: "0", maxWidth: "540px", display: "flex", flexDirection: "column", gap: "26px" }}>
              <p style={{ margin: "0", display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", fontWeight: "600", letterSpacing: ".22em", textTransform: "uppercase", color: "#2B5352" }}>
                <span aria-hidden="true" style={{ width: "9px", height: "9px", borderRadius: "50%", border: "1.5px solid #2B5352" }}></span>
                Rehoboth Beach, Delaware
              </p>
              <h2 id="h-story" style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(38px,4.4vw,64px)", lineHeight: "1.02", letterSpacing: "-.01em", textWrap: "balance" }}>
                {"A candle shop by the "}
                <em>
                  shore.
                </em>
              </h2>
              <p style={{ margin: "0", padding: "20px 22px", border: "1px dashed #A89680", borderRadius: "4px", background: "rgba(217,199,170,.14)", fontSize: "15px", lineHeight: "1.7", color: "#323F3D" }}>
                [Approved brand story goes here — a short introduction to Seaside Candle Works and the people behind it, in the client's own words.]
              </p>
              <div>
                <a className="hv-d66214" href="/about" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "52px", padding: "0 28px", background: "transparent", color: "#152828", border: "1px solid #152828", borderRadius: "6px", fontSize: "14px", fontWeight: "600", letterSpacing: ".04em", textDecoration: "none", transition: "background-color .2s, color .2s" }}>
                  Read our story
                </a>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="h-care" style={{ padding: "clamp(80px,10vw,150px) 0" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)", display: "flex", flexWrap: "wrap", flexDirection: "row-reverse", gap: "clamp(40px,6vw,110px)", alignItems: "flex-start" }}>
            <div data-reveal="" style={{ flex: "1 1 400px", minWidth: "0" }}>
              <div style={{ aspectRatio: "5 / 6", overflow: "hidden", borderRadius: "3px", background: "#EDE5D6" }}>
                <img src="/assets/shore-lighting.webp" alt="A hand lighting a candle with a long match on a wooden tray, the sea in the background" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "35% 50%" }} />
              </div>
            </div>
            <div data-reveal="" style={{ flex: "1.1 1 400px", minWidth: "0", display: "flex", flexDirection: "column", gap: "26px" }}>
              <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: ".22em", textTransform: "uppercase", color: "#2B5352" }}>
                Candle care
              </p>
              <h2 id="h-care" style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(38px,4.4vw,64px)", lineHeight: "1.02", letterSpacing: "-.01em", textWrap: "balance" }}>
                A little care, every time you light.
              </h2>
              <p style={{ margin: "0", maxWidth: "46ch", fontSize: "16px", lineHeight: "1.65", color: "#323F3D" }}>
                A few considered habits for every candle. The full guidance lives in our FAQ.
              </p>
              <div style={{ borderBottom: "1px solid rgba(36,59,59,.16)" }}>
                {v.careItems.map((ci: any, i_ci: number) => (
                  <Fragment key={i_ci}>
                    <div style={{ borderTop: "1px solid rgba(36,59,59,.16)" }}>
                      <h3 style={{ margin: "0" }}>
                        <button type="button" id={ci.btnId} aria-expanded={ci.expanded} aria-controls={ci.panelId} onClick={ci.toggle} style={{ width: "100%", minHeight: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "14px 0", background: "none", border: "0", cursor: "pointer", textAlign: "left", color: "#152828" }}>
                          <span style={{ display: "flex", gap: "18px", alignItems: "baseline" }}>
                            <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "#2B5352" }}>
                              {ci.num}
                            </span>
                            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "26px", fontWeight: "500" }}>
                              {ci.title}
                            </span>
                          </span>
                          <span aria-hidden="true" style={{ fontSize: "24px", fontWeight: "300", lineHeight: "1", transform: ci.rot, transition: "transform .35s" }}>
                            +
                          </span>
                        </button>
                      </h3>
                      <div id={ci.panelId} role="region" aria-labelledby={ci.btnId} style={{ display: "grid", gridTemplateRows: ci.rows, visibility: ci.vis, transition: "grid-template-rows .4s cubic-bezier(.2,.7,.2,1), visibility .4s" }}>
                        <div style={{ overflow: "hidden" }}>
                          <p style={{ margin: "0", padding: "0 0 22px 40px", fontSize: "15px", lineHeight: "1.7", color: "#323F3D" }}>
                            {ci.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
              <div>
                <a className="hv-fa67e7" href="/faq/care" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "52px", padding: "0 28px", background: "#2B5352", color: "#FCFBF7", border: "1px solid #2B5352", borderRadius: "6px", fontSize: "14px", fontWeight: "600", letterSpacing: ".04em", textDecoration: "none", transition: "background-color .2s" }}>
                  Learn candle care
                </a>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="h-faq" style={{ background: "#FCFBF7", padding: "clamp(80px,10vw,150px) 0" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)", display: "flex", flexWrap: "wrap", gap: "clamp(40px,7vw,120px)", alignItems: "flex-start" }}>
            <div data-reveal="" style={{ flex: "1 1 320px", maxWidth: "460px", display: "flex", flexDirection: "column", gap: "24px" }}>
              <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: ".22em", textTransform: "uppercase", color: "#2B5352" }}>
                FAQ
              </p>
              <h2 id="h-faq" style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(46px,5.6vw,86px)", lineHeight: ".96", letterSpacing: "-.015em" }}>
                {"Questions, "}
                <em style={{ color: "#2B5352" }}>
                  answered.
                </em>
              </h2>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#323F3D" }}>
                Orders, shipping, care and returns — the things worth knowing before you check out.
              </p>
              <div>
                <a className="hv-36ea72" href="/faq" style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", color: "#152828", fontSize: "14px", fontWeight: "600", letterSpacing: ".04em", textDecoration: "none", backgroundImage: "linear-gradient(currentColor,currentColor)", backgroundRepeat: "no-repeat", backgroundPosition: "0 calc(100% - 10px)", backgroundSize: "40% 1px", transition: "background-size .4s" }}>
                  Visit the full FAQ →
                </a>
              </div>
            </div>
            <div data-reveal="" style={{ flex: "1.6 1 440px", minWidth: "0" }}>
              <div role="group" aria-label="FAQ categories" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
                {v.faqTabs.map((t: any, i_t: number) => (
                  <Fragment key={i_t}>
                    <button type="button" onClick={t.select} aria-pressed={t.pressed} style={{ minHeight: "44px", padding: "0 16px", borderRadius: "4px", border: `1px solid ${t.border}`, background: t.bg, color: t.color, fontSize: "14px", fontWeight: "500", cursor: "pointer", transition: "background-color .2s, color .2s" }}>
                      {t.label}
                    </button>
                  </Fragment>
                ))}
              </div>
              <div style={{ borderBottom: "1px solid rgba(36,59,59,.16)" }}>
                {v.homeFaqItems.map((it: any, i_it: number) => (
                  <Fragment key={i_it}>
                    <div style={{ borderTop: "1px solid rgba(36,59,59,.16)" }}>
                      <h3 style={{ margin: "0" }}>
                        <button type="button" id={it.btnId} aria-expanded={it.expanded} aria-controls={it.panelId} onClick={it.toggle} style={{ width: "100%", minHeight: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "16px 0", background: "none", border: "0", cursor: "pointer", textAlign: "left", color: "#152828", fontSize: "17px", fontWeight: "500", lineHeight: "1.4" }}>
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
            </div>
          </div>
        </section>
      </>
    )}
    </>
  );
}

/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function AboutView({ v }: { v: any }) {
  return (
    <>
    {v.isAbout && (
      <>
        <section style={{ padding: "clamp(48px,7vw,120px) 0 clamp(40px,5vw,72px)" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)" }}>
            <p style={{ margin: "0 0 20px", fontSize: "12px", fontWeight: "600", letterSpacing: ".22em", textTransform: "uppercase", color: "#2B5352" }}>
              About
            </p>
            <h1 style={{ margin: "0", maxWidth: "15ch", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(52px,7vw,118px)", lineHeight: ".94", letterSpacing: "-.02em", textWrap: "balance" }}>
              {"A candle shop by the sea, in "}
              <em style={{ color: "#2B5352" }}>
                Rehoboth Beach.
              </em>
            </h1>
          </div>
        </section>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(0px,2vw,28px)" }}>
          <div style={{ height: "clamp(320px,50vw,720px)", overflow: "hidden", borderRadius: "3px", background: "#EDE5D6" }}>
            <img src="/assets/arch-room.webp" alt="Two lit pillar candles on a round oak table in a calm living room, an arched window open to the sea" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "55% 55%" }} />
          </div>
        </div>
        <section aria-labelledby="h-ourstory" style={{ padding: "clamp(72px,9vw,140px) 0" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)", display: "flex", flexWrap: "wrap", gap: "clamp(28px,6vw,110px)" }}>
            <h2 id="h-ourstory" data-reveal="" style={{ flex: "0 1 280px", margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: ".22em", textTransform: "uppercase", color: "#2B5352" }}>
              Our story
            </h2>
            <div data-reveal="" style={{ flex: "1 1 480px", minWidth: "0", display: "flex", flexDirection: "column", gap: "22px" }}>
              <p style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(28px,3vw,42px)", lineHeight: "1.25", color: "#152828" }}>
                {v.st.story || '[Approved brand story goes here.]'}
              </p>
              <p style={{ margin: "0", padding: "18px 20px", border: "1px dashed #A89680", borderRadius: "4px", background: "rgba(217,199,170,.14)", fontFamily: "ui-monospace,Menlo,monospace", fontSize: "13px", lineHeight: "1.7", color: "#323F3D" }}>
                Two to four short paragraphs, supplied by Seaside Candle Works. Include only confirmed details about the founding, the shop and the people behind it.
              </p>
            </div>
          </div>
        </section>
        <section style={{ padding: "0 0 clamp(72px,9vw,140px)" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)", display: "flex", flexWrap: "wrap", gap: "clamp(20px,3vw,48px)", alignItems: "flex-start" }}>
            <figure data-reveal="" style={{ margin: "0", flex: "1.4 1 420px", minWidth: "0" }}>
              <div style={{ aspectRatio: "4 / 3", overflow: "hidden", borderRadius: "3px", background: "#EDE5D6" }}>
                <img src="/assets/workshop.webp" alt="Candle makers pouring wax at a long wooden workbench lined with glass vessels" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "40% 55%" }} />
              </div>
              <figcaption style={{ marginTop: "12px", fontSize: "13px", color: "#3A4643" }}>
                [Caption — confirm what's pictured]
              </figcaption>
            </figure>
            <figure data-reveal="" style={{ margin: "clamp(0px,8vw,120px) 0 0", flex: "1 1 300px", minWidth: "0" }}>
              <div style={{ aspectRatio: "3 / 4", overflow: "hidden", borderRadius: "3px", background: "#EDE5D6" }}>
                <img src="/assets/pouring.webp" alt="Hands pouring wax into small glass jars on a pale tray beside dried flowers" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 35%" }} />
              </div>
              <figcaption style={{ marginTop: "12px", fontSize: "13px", color: "#3A4643" }}>
                [Caption — confirm what's pictured]
              </figcaption>
            </figure>
          </div>
        </section>
        <section style={{ background: "#FCFBF7", padding: "clamp(72px,9vw,140px) 0" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: "clamp(40px,5vw,80px)" }}>
            {v.aboutBlocks.map((ab: any, i_ab: number) => (
              <Fragment key={i_ab}>
                <div data-reveal="" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <h2 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(32px,3.2vw,46px)", lineHeight: "1.05" }}>
                    {ab.title}
                  </h2>
                  <p style={{ margin: "0", padding: "18px 20px", border: "1px dashed #A89680", borderRadius: "4px", background: "rgba(217,199,170,.14)", fontSize: "15px", lineHeight: "1.7", color: "#323F3D" }}>
                    {ab.body}
                  </p>
                </div>
              </Fragment>
            ))}
          </div>
        </section>
        <section style={{ background: "#152828", color: "#F7F3EA", padding: "clamp(72px,9vw,130px) 0" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "32px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: ".22em", textTransform: "uppercase", color: "#A9D5CF" }}>
                Find us
              </p>
              <h2 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(40px,5vw,76px)", lineHeight: "1" }}>
                Rehoboth Beach, Delaware
              </h2>
              <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.7", color: "#CBD5D1" }}>
                {v.st.address || '[Shop address — if supplied]'} · {v.st.hours || '[Opening hours — if supplied]'}
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a className="hv-68f513" href="/shop" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "52px", padding: "0 28px", background: "#F7F3EA", color: "#152828", border: "1px solid #F7F3EA", borderRadius: "6px", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>
                Shop candles
              </a>
              <a className="hv-00abf6" href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "52px", padding: "0 28px", background: "transparent", color: "#F7F3EA", border: "1px solid rgba(247,243,234,.6)", borderRadius: "6px", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>
                Contact us
              </a>
            </div>
          </div>
        </section>
      </>
    )}
    </>
  );
}

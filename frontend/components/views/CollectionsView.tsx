/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function CollectionsView({ v }: { v: any }) {
  return (
    <>
    {v.isCollections && (
      <>
        <section style={{ padding: "clamp(44px,6vw,96px) 0 clamp(80px,10vw,140px)" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "20px 40px", marginBottom: "clamp(40px,5vw,72px)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: ".22em", textTransform: "uppercase", color: "#2B5352" }}>
                  Collections
                </p>
                <h1 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(52px,6.4vw,100px)", lineHeight: ".96", letterSpacing: "-.015em" }}>
                  {"Find your "}
                  <em style={{ color: "#2B5352" }}>
                    way in.
                  </em>
                </h1>
              </div>
              <p style={{ margin: "0", maxWidth: "40ch", fontSize: "16px", lineHeight: "1.65", color: "#323F3D" }}>
                Browse by season, or start with the candles people return to.
              </p>
            </div>
            {v.collectionTiles.map((k: any, i_k: number) => (
              <Fragment key={i_k}>
                <a href={k.href} data-reveal="" style={{ display: "flex", flexWrap: "wrap", flexDirection: k.dir, gap: "clamp(24px,4vw,72px)", alignItems: "center", padding: "clamp(28px,3.5vw,52px) 0", borderTop: "1px solid rgba(36,59,59,.14)", color: "#152828", textDecoration: "none" }}>
                  <div style={{ flex: "1.5 1 440px", minWidth: "0", aspectRatio: "16 / 11", overflow: "hidden", borderRadius: "3px", background: "#EDE5D6" }}>
                    <img className="hv-f74989" src={k.img} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: k.pos, transition: "transform 1.6s cubic-bezier(.2,.7,.2,1)" }} />
                  </div>
                  <div style={{ flex: "1 1 300px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
                    <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: ".2em", color: "#2B5352" }}>
                      {k.index}{" — "}{k.count}
                    </span>
                    <h2 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(44px,5.4vw,84px)", lineHeight: ".96" }}>
                      {k.name}
                    </h2>
                    <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#323F3D" }}>
                      {k.desc}
                    </p>
                    <span className="hv-36ea72" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", minHeight: "44px", fontSize: "14px", fontWeight: "600", letterSpacing: ".04em", backgroundImage: "linear-gradient(currentColor,currentColor)", backgroundRepeat: "no-repeat", backgroundPosition: "0 calc(100% - 10px)", backgroundSize: "40% 1px", transition: "background-size .4s" }}>
                      {"Explore "}{k.name}{" →"}
                    </span>
                  </div>
                </a>
              </Fragment>
            ))}
          </div>
        </section>
      </>
    )}
    </>
  );
}

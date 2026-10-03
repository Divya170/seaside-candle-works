/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */

export default function CollectionIntroView({ v }: { v: any }) {
  return (
    <>
    {v.isCollection && (
      <>
        <section style={{ padding: "clamp(28px,3vw,44px) 0 clamp(28px,3vw,44px)" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)" }}>
            <nav aria-label="Breadcrumb" style={{ fontSize: "13px", color: "#3A4643", marginBottom: "20px" }}>
              <a href="/" style={{ color: "#3A4643" }}>
                Home
              </a>
              {" / "}
              <a href="/collections" style={{ color: "#3A4643" }}>
                Collections
              </a>
              {" / "}
              <span aria-current="page">
                {v.colCur.name}
              </span>
            </nav>
            <div style={{ height: "clamp(240px,40vw,520px)", overflow: "hidden", borderRadius: "3px", background: "#EDE5D6" }}>
              <img src={v.colCur.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: v.colCur.pos }} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "20px 40px", marginTop: "clamp(28px,3.5vw,48px)" }}>
              <h1 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(48px,6vw,92px)", lineHeight: ".96", letterSpacing: "-.015em" }}>
                {v.colCur.name}
              </h1>
              <p style={{ margin: "0", maxWidth: "44ch", fontSize: "16px", lineHeight: "1.65", color: "#323F3D" }}>
                {v.colCur.desc}
              </p>
            </div>
          </div>
        </section>
      </>
    )}
    </>
  );
}

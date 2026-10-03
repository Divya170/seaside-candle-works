/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */

export default function ShopIntroView({ v }: { v: any }) {
  return (
    <>
    {v.isShop && (
      <>
        <section style={{ padding: "clamp(44px,6vw,96px) 0 clamp(28px,3vw,44px)" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "20px 40px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <nav aria-label="Breadcrumb" style={{ fontSize: "13px", color: "#3A4643" }}>
                <a href="/" style={{ color: "#3A4643" }}>
                  Home
                </a>
                {" / "}
                <span aria-current="page">
                  Shop
                </span>
              </nav>
              <h1 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(48px,6vw,92px)", lineHeight: ".96", letterSpacing: "-.015em" }}>
                {"Shop all "}
                <em style={{ color: "#2B5352" }}>
                  candles
                </em>
              </h1>
            </div>
            <p style={{ margin: "0", maxWidth: "40ch", fontSize: "16px", lineHeight: "1.65", color: "#323F3D" }}>
              Every candle in the shop, in one place. Search by name or scent, or narrow things down by collection.
            </p>
          </div>
        </section>
      </>
    )}
    </>
  );
}

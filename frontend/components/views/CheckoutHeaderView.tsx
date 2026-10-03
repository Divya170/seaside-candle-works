/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */

export default function CheckoutHeaderView({ v }: { v: any }) {
  return (
    <>
    {v.isCheckout && (
      <>
        <header style={{ borderBottom: "1px solid rgba(36,59,59,.12)", background: "#F7F3EA" }}>
          <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "18px clamp(20px,4vw,56px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <a href="/" style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "24px", fontWeight: "500", color: "#152828", textDecoration: "none" }}>
              Seaside Candle Works
            </a>
            <a href="/cart" style={{ minHeight: "44px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", color: "#152828" }}>
              ← Back to cart
            </a>
          </div>
        </header>
      </>
    )}
    </>
  );
}

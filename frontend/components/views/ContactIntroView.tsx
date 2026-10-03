/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */

export default function ContactIntroView({ v }: { v: any }) {
  return (
    <>
    {v.isContact && (
      <>
        <section style={{ padding: "clamp(48px,6vw,96px) 0 0" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)" }}>
            <p style={{ margin: "0 0 16px", fontSize: "12px", fontWeight: "600", letterSpacing: ".22em", textTransform: "uppercase", color: "#2B5352" }}>
              Contact
            </p>
            <h1 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(52px,6.4vw,100px)", lineHeight: ".96", letterSpacing: "-.015em" }}>
              {"Say "}
              <em style={{ color: "#2B5352" }}>
                hello.
              </em>
            </h1>
          </div>
        </section>
      </>
    )}
    </>
  );
}

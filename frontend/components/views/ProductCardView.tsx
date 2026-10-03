/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */

export default function ProductCardView({ v }: { v: any }) {
  return (
    <>
      <article style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "0", height: "100%" }}>
        <a href={v.c.href} aria-label={`${v.c.name}, view details`} style={{ position: "relative", display: "block", aspectRatio: "4 / 5", overflow: "hidden", background: "#EDE5D6", borderRadius: "3px" }}>
          <img src={v.c.img} alt={v.c.alt} loading="lazy" decoding="async" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: v.c.pos, filter: v.c.filter }} />
          <img className="hv-bd3964" src={v.c.img} alt="" aria-hidden="true" loading="lazy" decoding="async" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: v.c.pos, transformOrigin: v.c.pos, transform: "scale(1.45)", opacity: "0", filter: v.c.filter, transition: "opacity .7s ease, transform 1.6s cubic-bezier(.2,.7,.2,1)" }} />
          {v.c.hasBadge && (
            <>
              <span style={{ position: "absolute", top: "12px", left: "12px", padding: "7px 10px", background: "#FCFBF7", color: "#152828", fontFamily: "Inter,sans-serif", fontSize: "11px", fontWeight: "700", lineHeight: "1", letterSpacing: ".12em", textTransform: "uppercase", borderRadius: "3px" }}>
                {v.c.badge}
              </span>
            </>
          )}
        </a>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "6px 12px", flexWrap: "wrap" }}>
            <h3 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "500", fontSize: v.nameSize, lineHeight: "1.08", letterSpacing: "-.005em", minWidth: "0" }}>
              <a href={v.c.href} style={{ color: "#152828", textDecoration: "none" }}>
                {v.c.name}
              </a>
            </h3>
            <span style={{ fontFamily: "Inter,sans-serif", fontSize: "14px", fontWeight: "600", color: "#152828", whiteSpace: "nowrap" }}>
              {v.c.price}
            </span>
          </div>
          <p style={{ margin: "0", fontFamily: "Inter,sans-serif", fontSize: "14px", lineHeight: "1.5", color: "#3A4643" }}>
            {v.c.scent}
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", flexWrap: "wrap", marginTop: "auto" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "Inter,sans-serif", fontSize: "13px", color: "#3A4643" }}>
            <span aria-hidden="true" style={{ width: "7px", height: "7px", borderRadius: "50%", background: v.c.dot }}></span>
            {v.c.statusLabel}
          </span>
          <button className="hv-0f51f4" type="button" onClick={v.c.add} disabled={v.c.sold} aria-label={`Add ${v.c.name} to cart`} style={{ minHeight: "44px", padding: "0 16px", background: "transparent", color: "#152828", border: "1px solid rgba(36,59,59,.4)", borderRadius: "6px", fontFamily: "Inter,sans-serif", fontSize: "13px", fontWeight: "600", letterSpacing: ".03em", cursor: "pointer", opacity: v.c.addOp, transition: "background-color .2s, color .2s, border-color .2s" }}>
            {v.c.addLabel}
          </button>
        </div>
      </article>
    </>
  );
}

/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */

export default function LightboxView({ v }: { v: any }) {
  return (
    <>
    {v.lightbox && (
      <>
        <div role="dialog" aria-modal="true" aria-label="Image viewer" style={{ position: "fixed", inset: "0", zIndex: "80", background: "rgba(26,42,42,.95)", display: "flex", flexDirection: "column", color: "#F7F3EA" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px clamp(16px,3vw,32px)" }}>
            <span style={{ fontSize: "13px", fontWeight: "600", letterSpacing: ".12em" }}>
              {v.lbCounter}
            </span>
            <button type="button" id="scw-lb-close" onClick={v.closeLightbox} style={{ minHeight: "44px", padding: "0 10px", border: "0", background: "none", fontSize: "14px", fontWeight: "600", color: "#F7F3EA", cursor: "pointer" }}>
              Close
            </button>
          </div>
          <div style={{ flex: "1", minHeight: "0", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", padding: "0 12px 24px" }}>
            <button type="button" onClick={v.galPrev} aria-label="Previous image" style={{ flex: "none", width: "48px", height: "48px", border: "1px solid rgba(247,243,234,.4)", borderRadius: "6px", background: "none", color: "#F7F3EA", fontSize: "18px", cursor: "pointer" }}>
              ←
            </button>
            <div style={{ height: "min(80vh,125vw)", aspectRatio: "4 / 5", maxWidth: "calc(100% - 120px)", overflow: "hidden", borderRadius: "3px" }}>
              <img src={v.mainImg.src} alt={v.mainImg.alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: v.mainImg.pos, transform: v.mainImg.scale, transformOrigin: v.mainImg.pos }} />
            </div>
            <button type="button" onClick={v.galNext} aria-label="Next image" style={{ flex: "none", width: "48px", height: "48px", border: "1px solid rgba(247,243,234,.4)", borderRadius: "6px", background: "none", color: "#F7F3EA", fontSize: "18px", cursor: "pointer" }}>
              →
            </button>
          </div>
        </div>
      </>
    )}
    </>
  );
}

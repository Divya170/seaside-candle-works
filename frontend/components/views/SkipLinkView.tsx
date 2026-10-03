/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */

export default function SkipLinkView({ v }: { v: any }) {
  return (
    <>
    <button className="fc-48c88d" type="button" onClick={v.skip} style={{ position: "fixed", left: "-9999px", top: "10px", zIndex: "100", minHeight: "44px", padding: "0 18px", background: "#152828", color: "#F7F3EA", border: "0", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>
      Skip to content
    </button>
    </>
  );
}

/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function SheetView({ v }: { v: any }) {
  return (
    <>
    {v.sheet && (
      <>
        <div onClick={v.closeSheet} aria-hidden="true" style={{ position: "fixed", inset: "0", zIndex: "70", background: "rgba(36,59,59,.4)" }}></div>
        <div role="dialog" aria-modal="true" aria-labelledby="sheet-title" style={{ position: "fixed", left: "0", right: "0", bottom: "0", zIndex: "71", maxHeight: "88vh", overflow: "auto", background: "#F7F3EA", borderRadius: "14px 14px 0 0", padding: "10px 20px 0", boxShadow: "0 -12px 40px rgba(36,59,59,.15)" }}>
          <div aria-hidden="true" style={{ width: "40px", height: "4px", borderRadius: "2px", background: "rgba(36,59,59,.2)", margin: "0 auto 12px" }}></div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 id="sheet-title" style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "30px" }}>
              Filter & sort
            </h2>
            <button type="button" id="scw-sheet-close" onClick={v.closeSheet} style={{ minHeight: "44px", padding: "0 6px", border: "0", background: "none", fontSize: "14px", fontWeight: "600", color: "#152828", cursor: "pointer" }}>
              Close
            </button>
          </div>
          {v.sheetGroups.map((sg: any, i_sg: number) => (
            <Fragment key={i_sg}>
              <fieldset style={{ border: "0", padding: "0", margin: "0 0 24px", minWidth: "0" }}>
                <legend style={{ padding: "0", marginBottom: "12px", fontSize: "12px", fontWeight: "700", letterSpacing: ".16em", textTransform: "uppercase", color: "#3A4643" }}>
                  {sg.label}
                </legend>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {sg.options.map((o: any, i_o: number) => (
                    <Fragment key={i_o}>
                      <button type="button" onClick={o.pick} aria-pressed={o.pressed} disabled={o.disabled} style={{ minHeight: "44px", padding: "0 16px", borderRadius: "4px", border: `1px solid ${o.border}`, background: o.bg, color: o.color, fontSize: "14px", fontWeight: "500", cursor: "pointer", opacity: o.op }}>
                        {o.label}
                      </button>
                    </Fragment>
                  ))}
                </div>
                {sg.hasNote && (
                  <>
                    <p style={{ margin: "10px 0 0", fontSize: "13px", color: "#3A4643" }}>
                      {sg.note}
                    </p>
                  </>
                )}
              </fieldset>
            </Fragment>
          ))}
          <div style={{ position: "sticky", bottom: "0", background: "#F7F3EA", padding: "14px 0 calc(16px + env(safe-area-inset-bottom))", display: "flex", gap: "12px", borderTop: "1px solid rgba(36,59,59,.12)" }}>
            <button type="button" onClick={v.clearAll} style={{ minHeight: "52px", padding: "0 20px", border: "1px solid #152828", borderRadius: "6px", background: "none", fontSize: "14px", fontWeight: "600", color: "#152828", cursor: "pointer" }}>
              Reset
            </button>
            <button type="button" onClick={v.closeSheet} style={{ flex: "1", minHeight: "52px", border: "0", borderRadius: "6px", background: "#2B5352", color: "#FCFBF7", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
              {v.showResultsText}
            </button>
          </div>
        </div>
      </>
    )}
    </>
  );
}

/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function MenuView({ v }: { v: any }) {
  return (
    <>
    {v.menu && (
      <>
        <div role="dialog" aria-modal="true" aria-label="Menu" style={{ position: "fixed", inset: "0", zIndex: "70", background: "#F7F3EA", display: "flex", flexDirection: "column", padding: "16px clamp(20px,4vw,56px) 28px", overflow: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "22px", fontWeight: "500" }}>
              Seaside Candle Works
            </span>
            <button type="button" id="scw-menu-close" onClick={v.closeMenu} style={{ minHeight: "44px", padding: "0 6px", border: "0", background: "none", fontSize: "14px", fontWeight: "600", color: "#152828", cursor: "pointer" }}>
              Close
            </button>
          </div>
          <nav aria-label="Mobile">
            <ul style={{ listStyle: "none", margin: "0", padding: "0", borderTop: "1px solid rgba(36,59,59,.14)" }}>
              {v.menuLinks.map((ml: any, i_ml: number) => (
                <Fragment key={i_ml}>
                  <li>
                    <a href={ml.href} aria-current={ml.current} style={{ minHeight: "68px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(36,59,59,.14)", fontFamily: "'Playfair Display',Georgia,serif", fontSize: "36px", fontWeight: "400", color: "#152828", textDecoration: "none" }}>
                      {ml.label}
                      <span aria-hidden="true" style={{ fontFamily: "Inter,sans-serif", fontSize: "16px", color: "#2B5352" }}>
                        →
                      </span>
                    </a>
                  </li>
                </Fragment>
              ))}
            </ul>
          </nav>
          <p style={{ margin: "auto 0 0", paddingTop: "32px", fontSize: "12px", fontWeight: "600", letterSpacing: ".22em", textTransform: "uppercase", color: "#3A4643" }}>
            Rehoboth Beach, Delaware
          </p>
        </div>
      </>
    )}
    </>
  );
}

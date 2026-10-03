/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function FooterView({ v }: { v: any }) {
  return (
    <>
    {v.showChrome && (
      <>
        <footer style={{ background: "#152828", color: "#E9EEEC", padding: "clamp(64px,8vw,110px) 0 28px" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "48px" }}>
              <div style={{ flex: "1 1 280px", maxWidth: "380px", display: "flex", flexDirection: "column", gap: "14px" }}>
                <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "34px", fontWeight: "400", lineHeight: "1", color: "#F7F3EA" }}>
                  Seaside Candle Works
                </span>
                <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: ".22em", textTransform: "uppercase", color: "#A9D5CF" }}>
                  Rehoboth Beach, Delaware
                </span>
              </div>
              <div style={{ flex: "2 1 480px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "32px" }}>
                {v.footerCols.map((fc: any, i_fc: number) => (
                  <Fragment key={i_fc}>
                    <nav aria-label={fc.title}>
                      <h2 style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "700", letterSpacing: ".2em", textTransform: "uppercase", color: "#A9D5CF" }}>
                        {fc.title}
                      </h2>
                      <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column" }}>
                        {fc.links.map((fl: any, i_fl: number) => (
                          <Fragment key={i_fl}>
                            <li>
                              <a className="hv-49aec0" href={fl.href} style={{ minHeight: "38px", display: "inline-flex", alignItems: "center", color: "#E9EEEC", textDecoration: "none", fontSize: "15px" }}>
                                {fl.label}
                              </a>
                            </li>
                          </Fragment>
                        ))}
                      </ul>
                    </nav>
                  </Fragment>
                ))}
              </div>
            </div>
            <div style={{ marginTop: "64px", paddingTop: "22px", borderTop: "1px solid rgba(247,243,234,.16)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px", fontSize: "13px", color: "#C3CDCA" }}>
              <span>
                © 2026 Seaside Candle Works
              </span>
              <span>
                {v.st.legal || '[Privacy policy] · [Terms] · [Accessibility statement]'}
              </span>
            </div>
          </div>
        </footer>
      </>
    )}
    </>
  );
}

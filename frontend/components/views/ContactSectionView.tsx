/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function ContactSectionView({ v }: { v: any }) {
  return (
    <>
    {v.showContact && (
      <>
        <section aria-labelledby="h-contact" style={{ padding: "clamp(72px,9vw,140px) 0" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)", display: "flex", flexWrap: "wrap", gap: "clamp(40px,6vw,100px)", alignItems: "flex-start" }}>
            <div data-reveal="" style={{ flex: "1 1 320px", maxWidth: "480px", display: "flex", flexDirection: "column", gap: "26px" }}>
              {v.isHome && (
                <>
                  <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: ".22em", textTransform: "uppercase", color: "#2B5352" }}>
                    Contact
                  </p>
                </>
              )}
              <h2 id="h-contact" style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(38px,4.4vw,64px)", lineHeight: "1.02", letterSpacing: "-.01em", textWrap: "balance" }}>
                Questions before you order?
              </h2>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#323F3D" }}>
                Send a note about a candle, an order, or a gift.
              </p>
              <dl style={{ margin: "8px 0 0", display: "flex", flexDirection: "column", borderTop: "1px solid rgba(36,59,59,.14)" }}>
                {v.contactInfo.map((ct: any, i_ct: number) => (
                  <Fragment key={i_ct}>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "6px 20px", padding: "18px 0", borderBottom: "1px solid rgba(36,59,59,.14)" }}>
                      <dt style={{ fontSize: "12px", fontWeight: "600", letterSpacing: ".18em", textTransform: "uppercase", color: "#3A4643" }}>
                        {ct.label}
                      </dt>
                      <dd style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontSize: "22px", color: "#152828" }}>
                        {ct.value}
                      </dd>
                    </div>
                  </Fragment>
                ))}
              </dl>
            </div>
            <div data-reveal="" style={{ flex: "1.3 1 420px", minWidth: "0", background: "#FCFBF7", border: "1px solid rgba(36,59,59,.1)", borderRadius: "6px", padding: "clamp(24px,3.6vw,52px)" }}>
              {v.cSuccess && (
                <>
                  <div role="status" style={{ display: "flex", flexDirection: "column", gap: "18px", alignItems: "flex-start", padding: "12px 0" }}>
                    <h3 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "40px", lineHeight: "1.05" }}>
                      Message sent.
                    </h3>
                    <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#323F3D" }}>
                      {"Thanks, "}{v.cName}. We've received your message about “{v.cSubject}”. {" "}{v.st.replyTime || "[Reply-time expectation — supplied by client]"}
                    </p>
                    <p style={{ margin: "0", font: "500 13px Inter,sans-serif", color: "#3A4643" }}>{"Reference "}<strong>{v.cRef}</strong></p>
                    <a href="/shop" style={{ display: "inline-flex", alignItems: "center", minHeight: "48px", padding: "0 22px", background: "#152828", color: "#F7F3EA", borderRadius: "6px", font: "600 14px Inter,sans-serif", textDecoration: "none", marginRight: "10px" }}>Shop the candles</a>
                    <button className="hv-d66214" type="button" onClick={v.resetContact} style={{ minHeight: "52px", padding: "0 28px", background: "transparent", color: "#152828", border: "1px solid #152828", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                      Send another message
                    </button>
                  </div>
                </>
              )}
              {v.cShowForm && (
                <>
                  <form noValidate onSubmit={v.submitContact} aria-label="Contact form" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {v.cError && (
                      <>
                        <div role="alert" style={{ padding: "16px 18px", border: "1px solid #9B3B2E", borderRadius: "6px", background: "#F8ECE7", color: "#7A2C22", fontSize: "15px", lineHeight: "1.55" }}>
                          <strong>
                            Your message wasn't sent.
                          </strong>
                          {" Please try again, or email us at [Contact Email]."}
                        </div>
                      </>
                    )}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                      {v.contactFields.map((f: any, i_f: number) => (
                        <Fragment key={i_f}>
                          <div style={{ flex: f.flex, minWidth: "0", display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label htmlFor={f.id} style={{ fontSize: "14px", fontWeight: "600", color: "#152828" }}>
                              {f.label}
                            </label>
                            {f.isInput && (
                              <>
                                <input className="fc-f264d6" id={f.id} name={f.key} type={f.type} autoComplete={f.ac} value={f.value} onChange={f.onChange} aria-invalid={f.invalid} aria-describedby={f.describedBy} style={{ width: "100%", minHeight: "52px", padding: "0 16px", background: "#FFFEFB", border: `1px solid ${f.border}`, borderRadius: "6px", fontSize: "16px", color: "#152828", transition: "border-color .2s, box-shadow .2s" }} />
                              </>
                            )}
                            {f.isArea && (
                              <>
                                <textarea className="fc-f264d6" id={f.id} name={f.key} rows={6} value={f.value} onChange={f.onChange} aria-invalid={f.invalid} aria-describedby={f.describedBy} style={{ width: "100%", padding: "14px 16px", background: "#FFFEFB", border: `1px solid ${f.border}`, borderRadius: "6px", fontSize: "16px", lineHeight: "1.55", color: "#152828", resize: "vertical", transition: "border-color .2s, box-shadow .2s" }}></textarea>
                              </>
                            )}
                            {f.hasHelp && (
                              <>
                                <p id={f.helpId} style={{ margin: "0", fontSize: "13px", color: "#3A4643" }}>
                                  {f.help}
                                </p>
                              </>
                            )}
                            {f.hasError && (
                              <>
                                <p id={f.errId} style={{ margin: "0", fontSize: "13px", fontWeight: "600", color: "#9B3B2E" }}>
                                  {f.error}
                                </p>
                              </>
                            )}
                            {f.ok && (
                              <>
                                <p style={{ margin: "0", fontSize: "13px", color: "#2B5352" }}>
                                  ✓ Looks good
                                </p>
                              </>
                            )}
                          </div>
                        </Fragment>
                      ))}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px" }}>
                      <button className="hv-112f10" type="submit" disabled={v.cLoading} aria-busy={v.cBusy} style={{ minHeight: "54px", minWidth: "200px", padding: "0 30px", background: "#2B5352", color: "#FCFBF7", border: "1px solid #2B5352", borderRadius: "6px", fontSize: "14px", fontWeight: "600", letterSpacing: ".04em", cursor: "pointer", opacity: v.cBtnOp, transition: "background-color .2s" }}>
                        {v.cBtn}
                      </button>
                      <p style={{ margin: "0", fontSize: "13px", color: "#3A4643" }}>
                        All fields are required.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </>
    )}
    </>
  );
}

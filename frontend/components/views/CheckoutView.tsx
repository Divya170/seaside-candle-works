/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function CheckoutView({ v }: { v: any }) {
  return (
    <>
    {v.isCheckout && (
      <>
        <section style={{ padding: "clamp(32px,4vw,64px) 0 clamp(80px,10vw,140px)" }}>
          <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)" }}>
            {v.coSuccess && (
              <>
                <div role="status" style={{ maxWidth: "640px", margin: "clamp(24px,5vw,64px) auto", display: "flex", flexDirection: "column", gap: "20px", alignItems: "flex-start" }}>
                  <h1 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(46px,6vw,80px)", lineHeight: "1" }}>
                    {"Thank you, "}{v.coFirst}.
                  </h1>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#323F3D" }}>
                    {"Your order has been placed. A confirmation will be sent to "}{v.coEmail}.
                  </p>
                  <p style={{ margin: "0", fontSize: "15px", color: "#323F3D" }}>
                    {"Order number: "}<strong>{v.orderRef}</strong>
                  </p>
                  <a className="hv-fa67e7" href="/shop" style={{ display: "inline-flex", alignItems: "center", minHeight: "52px", padding: "0 28px", background: "#2B5352", color: "#FCFBF7", borderRadius: "6px", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>
                    Continue shopping
                  </a>
                </div>
              </>
            )}
            {v.coEmptyCart && (
              <>
                <div style={{ margin: "40px auto", maxWidth: "560px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
                  <h1 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "44px" }}>
                    Nothing to check out yet.
                  </h1>
                  <p style={{ margin: "0", fontSize: "16px", color: "#323F3D" }}>
                    Your cart is empty.
                  </p>
                  <a href="/shop" style={{ display: "inline-flex", alignItems: "center", minHeight: "52px", padding: "0 28px", background: "#2B5352", color: "#FCFBF7", borderRadius: "6px", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>
                    Shop candles
                  </a>
                </div>
              </>
            )}
            {v.coShowForm && (
              <>
                <h1 style={{ margin: "0 0 clamp(24px,3vw,40px)", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(44px,5vw,72px)", lineHeight: "1", letterSpacing: "-.01em" }}>
                  Checkout
                </h1>
                {v.isMobile && (
                  <>
                    <div style={{ marginBottom: "28px", border: "1px solid rgba(36,59,59,.14)", borderRadius: "6px", background: "#FCFBF7" }}>
                      <button type="button" onClick={v.toggleSummary} aria-expanded={v.summaryExpanded} aria-controls="co-sum-m" style={{ width: "100%", minHeight: "56px", padding: "0 18px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "0", background: "none", fontSize: "15px", fontWeight: "600", cursor: "pointer", color: "#152828" }}>
                        <span>
                          {v.summaryToggleText}
                        </span>
                        <span>
                          {v.subtotal}
                        </span>
                      </button>
                      {v.summaryOpen && (
                        <>
                          <ul id="co-sum-m" style={{ listStyle: "none", margin: "0", padding: "0 18px 16px", display: "flex", flexDirection: "column", gap: "14px" }}>
                            {v.lines.map((ln: any, i_ln: number) => (
                              <Fragment key={i_ln}>
                                <li style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                  <img src={ln.img} alt="" style={{ width: "52px", height: "64px", objectFit: "cover", objectPosition: ln.pos, borderRadius: "3px" }} />
                                  <span style={{ flex: "1", fontSize: "14px" }}>
                                    {ln.name}{" × "}{ln.qty}
                                  </span>
                                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                                    {ln.lineTotal}
                                  </span>
                                </li>
                              </Fragment>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </>
                )}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px,5vw,80px)", alignItems: "flex-start" }}>
                  <form noValidate onSubmit={v.placeOrder} aria-label="Checkout" style={{ flex: "1.5 1 460px", minWidth: "0", display: "flex", flexDirection: "column", gap: "44px" }}>
                    {v.coFailed && (
                      <>
                        <div role="alert" style={{ padding: "20px 22px", border: "1px solid #9B3B2E", borderRadius: "6px", background: "#F8ECE7", color: "#7A2C22", display: "flex", flexDirection: "column", gap: "8px" }}>
                          <strong style={{ fontSize: "16px" }}>
                            Payment didn't go through.
                          </strong>
                          <span style={{ fontSize: "15px", lineHeight: "1.6" }}>
                            {"Your order was not placed. Check your payment details and try again, or "}
                            <a href="/contact" style={{ color: "#7A2C22", fontWeight: "600" }}>
                              contact us
                            </a>
                            {" if this keeps happening."}
                          </span>
                        {v.coFailDetail && <span style={{ display: "block", marginTop: "6px", fontSize: "14px" }}>{v.coFailDetail}</span>}
                        </div>
                      </>
                    )}
                    {v.coHasErrors && (
                      <>
                        <div role="alert" style={{ padding: "18px 22px", border: "1px solid #9B3B2E", borderRadius: "6px", background: "#F8ECE7", color: "#7A2C22", display: "flex", flexDirection: "column", gap: "10px" }}>
                          <strong style={{ fontSize: "15px" }}>
                            {v.coErrTitle}
                          </strong>
                          <ul style={{ margin: "0", paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "4px" }}>
                            {v.coErrList.map((ce: any, i_ce: number) => (
                              <Fragment key={i_ce}>
                                <li>
                                  <button type="button" onClick={ce.focus} style={{ padding: "2px 0", border: "0", background: "none", color: "#7A2C22", fontSize: "14px", textDecoration: "underline", cursor: "pointer" }}>
                                    {ce.label}
                                  </button>
                                </li>
                              </Fragment>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                    {v.coSections.map((sec: any, i_sec: number) => (
                      <Fragment key={i_sec}>
                        <fieldset style={{ border: "0", padding: "0", margin: "0", minWidth: "0" }}>
                          <legend style={{ padding: "0", marginBottom: "20px", display: "flex", alignItems: "baseline", gap: "14px" }}>
                            <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".12em", color: "#2B5352" }}>
                              {sec.num}
                            </span>
                            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "32px", fontWeight: "400" }}>
                              {sec.title}
                            </span>
                          </legend>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "18px 16px" }}>
                            {sec.fields.map((f: any, i_f: number) => (
                              <Fragment key={i_f}>
                                <div style={{ flex: f.flex, minWidth: "0", display: "flex", flexDirection: "column", gap: "8px" }}>
                                  <label htmlFor={f.id} style={{ fontSize: "14px", fontWeight: "600", color: "#152828" }}>
                                    {f.label}
                                  </label>
                                  <input className="fc-f264d6" id={f.id} name={f.key} type={f.type} autoComplete={f.ac} value={f.value} onChange={f.onChange} aria-invalid={f.invalid} aria-describedby={f.describedBy} style={{ width: "100%", minHeight: "52px", padding: "0 16px", background: "#FFFEFB", border: `1px solid ${f.border}`, borderRadius: "6px", fontSize: "16px", color: "#152828", transition: "border-color .2s, box-shadow .2s" }} />
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
                                </div>
                              </Fragment>
                            ))}
                          </div>
                        </fieldset>
                      </Fragment>
                    ))}
                    <fieldset style={{ border: "0", padding: "0", margin: "0", minWidth: "0" }}>
                      <legend style={{ padding: "0", marginBottom: "20px", display: "flex", alignItems: "baseline", gap: "14px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".12em", color: "#2B5352" }}>
                          03
                        </span>
                        <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "32px", fontWeight: "400" }}>
                          Payment
                        </span>
                      </legend>
                      <div style={{ padding: "28px 24px", border: "1px dashed rgba(36,59,59,.32)", borderRadius: "6px", background: "repeating-linear-gradient(135deg,rgba(168,150,128,.07) 0 10px,transparent 10px 20px)", fontFamily: "ui-monospace,Menlo,monospace", fontSize: "13px", lineHeight: "1.7", color: "#323F3D" }}>
                        {v.paymentNote}
                      </div>
                    </fieldset>
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      <button className="hv-112f10" type="submit" disabled={v.coProcessing} aria-busy={v.coBusy} style={{ width: "100%", minHeight: "60px", padding: "0 24px", background: "#2B5352", color: "#FCFBF7", border: "1px solid #2B5352", borderRadius: "6px", fontSize: "16px", fontWeight: "600", letterSpacing: ".03em", cursor: "pointer", opacity: v.coBtnOp, transition: "background-color .2s" }}>
                        {v.coBtn}
                      </button>
                      <p style={{ margin: "0", fontSize: "13px", lineHeight: "1.6", color: "#3A4643" }}>
                        {v.st.legal ? <>By placing your order you agree to the shop’s terms — {v.st.legal}.</> : "By placing your order you agree to the [Terms of sale] and [Privacy policy]."}
                      </p>
                    </div>
                  </form>
                  {v.isNotMobile && (
                    <>
                      <aside aria-labelledby="co-sum" style={{ flex: "1 1 320px", minWidth: "0", position: "sticky", top: "24px", background: "#FCFBF7", border: "1px solid rgba(36,59,59,.1)", borderRadius: "6px", padding: "clamp(24px,3vw,32px)", display: "flex", flexDirection: "column", gap: "18px" }}>
                        <h2 id="co-sum" style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "30px" }}>
                          Order summary
                        </h2>
                        <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "14px" }}>
                          {v.lines.map((ln: any, i_ln: number) => (
                            <Fragment key={i_ln}>
                              <li style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                <img src={ln.img} alt="" style={{ width: "56px", height: "70px", objectFit: "cover", objectPosition: ln.pos, borderRadius: "3px" }} />
                                <span style={{ flex: "1", minWidth: "0", fontSize: "14px", lineHeight: "1.4" }}>
                                  {ln.name}
                                  <br />
                                  <span style={{ color: "#3A4643" }}>
                                    {"Qty "}{ln.qty}
                                  </span>
                                </span>
                                <span style={{ fontSize: "14px", fontWeight: "600" }}>
                                  {ln.lineTotal}
                                </span>
                              </li>
                            </Fragment>
                          ))}
                        </ul>
                        <dl style={{ margin: "0", paddingTop: "16px", borderTop: "1px solid rgba(36,59,59,.14)", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                            <dt>
                              Subtotal
                            </dt>
                            <dd style={{ margin: "0", fontWeight: "600" }}>
                              {v.subtotal}
                            </dd>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", color: "#3A4643" }}>
                            <dt>
                              Shipping
                            </dt>
                            <dd style={{ margin: "0" }}>
                              {v.coShipping}
                            </dd>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", color: "#3A4643" }}>
                            <dt>
                              Taxes
                            </dt>
                            <dd style={{ margin: "0" }}>
                              {v.coTax}
                            </dd>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", paddingTop: "12px", borderTop: "1px solid rgba(36,59,59,.14)", fontSize: "16px", fontWeight: "600" }}>
                            <dt>
                              Total
                            </dt>
                            <dd style={{ margin: "0" }}>
                              {v.coTotal}
                            </dd>
                          </div>
                        </dl>
                      </aside>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </>
    )}
    </>
  );
}

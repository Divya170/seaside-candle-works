/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function CartView({ v }: { v: any }) {
  return (
    <>
    {v.isCart && (
      <>
        <section style={{ padding: "clamp(40px,5vw,80px) 0 clamp(120px,12vw,160px)" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 clamp(20px,4vw,56px)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "8px 20px" }}>
              <h1 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "clamp(48px,5.6vw,84px)", lineHeight: "1", letterSpacing: "-.015em" }}>
                Your cart
              </h1>
              <p style={{ margin: "0", fontSize: "15px", color: "#3A4643" }}>
                {v.cartCountText}
              </p>
            </div>
            {v.cartEmpty && (
              <>
                <div style={{ marginTop: "40px", padding: "clamp(48px,7vw,96px) 24px", border: "1px dashed rgba(36,59,59,.28)", borderRadius: "6px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "18px" }}>
                  <h2 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "40px" }}>
                    Your cart is empty.
                  </h2>
                  <p style={{ margin: "0", fontSize: "16px", color: "#323F3D" }}>
                    Find something for a slow evening.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
                    <a className="hv-fa67e7" href="/shop" style={{ display: "inline-flex", alignItems: "center", minHeight: "52px", padding: "0 28px", background: "#2B5352", color: "#FCFBF7", borderRadius: "6px", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>
                      Shop candles
                    </a>
                    <a className="hv-d66214" href="/collections" style={{ display: "inline-flex", alignItems: "center", minHeight: "52px", padding: "0 28px", border: "1px solid #152828", borderRadius: "6px", color: "#152828", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>
                      Explore collections
                    </a>
                  </div>
                </div>
              </>
            )}
            {v.hasCart && (
              <>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px,5vw,80px)", alignItems: "flex-start", marginTop: "32px" }}>
                  <ul aria-label="Cart items" style={{ flex: "1.6 1 460px", minWidth: "0", listStyle: "none", margin: "0", padding: "0", borderTop: "1px solid rgba(36,59,59,.14)" }}>
                    {v.lines.map((ln: any, i_ln: number) => (
                      <Fragment key={i_ln}>
                        <li style={{ display: "grid", gridTemplateColumns: "clamp(88px,12vw,128px) minmax(0,1fr)", gap: "clamp(16px,2vw,28px)", padding: "24px 0", borderBottom: "1px solid rgba(36,59,59,.14)" }}>
                          <a href={ln.href} tabIndex={-1} aria-hidden="true" style={{ display: "block", aspectRatio: "4 / 5", overflow: "hidden", borderRadius: "3px", background: "#EDE5D6" }}>
                            <img src={ln.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: ln.pos }} />
                          </a>
                          <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px 16px" }}>
                              <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
                                <h2 style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "500", fontSize: "clamp(22px,2vw,28px)", lineHeight: "1.1" }}>
                                  <a href={ln.href} style={{ color: "#152828", textDecoration: "none" }}>
                                    {ln.name}
                                  </a>
                                </h2>
                                <p style={{ margin: "0", fontSize: "14px", color: "#3A4643" }}>
                                  {ln.scent}
                                </p>
                                <p style={{ margin: "0", fontSize: "14px", color: "#3A4643" }}>
                                  {"Unit price: "}{ln.unit}
                                </p>
                              </div>
                              <p style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>
                                {ln.lineTotal}
                              </p>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 20px" }}>
                              <div role="group" aria-label={`Quantity for ${ln.name}`} style={{ display: "inline-flex", alignItems: "center", border: "1px solid rgba(36,59,59,.28)", borderRadius: "6px", height: "46px" }}>
                                <button type="button" onClick={ln.dec} disabled={ln.decDisabled} aria-label="Decrease quantity" style={{ width: "44px", height: "100%", border: "0", background: "none", cursor: "pointer", fontSize: "18px" }}>
                                  −
                                </button>
                                <span aria-live="polite" style={{ minWidth: "28px", textAlign: "center", fontWeight: "600" }}>
                                  {ln.qty}
                                </span>
                                <button type="button" onClick={ln.inc} aria-label="Increase quantity" style={{ width: "44px", height: "100%", border: "0", background: "none", cursor: "pointer", fontSize: "18px" }}>
                                  +
                                </button>
                              </div>
                              <button type="button" onClick={ln.remove} aria-label={ln.removeLabel} style={{ minHeight: "44px", padding: "0 4px", border: "0", background: "none", fontSize: "14px", fontWeight: "600", color: "#2B5352", textDecoration: "underline", textUnderlineOffset: "4px", cursor: "pointer" }}>
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      </Fragment>
                    ))}
                  </ul>
                  <aside aria-labelledby="sum-title" style={{ flex: "1 1 320px", minWidth: "0", position: "sticky", top: v.stickyTop, background: "#FCFBF7", border: "1px solid rgba(36,59,59,.1)", borderRadius: "6px", padding: "clamp(24px,3vw,36px)", display: "flex", flexDirection: "column", gap: "16px" }}>
                    <h2 id="sum-title" style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "32px" }}>
                      Order summary
                    </h2>
                    <dl style={{ margin: "0", display: "flex", flexDirection: "column", gap: "12px", fontSize: "15px" }}>
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
                          Calculated at checkout
                        </dd>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", color: "#3A4643" }}>
                        <dt>
                          Taxes
                        </dt>
                        <dd style={{ margin: "0" }}>
                          Calculated at checkout
                        </dd>
                      </div>
                    </dl>
                    <a className="hv-fa67e7" href="/checkout" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "56px", background: "#2B5352", color: "#FCFBF7", borderRadius: "6px", fontSize: "15px", fontWeight: "600", letterSpacing: ".03em", textDecoration: "none" }}>
                      Checkout
                    </a>
                    <a href="/shop" style={{ alignSelf: "center", minHeight: "44px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", color: "#152828" }}>
                      Continue shopping
                    </a>
                  </aside>
                </div>
              </>
            )}
          </div>
        </section>
        {v.showCartBar && (
          <>
            <div style={{ position: "fixed", left: "0", right: "0", bottom: "0", zIndex: "35", background: "#FCFBF7", borderTop: "1px solid rgba(36,59,59,.14)", padding: "12px 20px calc(12px + env(safe-area-inset-bottom))", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 -8px 30px rgba(36,59,59,.08)" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "12px", color: "#3A4643" }}>
                  Subtotal
                </span>
                <span style={{ fontSize: "17px", fontWeight: "600" }}>
                  {v.subtotal}
                </span>
              </div>
              <a href="/checkout" style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "52px", background: "#2B5352", color: "#FCFBF7", borderRadius: "6px", fontSize: "15px", fontWeight: "600", textDecoration: "none" }}>
                Checkout
              </a>
            </div>
          </>
        )}
      </>
    )}
    </>
  );
}

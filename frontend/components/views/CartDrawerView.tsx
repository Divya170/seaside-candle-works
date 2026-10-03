/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function CartDrawerView({ v }: { v: any }) {
  return (
    <>
    <aside role="dialog" aria-modal="true" aria-labelledby="drawer-title" style={{ position: "fixed", top: "0", right: "0", bottom: "0", zIndex: "61", width: "min(440px,100%)", background: "#FCFBF7", display: "flex", flexDirection: "column", transform: v.drawerTf, visibility: v.drawerVis, transition: "transform .45s cubic-bezier(.2,.7,.2,1), visibility .45s", boxShadow: "-20px 0 60px rgba(36,59,59,.12)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", padding: "18px 24px", borderBottom: "1px solid rgba(36,59,59,.12)" }}>
        <h2 id="drawer-title" style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: "400", fontSize: "30px" }}>
          {"Your cart "}
          <span style={{ fontFamily: "Inter,sans-serif", fontSize: "14px", color: "#3A4643" }}>
            {v.cartCountText}
          </span>
        </h2>
        <button type="button" id="scw-drawer-close" onClick={v.closeDrawer} style={{ minHeight: "44px", padding: "0 10px", border: "0", background: "none", fontSize: "14px", fontWeight: "600", color: "#152828", cursor: "pointer" }}>
          Close
        </button>
      </div>
      {v.justAdded && (
        <>
          <p role="status" style={{ margin: "0", padding: "12px 24px", background: "#E4F0ED", fontSize: "14px", fontWeight: "600", color: "#152828" }}>
            ✓ Added to your cart
          </p>
        </>
      )}
      <div style={{ flex: "1", overflow: "auto", padding: "8px 24px" }}>
        {v.cartEmpty && (
          <>
            <div style={{ padding: "56px 0", display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
              <p style={{ margin: "0", fontFamily: "'Playfair Display',Georgia,serif", fontSize: "28px" }}>
                Your cart is empty.
              </p>
              <a href="/shop" style={{ display: "inline-flex", alignItems: "center", minHeight: "50px", padding: "0 24px", background: "#2B5352", color: "#FCFBF7", borderRadius: "6px", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>
                Shop candles
              </a>
            </div>
          </>
        )}
        <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
          {v.lines.map((ln: any, i_ln: number) => (
            <Fragment key={i_ln}>
              <li style={{ display: "grid", gridTemplateColumns: "76px minmax(0,1fr)", gap: "16px", padding: "18px 0", borderBottom: "1px solid rgba(36,59,59,.12)" }}>
                <img src={ln.img} alt="" style={{ width: "76px", height: "95px", objectFit: "cover", objectPosition: ln.pos, borderRadius: "3px", background: "#EDE5D6" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                    <a href={ln.href} style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "21px", fontWeight: "500", lineHeight: "1.1", color: "#152828", textDecoration: "none" }}>
                      {ln.name}
                    </a>
                    <span style={{ fontSize: "14px", fontWeight: "600", whiteSpace: "nowrap" }}>
                      {ln.lineTotal}
                    </span>
                  </div>
                  <span style={{ fontSize: "13px", color: "#3A4643" }}>
                    {ln.scent}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                    <div role="group" aria-label={`Quantity for ${ln.name}`} style={{ display: "inline-flex", alignItems: "center", border: "1px solid rgba(36,59,59,.28)", borderRadius: "6px", height: "44px" }}>
                      <button type="button" onClick={ln.dec} disabled={ln.decDisabled} aria-label="Decrease quantity" style={{ width: "40px", height: "100%", border: "0", background: "none", cursor: "pointer", fontSize: "17px" }}>
                        −
                      </button>
                      <span aria-live="polite" style={{ minWidth: "24px", textAlign: "center", fontWeight: "600", fontSize: "14px" }}>
                        {ln.qty}
                      </span>
                      <button type="button" onClick={ln.inc} aria-label="Increase quantity" style={{ width: "40px", height: "100%", border: "0", background: "none", cursor: "pointer", fontSize: "17px" }}>
                        +
                      </button>
                    </div>
                    <button type="button" onClick={ln.remove} aria-label={ln.removeLabel} style={{ minHeight: "44px", padding: "0 4px", border: "0", background: "none", fontSize: "13px", fontWeight: "600", color: "#2B5352", textDecoration: "underline", textUnderlineOffset: "4px", cursor: "pointer" }}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
      {v.hasCart && (
        <>
          <div style={{ padding: "20px 24px calc(20px + env(safe-area-inset-bottom))", borderTop: "1px solid rgba(36,59,59,.12)", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "600" }}>
              <span>
                Subtotal
              </span>
              <span>
                {v.subtotal}
              </span>
            </div>
            <p style={{ margin: "0", fontSize: "13px", color: "#3A4643" }}>
              Shipping and taxes are calculated at checkout.
            </p>
            <a className="hv-fa67e7" href="/checkout" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "54px", background: "#2B5352", color: "#FCFBF7", borderRadius: "6px", fontSize: "15px", fontWeight: "600", textDecoration: "none" }}>
              Checkout
            </a>
            <a className="hv-d66214" href="/cart" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "48px", border: "1px solid #152828", borderRadius: "6px", color: "#152828", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>
              View cart
            </a>
          </div>
        </>
      )}
    </aside>
    </>
  );
}

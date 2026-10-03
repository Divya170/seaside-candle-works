/* Presentational view generated from the Seaside Candle Works design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */

export default function DrawerOverlayView({ v }: { v: any }) {
  return (
    <>
    <div onClick={v.closeDrawer} aria-hidden="true" style={{ position: "fixed", inset: "0", zIndex: "60", background: "rgba(36,59,59,.38)", opacity: v.ovOp, pointerEvents: v.ovPe, transition: "opacity .4s" }}></div>
    </>
  );
}

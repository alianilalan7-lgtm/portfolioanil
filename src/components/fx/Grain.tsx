/** Global film-grain + scanline atmosphere overlay (CSS only, no JS). */
export default function Grain() {
  return (
    <>
      <div className="fx-scanlines" aria-hidden="true" />
      <div className="fx-grain" aria-hidden="true" />
    </>
  );
}

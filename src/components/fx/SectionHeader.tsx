/** Terminal section label: `[07] // HİZMETLER ───────── 4 MODÜL` */
export default function SectionHeader({
  index,
  label,
  meta,
  className = "",
}: {
  index: string;
  label: string;
  meta?: string;
  className?: string;
}) {
  return (
    <div className={`section-label ${className}`}>
      <span>
        <span className="idx">[{index}]</span> // {label}
      </span>
      <span className="rule" />
      {meta && <span className="text-faint">{meta}</span>}
    </div>
  );
}

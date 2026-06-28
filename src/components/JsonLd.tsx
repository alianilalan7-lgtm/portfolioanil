import type { JSX } from "react";

/**
 * Renders one or more JSON-LD structured-data blocks. Pass a single object or
 * an array; each becomes its own <script type="application/ld+json"> tag.
 */
export default function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}): JSX.Element {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

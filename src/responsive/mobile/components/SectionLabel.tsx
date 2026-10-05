interface SectionLabelProps {
  lines: [string, string, string]
}

/* The three centred lines + hairline that open every Figma block. */
export function SectionLabel({ lines }: SectionLabelProps) {
  return (
    <div className="m-label" data-reveal>
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  )
}

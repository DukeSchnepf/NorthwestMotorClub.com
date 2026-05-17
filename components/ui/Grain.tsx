/** Film-grain overlay (SVG fractal noise). Decorative, non-interactive. */
export default function Grain({ opacity = 0.07 }: { opacity?: number }) {
  const noise = `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>`;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 mix-blend-soft-light"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,${noise}")`,
        backgroundSize: "140px 140px",
      }}
    />
  );
}

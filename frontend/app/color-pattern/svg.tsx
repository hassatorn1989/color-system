import { ReactElement } from "react";
interface SvgComponentsProps {
  svg: string;
}
export function SvgComponents({ svg }: SvgComponentsProps): ReactElement {
  const customSvg = svg
    .replace(/fill=".*?"/g, 'fill="#8A2BE2"')
    .replace(/height=".*?"/g, 'height="50px"')
    .replace(/width=".*?"/g, 'width="50px"');

  return (
    <pre
      style={{
        backgroundImage: `url(${`data:image/svg+xml;utf8,${encodeURIComponent(
          customSvg
        )}`})`,
        backgroundColor: "#fef3c6",
        color: "transparent",
        height: "100%",
        width: "100%",
      }}
      className="rounded-2xl block"
    />
  );
}

const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_BLOCK_PATTERN = /<svg\b[\s\S]*?<\/svg>/i;
const ROOT_SVG_TAG_PATTERN = /<svg\b([^>]*)>/i;
const XML_PREFIX_PATTERN = /^\s*(?:<\?xml[\s\S]*?\?>)?\s*(?:<!doctype[\s\S]*?>)?\s*/i;
const PAINT_PROPERTIES = [
  "fill",
  "stroke",
  "stop-color",
  "flood-color",
  "lighting-color",
  "color",
] as const;
const STYLE_PROP_PATTERN = new RegExp(
  `\\b(${PAINT_PROPERTIES.join("|")})\\s*:\\s*([^;]+)`,
  "gi"
);
const QUOTED_ATTR_PATTERN = new RegExp(
  `\\b(${PAINT_PROPERTIES.join("|")})\\s*=\\s*(['"])(.*?)\\2`,
  "gi"
);
const UNQUOTED_ATTR_PATTERN = new RegExp(
  `\\b(${PAINT_PROPERTIES.join("|")})\\s*=\\s*([^"'\\s>]+)`,
  "gi"
);
const BLACK_TOKENS = [
  /#000000\b/gi,
  /#000\b(?![0-9a-f])/gi,
  /\bblack\b/gi,
  /rgba?\(\s*0\s*,\s*0\s*,\s*0(?:\s*,\s*1(?:\.0+)?)?\s*\)/gi,
  /rgb\(\s*0\s+0\s+0(?:\s*\/\s*1(?:\.0+)?)?\s*\)/gi,
];

function escapeAttribute(value: string) {
  return value.replace(/"/g, "&quot;");
}

function shouldReplacePaintValue(value: string) {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return false;
  if (normalized === "none") return false;
  if (normalized === "transparent") return false;
  if (normalized === "currentcolor") return false;
  if (normalized === "inherit") return false;
  if (normalized.startsWith("url(")) return false;
  return true;
}

function replaceBlackTokens(value: string, color: string) {
  return BLACK_TOKENS.reduce((next, pattern) => next.replace(pattern, color), value);
}

function replacePaintAttributes(svg: string, color: string) {
  const withQuoted = svg.replace(
    QUOTED_ATTR_PATTERN,
    (match, property: string, quote: string, value: string) =>
      shouldReplacePaintValue(value) ? `${property}=${quote}${color}${quote}` : match
  );

  return withQuoted.replace(
    UNQUOTED_ATTR_PATTERN,
    (match, property: string, value: string) =>
      shouldReplacePaintValue(value) ? `${property}="${color}"` : match
  );
}

function replacePaintStyles(content: string, color: string) {
  const withProperties = content.replace(
    STYLE_PROP_PATTERN,
    (match, property: string, value: string) =>
      shouldReplacePaintValue(value) ? `${property}: ${color}` : match
  );

  return replaceBlackTokens(withProperties, color);
}

function updateRootSvgTag(
  svg: string,
  options?: { width?: number; height?: number; color?: string }
) {
  return svg.replace(ROOT_SVG_TAG_PATTERN, (match, rawAttributes: string) => {
    let attrs = rawAttributes;

    if (!/\sxmlns=(['"]).*?\1/i.test(attrs)) {
      attrs += ` xmlns="${SVG_NS}"`;
    }

    if (options?.width) {
      if (/\swidth=(['"]).*?\1/i.test(attrs)) {
        attrs = attrs.replace(/\swidth=(['"]).*?\1/i, ` width="${options.width}px"`);
      } else {
        attrs += ` width="${options.width}px"`;
      }
    }

    if (options?.height) {
      if (/\sheight=(['"]).*?\1/i.test(attrs)) {
        attrs = attrs.replace(/\sheight=(['"]).*?\1/i, ` height="${options.height}px"`);
      } else {
        attrs += ` height="${options.height}px"`;
      }
    }

    if (options?.color) {
      if (/\scolor=(['"]).*?\1/i.test(attrs)) {
        attrs = attrs.replace(/\scolor=(['"]).*?\1/i, ` color="${escapeAttribute(options.color)}"`);
      } else {
        attrs += ` color="${escapeAttribute(options.color)}"`;
      }

      const styleMatch = attrs.match(/\sstyle=(['"])(.*?)\1/i);
      if (styleMatch) {
        const quote = styleMatch[1];
        const styleValue = styleMatch[2];
        const nextStyle = styleValue.trim().endsWith(";")
          ? `${styleValue} color: ${options.color};`
          : `${styleValue}; color: ${options.color};`;
        attrs = attrs.replace(styleMatch[0], ` style=${quote}${nextStyle}${quote}`);
      } else {
        attrs += ` style="color: ${escapeAttribute(options.color)};"`;
      }
    }

    return `<svg${attrs}>`;
  });
}

export function extractSvgMarkup(content: string) {
  const trimmed = content.replace(XML_PREFIX_PATTERN, "").trim();
  if (!trimmed) return null;

  const match = trimmed.match(SVG_BLOCK_PATTERN);
  const svg = match?.[0] ?? (trimmed.toLowerCase().startsWith("<svg") ? trimmed : null);
  if (!svg) return null;

  return updateRootSvgTag(svg);
}

export function resizeSvgMarkup(svg: string, width: number, height: number) {
  const extracted = extractSvgMarkup(svg);
  if (!extracted) return null;
  return updateRootSvgTag(extracted, { width, height });
}

export function colorizeSvgMarkup(
  svg: string,
  foregroundColor: string,
  options?: { width?: number; height?: number }
) {
  const extracted = extractSvgMarkup(svg);
  if (!extracted) return null;

  const withRoot = updateRootSvgTag(extracted, {
    width: options?.width,
    height: options?.height,
    color: foregroundColor,
  });

  const withPaintAttributes = replacePaintAttributes(withRoot, foregroundColor);
  const withInlineStyles = withPaintAttributes.replace(
    /style=(['"])(.*?)\1/gi,
    (_, quote: string, styleValue: string) =>
      `style=${quote}${replacePaintStyles(styleValue, foregroundColor)}${quote}`
  );

  const withStyleBlocks = withInlineStyles.replace(
    /<style\b[^>]*>([\s\S]*?)<\/style>/gi,
    (match, cssText: string) => match.replace(cssText, replacePaintStyles(cssText, foregroundColor))
  );

  return replaceBlackTokens(withStyleBlocks, foregroundColor);
}

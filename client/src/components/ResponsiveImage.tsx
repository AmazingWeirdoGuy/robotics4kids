import type { ImgHTMLAttributes } from "react";

function getWebpPath(src: string): string | null {
  if (!src || src.startsWith("data:") || src.startsWith("blob:")) return null;
  try {
    const url = new URL(src, window.location.origin);
    if (url.origin !== window.location.origin) return null;
    if (!/\.(png|jpe?g)$/i.test(url.pathname)) return null;
    url.pathname = url.pathname.replace(/\.(png|jpe?g)$/i, ".webp");
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}

export default function ResponsiveImage({ src, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const webpSrc = typeof src === "string" ? getWebpPath(src) : null;
  const imageProps = { loading: "lazy" as const, decoding: "async" as const, ...props };

  if (!webpSrc) return <img src={src} {...imageProps} />;

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img src={src} {...imageProps} />
    </picture>
  );
}
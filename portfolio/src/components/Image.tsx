import React from "react";

interface ImageProps {
  href: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

function Image({ href, alt, className, style }: ImageProps) {
  return (
    <img
      className={`img-fluid img-max-height rounded` + (className ? ` ${className}` : "")}
      style={style}
      src={`/images/${href}`}
      alt={alt || href}
    />
  );
}

export default Image;

import React from "react";

interface ImageProps {
  href: string;
  alt?: string;
}

function Image({ href, alt }: ImageProps) {
  return (
    <img
      className="img-fluid img-max-height rounded"
      src={`/images/${href}`}
      alt={alt || href}
    />
  );
}

export default Image;

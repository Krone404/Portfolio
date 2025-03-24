// Card.tsx
import React from "react";

interface CardProps {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
}

function Card({
  title,
  description,
  url,
  imageUrl = "download.svg",
}: CardProps) {
  // Check if the imageUrl is an absolute URL
  const isAbsoluteUrl =
    imageUrl.startsWith("http://") || imageUrl.startsWith("https://");
  // Use the absolute URL directly, otherwise assume it's in /images/
  const src = isAbsoluteUrl ? imageUrl : `/images/${imageUrl}`;
  console.log(src);

  return (
    <div className="card h-100 d-flex flex-column">
      <img className="card-img-top" src={src} alt={title} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          {description || "No description available."}
        </p>
        {/* mt-auto pushes this button to the bottom within the flex container */}
        <a
          href={url}
          className="btn btn-primary mt-auto"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Repository
        </a>
      </div>
    </div>
  );
}

export default Card;

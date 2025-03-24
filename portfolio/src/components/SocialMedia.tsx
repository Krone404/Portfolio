// SocialMedia.tsx
import React from "react";

const SocialMedia: React.FC = () => {
  return (
    <section id="social-media" className="container mx-auto pageBox">
      <div>
        <div className="social-media-icon-container">
          <a
            className="social-media-icon"
            id="linkedin"
            href="https://www.linkedin.com/in/cameron-cartwright/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="image-container">
              <img src="/images/linkedin.svg" alt="LinkedIn" />
            </div>
          </a>
          <a
            className="social-media-icon"
            id="github"
            href="https://github.com/Krone404"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="image-container">
              <img src="/images/github.svg" alt="GitHub" />
            </div>
          </a>
          <a
            className="social-media-icon"
            id="email"
            href="mailto:cameron.cartwright122804@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="image-container">
              <img src="/images/gmail.svg" alt="Email" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;

// ProjectsCarousel.tsx
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Card from "./Card";
import { fetchGitHubRepos, Repo } from "../api/fetchGitHubRepos";

const ProjectsCarousel: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // slidesToShow now depends on window width
  const [slidesToShow, setSlidesToShow] = useState<number>(3);
  const trackRef = useRef<HTMLUListElement>(null);
  const username = "Krone404";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const getRepos = async () => {
      try {
        const fetchedRepos = await fetchGitHubRepos(username);
        setRepos(fetchedRepos);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    getRepos();
  }, [username]);

  // Animate visible slides on index change
  useEffect(() => {
    if (trackRef.current) {
      gsap.fromTo(
        trackRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
      );
    }
  }, [currentIndex, repos]);

  const maxIndex = Math.ceil(repos.length / slidesToShow) - 1;
  const prevDisabled = currentIndex === 0;
  const nextDisabled = currentIndex === maxIndex;

  const next = () => {
    if (!nextDisabled) {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    }
  };

  const prev = () => {
    if (!prevDisabled) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const startIndex = currentIndex * slidesToShow;
  const visibleRepos = repos.slice(startIndex, startIndex + slidesToShow);

  return (
    <div className="carousel-container">
      <button
        onClick={prev}
        disabled={prevDisabled}
        className={`arrow-btn arrow-left ${prevDisabled ? "disabled" : ""}`}
      >
        <img
          src="/images/arrow-prev.svg"
          alt="Previous"
          style={prevDisabled ? { color: "var(--more_off_white)" } : {}}
        />
      </button>

      <div className="carousel-track-container">
        <ul className="carousel-track" ref={trackRef}>
          {visibleRepos.map((repo) => (
            <li key={repo.id} className="carousel-slide">
              <Card
                title={repo.name}
                description={repo.description || "No description available."}
                url={repo.url}
                imageUrl={repo.openGraphImageUrl || "/images/download.svg"}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={next}
        disabled={nextDisabled}
        className={`arrow-btn arrow-right ${nextDisabled ? "disabled" : ""}`}
      >
        <img
          src="/images/arrow-next.svg"
          alt="Next"
          style={nextDisabled ? { color: "var(--more_off_white)" } : {}}
        />
      </button>
    </div>
  );
};

export default ProjectsCarousel;

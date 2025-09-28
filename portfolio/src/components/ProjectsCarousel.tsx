import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import Card from "./Card";
import { fetchGitHubRepos, Repo } from "../api/fetchGitHubRepos";

const USERNAME = "Krone404";

type FetchStatus = "idle" | "loading" | "ready" | "error";

const ProjectsCarousel: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const trackRef = useRef<HTMLUListElement>(null);

  const updateSlidesToShow = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    const width = window.innerWidth;
    if (width < 576) {
      setSlidesToShow(1);
    } else if (width < 992) {
      setSlidesToShow(2);
    } else {
      setSlidesToShow(3);
    }
  }, []);

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, [updateSlidesToShow]);

  useEffect(() => {
    let isMounted = true;

    const loadRepos = async () => {
      setStatus("loading");
      setErrorMessage(null);

      try {
        const fetchedRepos = await fetchGitHubRepos(USERNAME);
        if (!isMounted) {
          return;
        }

        setRepos(fetchedRepos);
        setCurrentIndex(0);
        setStatus("ready");
      } catch (error) {
        console.error("Error fetching repos:", error);
        if (!isMounted) {
          return;
        }

        setRepos([]);
        setStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : "Unexpected error."
        );
      }
    };

    loadRepos();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const maxIdx = Math.max(Math.ceil(repos.length / slidesToShow) - 1, 0);
    setCurrentIndex((prev) => Math.min(prev, maxIdx));
  }, [repos.length, slidesToShow]);

  useEffect(() => {
    if (!trackRef.current || repos.length === 0) {
      return;
    }

    const slides = Array.from(trackRef.current.children);
    if (slides.length === 0) {
      return;
    }

    gsap.fromTo(
      slides,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
    );
  }, [currentIndex, repos]);

  const totalPages = useMemo(
    () => Math.max(Math.ceil(repos.length / slidesToShow), 1),
    [repos.length, slidesToShow]
  );
  const maxIndex = totalPages - 1;
  const prevDisabled = currentIndex === 0 || repos.length === 0;
  const nextDisabled = repos.length === 0 || currentIndex >= maxIndex;

  const startIndex = currentIndex * slidesToShow;
  const visibleRepos = repos.slice(startIndex, startIndex + slidesToShow);
  const singleSlide = visibleRepos.length <= 1;
  const hasRepos = visibleRepos.length > 0;

  const trackClassName = [
    "carousel-track",
    singleSlide ? "carousel-track--single" : null,
  ]
    .filter(Boolean)
    .join(" ");

  const placeholderMessage =
    status === "loading"
      ? "Loading projects..."
      : status === "error"
      ? "Unable to load projects right now."
      : "Projects coming soon.";

  const handlePrev = () => {
    if (!prevDisabled) {
      setCurrentIndex((index) => Math.max(index - 1, 0));
    }
  };

  const handleNext = () => {
    if (!nextDisabled) {
      setCurrentIndex((index) => Math.min(index + 1, maxIndex));
    }
  };

  return (
    <div className="carousel-container">
      <button
        onClick={handlePrev}
        disabled={prevDisabled}
        className={`arrow-btn arrow-left ${prevDisabled ? "disabled" : ""}`}
        aria-label="View previous projects"
      >
        <img src="/images/arrow-prev.svg" alt="Previous" />
      </button>

      <div className="carousel-track-container">
        <ul
          className={trackClassName}
          ref={trackRef}
          aria-live="polite"
          aria-busy={status === "loading"}
        >
          {hasRepos ? (
            visibleRepos.map((repo) => (
              <li key={repo.id} className="carousel-slide">
                <Card
                  title={repo.name}
                  description={repo.description || "No description available."}
                  url={repo.url}
                  imageUrl={repo.openGraphImageUrl || "/images/download.svg"}
                />
              </li>
            ))
          ) : (
            <li className="carousel-placeholder" role="status">
              <p>
                {placeholderMessage}
                {status === "error" && errorMessage ? (
                  <span className="d-block mt-2">{errorMessage}</span>
                ) : null}
              </p>
            </li>
          )}
        </ul>
      </div>

      <button
        onClick={handleNext}
        disabled={nextDisabled}
        className={`arrow-btn arrow-right ${nextDisabled ? "disabled" : ""}`}
        aria-label="View next projects"
      >
        <img src="/images/arrow-next.svg" alt="Next" />
      </button>
    </div>
  );
};

export default ProjectsCarousel;

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import NavBar from "./components/NavBar";
import NavItem from "./components/NavItem";
import DraggableIcon from "./components/DraggableIcon";
import Image from "./components/Image";
import SocialMedia from "./components/SocialMedia";
import ProjectsCarousel from "./components/ProjectsCarousel";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

gsap.registerPlugin(ScrollToPlugin);

const App: React.FC = () => {
  // Dark mode state (unchanged)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // Responsive state: detect if mobile (width < 768px)
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Modal state for image (used in mobile view)
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [modalImageSrc, setModalImageSrc] = useState<string>("");
  const openModal = (src: string) => {
    setModalImageSrc(src);
    setShowImageModal(true);
  };
  const closeModal = () => setShowImageModal(false);

  // Variables and refs for scroll snapping
  const snapContainerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const isScrolling = useRef(false);
  const currentSectionIndex = useRef(0);

  useEffect(() => {
    const snapContainer = snapContainerRef.current;
    if (!snapContainer) return;
    sectionsRef.current = Array.from(
      document.querySelectorAll(".snap-section")
    );
    snapContainer.style.overflow = "hidden";
    snapContainer.scrollTop = 0;
    const handleWheel = (event: WheelEvent) => {
      if (isScrolling.current) return;
      event.preventDefault();
      if (
        event.deltaY > 0 &&
        currentSectionIndex.current < sectionsRef.current.length - 1
      ) {
        scrollToSection(currentSectionIndex.current + 1);
      } else if (event.deltaY < 0 && currentSectionIndex.current > 0) {
        scrollToSection(currentSectionIndex.current - 1);
      }
    };
    snapContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => snapContainer.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    const snapContainer = snapContainerRef.current;
    if (!snapContainer) return;

    let touchStartY = 0;
    let touchEndY = 0;
    const threshold = 50;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      touchEndY = event.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) > threshold) {
        const activeSection = sectionsRef.current[currentSectionIndex.current];
        const inner =
          activeSection.querySelector<HTMLElement>(".section-content");

        if (inner) {
          const { scrollTop, scrollHeight, clientHeight } = inner;

          // If scrolling down but inner isn’t at its bottom, do normal scroll
          if (deltaY > 0 && scrollTop + clientHeight < scrollHeight) {
            return;
          }
          // If scrolling up but inner isn’t at its top, do normal scroll
          if (deltaY < 0 && scrollTop > 0) {
            return;
          }
        }

        // Otherwise—inner is at boundary—perform the snap
        if (
          deltaY > 0 &&
          currentSectionIndex.current < sectionsRef.current.length - 1
        ) {
          scrollToSection(currentSectionIndex.current + 1);
        } else if (deltaY < 0 && currentSectionIndex.current > 0) {
          scrollToSection(currentSectionIndex.current - 1);
        }
      }
    };

    snapContainer.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    snapContainer.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    return () => {
      snapContainer.removeEventListener("touchstart", handleTouchStart);
      snapContainer.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const scrollToSection = (index: number) => {
    const snapContainer = snapContainerRef.current;
    if (
      !snapContainer ||
      isScrolling.current ||
      index < 0 ||
      index >= sectionsRef.current.length
    )
      return;
    isScrolling.current = true;
    currentSectionIndex.current = index;
    gsap.to(snapContainer, {
      duration: 1,
      scrollTo: { y: sectionsRef.current[index], autoKill: false },
      ease: "power2.out",
      onComplete: () => {
        setTimeout(() => {
          isScrolling.current = false;
        }, 200);
        snapContainer.scrollTop = sectionsRef.current[index].offsetTop;
      },
    });
  };

  const handleNavItemClick = (href: string) => {
    const sectionId = href.startsWith("#") ? href.slice(1) : href;
    const index = sectionsRef.current.findIndex(
      (section) => section.id === sectionId
    );
    if (index !== -1) {
      scrollToSection(index);
    }
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className="vw-100">
      <NavBar
        icon={<DraggableIcon darkMode={darkMode} />}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      >
        <NavItem href="#home" onClick={handleNavItemClick}>
          Home
        </NavItem>
        <NavItem href="#about" onClick={handleNavItemClick}>
          About
        </NavItem>
        <NavItem href="#projects" onClick={handleNavItemClick}>
          Projects
        </NavItem>
        <NavItem href="#contact" onClick={handleNavItemClick}>
          Contact
        </NavItem>
      </NavBar>

      <div ref={snapContainerRef} className="container-fluid snap-container">
        {/* Home Section */}
        <section id="home" className="snap-section">
          <div className="section-content container h-100">
            <div className="row h-100">
              {isMobile ? (
                // Mobile: Text takes full width; image is hidden; add a "View Image" button
                <div className="col-12 d-flex flex-column justify-content-center h-100">
                  <h1>Home</h1>
                  <p>
                    I'm Cameron Cartwright, a{" "}
                    <strong>Software Engineering student</strong> at{" "}
                    <strong>Bournemouth University</strong> passionate about
                    building{" "}
                    <strong>efficient and scalable digital solutions</strong>{" "}
                    using <strong>modern web technologies</strong>. I blend
                    solid academic foundations with{" "}
                    <strong>hands-on experience</strong> to transform innovative
                    ideas into practical applications.
                    <br />
                    <br />
                    In my projects, I've focused on developing{" "}
                    <strong>dynamic web applications</strong> and{" "}
                    <strong>optimizing user experiences</strong>. Whether it's
                    enhancing a digital platform or crafting intuitive
                    interfaces, I'm dedicated to delivering{" "}
                    <strong>high-quality, reliable software</strong>. Explore my
                    portfolio to see my work in action.
                  </p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => openModal("Home.jpg")}
                  >
                    View Image
                  </button>
                </div>
              ) : (
                // Desktop: Two-column layout with image
                <>
                  <div className="col-6 d-flex flex-column justify-content-center h-100">
                    <h1>Home</h1>
                    <p>
                      I'm Cameron Cartwright, a{" "}
                      <strong>Software Engineering student</strong> at{" "}
                      <strong>Bournemouth University</strong> passionate about
                      building{" "}
                      <strong>efficient and scalable digital solutions</strong>{" "}
                      using <strong>modern web technologies</strong>. I blend
                      solid academic foundations with{" "}
                      <strong>hands-on experience</strong> to transform
                      innovative ideas into practical applications.
                      <br />
                      <br />
                      In my projects, I've focused on developing{" "}
                      <strong>dynamic web applications</strong> and{" "}
                      <strong>optimizing user experiences</strong>. Whether it's
                      enhancing a digital platform or crafting intuitive
                      interfaces, I'm dedicated to delivering{" "}
                      <strong>high-quality, reliable software</strong>. Explore
                      my portfolio to see my work in action.
                    </p>
                  </div>
                  <div className="col-6 d-flex align-items-center justify-content-center h-100">
                    <Image href="Home.jpg" alt="Bournemouth University" />
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="snap-section">
          <div className="container h-100">
            <div className="row h-100">
              {isMobile ? (
                // Mobile: full-width text + scroll + button
                <div className="col-12 d-flex flex-column h-100">
                  <h1>About Me</h1>
                  <div
                    className="overflow-auto flex-grow-1"
                    id="about-text"
                    style={{ paddingRight: "1rem" }}
                  >
                    <p>
                      From an early age, I've been deeply fascinated by{" "}
                      <strong>superheroes</strong>, <strong>video games</strong>
                      , and <strong>animation</strong>. One show that
                      particularly captured my imagination was{" "}
                      <strong>Ben 10</strong>, sparking my{" "}
                      <strong>enduring passion for technology</strong>.
                    </p>
                    <p>
                      At the age of <strong>14</strong>, guided by{" "}
                      <strong>online tutorials</strong> and{" "}
                      <strong>curiosity</strong>, I took my first steps into
                      programming. My first significant project was a Discord
                      bot named <strong>Spectre</strong>, built using{" "}
                      <strong>Node.js</strong>. Over six months, I gained{" "}
                      <strong>hands-on experience</strong> with programming
                      fundamentals, administrative tasks, user interactions, and
                      fun API integrations.
                    </p>
                    <p>
                      My journey into programming didn't stop there—it only
                      deepened. I continuously strive to{" "}
                      <strong>expand my technical knowledge</strong>, exploring
                      new technologies and tools. Building this portfolio
                      website offered me the exciting opportunity to learn{" "}
                      <strong>React</strong>, a modern JavaScript framework,
                      along with various other{" "}
                      <strong>cutting-edge technologies</strong>. Creating this
                      site has significantly enhanced my{" "}
                      <strong>technical skills</strong>, and I am eager to
                      continue innovating and growing in the field.
                    </p>
                  </div>
                  <button
                    className="btn btn-secondary mt-3"
                    onClick={() => openModal("AboutMe.jpg")}
                  >
                    View Image
                  </button>
                </div>
              ) : (
                // Desktop: image on left, text on right
                <>
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center h-100">
                    <div
                      className="rounded overflow-hidden"
                      style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                      <Image
                        href="AboutMe.jpg"
                        alt="About Me"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 d-flex flex-column h-100">
                    <h1>About Me</h1>
                    <div
                      className="overflow-auto flex-grow-1"
                      id="about-text"
                      style={{ paddingRight: "1rem" }}
                    >
                      <p>
                        From an early age, I've been deeply fascinated by{" "}
                        <strong>superheroes</strong>,{" "}
                        <strong>video games</strong>, and{" "}
                        <strong>animation</strong>. One show that particularly
                        captured my imagination was <strong>Ben 10</strong>,
                        sparking my{" "}
                        <strong>enduring passion for technology</strong>.
                      </p>
                      <p>
                        At the age of <strong>14</strong>, guided by{" "}
                        <strong>online tutorials</strong> and{" "}
                        <strong>curiosity</strong>, I took my first steps into
                        programming. My first significant project was a Discord
                        bot named <strong>Spectre</strong>, built using{" "}
                        <strong>Node.js</strong>. Over six months, I gained{" "}
                        <strong>hands-on experience</strong> with programming
                        fundamentals, administrative tasks, user interactions,
                        and fun API integrations.
                      </p>
                      <p>
                        My journey into programming didn't stop there—it only
                        deepened. I continuously strive to{" "}
                        <strong>expand my technical knowledge</strong>,
                        exploring new technologies and tools. Building this
                        portfolio website offered me the exciting opportunity to
                        learn <strong>React</strong>, a modern JavaScript
                        framework, along with various other{" "}
                        <strong>cutting-edge technologies</strong>. Creating
                        this site has significantly enhanced my{" "}
                        <strong>technical skills</strong>, and I am eager to
                        continue innovating and growing in the field.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="d-flex justify-content-center align-items-center snap-section"
        >
          <div className="section-content container h-100">
            <ProjectsCarousel />
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="d-flex flex-column justify-content-center align-items-center snap-section"
        >
          <div className="section-content container h-100">
            <SocialMedia />
          </div>
        </section>
      </div>

      {/* Modal for displaying image (mobile only) */}
      {showImageModal && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="container modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative" }}
          >
            <button
              className="modal-close"
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "5px",
                right: "20px",
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "2rem",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
            <Image href={modalImageSrc} alt="Modal Image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

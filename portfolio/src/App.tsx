import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import NavBar from "./components/NavBar";
import NavItem from "./components/NavItem";
import DraggableIcon from "./components/DraggableIcon";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

gsap.registerPlugin(ScrollToPlugin);

const App: React.FC = () => {
  const snapContainerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  let isScrolling = false;
  let currentSectionIndex = 0;

  useEffect(() => {
    const snapContainer = snapContainerRef.current;
    if (!snapContainer) return;

    sectionsRef.current = Array.from(document.querySelectorAll(".snap-section"));

    // ✅ Ensure first section is loaded correctly
    snapContainer.style.overflow = "hidden";
    snapContainer.scrollTop = 0;

    const scrollToSection = (index: number) => {
      if (isScrolling || index < 0 || index >= sectionsRef.current.length) return;

      isScrolling = true;
      currentSectionIndex = index;

      gsap.to(snapContainer, {
        duration: 1.0,
        scrollTo: { y: sectionsRef.current[index], autoKill: false },
        ease: "power2.out",
        onComplete: () => {
          setTimeout(() => {
            isScrolling = false;
          }, 200);
          snapContainer.scrollTop = sectionsRef.current[index].offsetTop;
        },
      });
    };

    const handleWheel = (event: WheelEvent) => {
      if (isScrolling) return;
      event.preventDefault();

      if (event.deltaY > 0 && currentSectionIndex < sectionsRef.current.length - 1) {
        scrollToSection(currentSectionIndex + 1);
      } else if (event.deltaY < 0 && currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1);
      }
    };

    snapContainer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      snapContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="vw-100">
      <NavBar icon={<DraggableIcon />}>
        <NavItem href="#home">Home</NavItem>
        <NavItem href="#about">About</NavItem>
        <NavItem href="#projects">Projects</NavItem>
        <NavItem href="#contact">Contact</NavItem>
      </NavBar>

      {/* Scroll Snapping Sections */}
      <div ref={snapContainerRef} className="container-fluid vh-100 snap-container">
        <section id="home" className="vh-100 d-flex justify-content-center align-items-center snap-section">
          <h1>Home</h1>
        </section>
        <section id="about" className="vh-100 d-flex justify-content-center align-items-center snap-section">
          <h1>About</h1>
        </section>
        <section id="projects" className="vh-100 d-flex justify-content-center align-items-center snap-section">
          <h1>Projects</h1>
        </section>
        <section id="contact" className="vh-100 d-flex justify-content-center align-items-center snap-section">
          <h1>Contact</h1>
        </section>
      </div>
    </div>
  );
};

export default App;

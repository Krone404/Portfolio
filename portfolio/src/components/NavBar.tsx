// NavBar.tsx
import React, { ReactNode } from "react";

interface NavBarProps {
  icon: JSX.Element;
  children?: ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ icon, children, darkMode, toggleDarkMode }) => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        {/* Draggable Icon (Logo or Brand) */}
        <a className="navbar-brand" href="#">
          {icon}
        </a>

        {/* Collapsible Navbar Button for Small Screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {children}
          </ul>
          {/* Dark Mode Toggle Button on the Right */}
          <div className="d-flex align-items-center ms-auto">
            <button className="btn btn-link" onClick={toggleDarkMode}>
              <img
                className="toggle-dark-mode"
                src={darkMode ? "/images/light-mode-svgrepo-com.svg" : "/images/moon-svgrepo-com.svg"}
                alt="Toggle Dark Mode"
                style={{ width: "30px", height: "30px" }}
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

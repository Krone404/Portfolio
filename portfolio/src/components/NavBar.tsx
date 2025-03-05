import React, { ReactNode } from "react";

interface NavBarProps {
  icon: JSX.Element;
  children?: ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ icon, children }) => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-white">
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
          <ul className="navbar-nav">{children}</ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

import React, { ReactNode, useRef, useEffect } from "react";
import gsap from "gsap";

interface NavItemProps {
  children: ReactNode;
  href?: string;
  onClick?: (href: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ children, href = "#", onClick }) => {
  // Use the li element for GSAP animations
  const liRef = useRef<HTMLLIElement>(null);

  // Set initial offset (matches --d value in CSS)
  useEffect(() => {
    if (liRef.current) {
      gsap.set(liRef.current, { x: 5, y: 5 });
    }
  }, []);

  const handleMouseEnter = () => {
    if (liRef.current) {
      gsap.to(liRef.current, {
        duration: 0.3,
        x: 0,
        y: 0,
        scale: 1.05,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (liRef.current) {
      gsap.to(liRef.current, {
        duration: 0.3,
        x: 5,
        y: 5,
        scale: 1,
        ease: "power2.inOut",
      });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick(href);
    }
  };

  return (
    <li
      ref={liRef}
      className="nav-item nav-hover-effect ms-5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a className="nav-link" href={href} onClick={handleClick}>
        {children}
      </a>
    </li>
  );
};

export default NavItem;

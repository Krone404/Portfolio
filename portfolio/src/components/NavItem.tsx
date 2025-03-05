import React, { ReactNode } from "react";

interface NavItemProps {
  children: ReactNode;
  href?: string;
}

const NavItem: React.FC<NavItemProps> = ({ children, href = "#" }) => {
  return (
    <li className="nav-item">
      <a className="nav-link" href={href}>
        {children}
      </a>
    </li>
  );
};

export default NavItem;

interface Props {
  children: string;
  onClick: () => void;
}

const NavItem = ({ children, onClick }: Props) => {
  return (
    <button className="navbar-item" onClick={onClick}>
      {children}
    </button>
  );
};
export default NavItem;

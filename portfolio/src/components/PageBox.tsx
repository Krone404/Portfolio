interface Props {
  title: string;
  children: string;
}

const PageBox = ({ title, children }: Props) => {
  return (
    <div id={(title.toLowerCase()).replace(" ", "-")} className="container mx-auto pageBox">
      <h1>{title}</h1>
      <div>{children}</div>
    </div>
  );
};
export default PageBox;

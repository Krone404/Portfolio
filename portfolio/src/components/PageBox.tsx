import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

const PageBox = ({ title, children }: Props) => {
  return (
    <div
      id={title.toLowerCase().replace(" ", "-")}
      className="container mx-auto pageBox"
    >
      <div>{children}</div>
    </div>
  );
};

export default PageBox;

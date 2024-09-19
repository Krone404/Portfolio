import { ReactNode } from "react";

interface Props {
    title: string,
    link: string,
    description: string,
    date: string
  }
  
  const ProjectCard = ({ title, link, description, date }: Props) => {
    return (
        <div>
            <a href={link}>
                <h3>{title}</h3>
                <p>{description}</p>
                <time dateTime={date}>{date}</time>
            </a>
        </div>
    );
  };
  
  export default ProjectCard;
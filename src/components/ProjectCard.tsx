import {Project} from "@/pages/api/gallery";
import Image from "next/image"

interface CardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  project: Project;
}

export default function ProjectCard({ project }: CardProps) {
  return (
    <div className={"container rounded-lg flex flex-col justify-center items-center w-auto h-auto bg-rose-200"}>
      <h2 className={"stroke-1 text-3xl "}>{project.name}</h2>
      <p>{project.description}</p>
      <Image src={project.imageURL || "/orph_confuzzled.png"} alt={`${project.name} image`} width={600} height={400}></Image>
    </div>
  );
}

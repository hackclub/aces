import {Project} from "@/pages/api/gallery";
import Image  from "next/image"

interface CardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  project: Project;
}

export default function ProjectCard({ project }: CardProps) {
  return (
    <div className="w-full bg-white md:px-7 px-5 py-8 rounded-xl">
      <h1 className="text-4xl font-bold text-center mb-5 text-indigo-500">
	      {project.name}
      </h1>
	    <Image
		    src={project.imageURL!}
		    alt={"Project " + project.name}
		    width={600}
		    height={400}
	    />
      <p className="md:text-lg text-md text-indigo-800">{project.description}</p>
    </div>
  );
}

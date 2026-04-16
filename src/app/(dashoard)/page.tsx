import ProjectsList from "./_components/projects-list";

export default function Home() {
  return (
    <div className="h-full flex flex-col flex-1 items-center  justify-center">
      <div>
        <ProjectsList />
      </div>
    </div>
  );
}

import ProjectsContainer from "./_components/projects-container";

export default function Home() {
  return (
    <div className=" flex flex-col  flex-1 items-center  justify-center py-28 md:py-20 lg:py-18  ">
      <div>
        <ProjectsContainer />
      </div>
    </div>
  );
}

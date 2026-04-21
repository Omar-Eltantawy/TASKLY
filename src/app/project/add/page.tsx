import Button from "@/shared/ui/button";
import addMemberIcon from "../../../../public/icons/add-member.svg";
import TipIcon from "../../../../public/icons/tip.svg";
import Image from "next/image";
import AddProjectForm from "./_components/add-project-form";

export default function page() {
  return (
    <div>
      <div className="hidden md:flex items-center justify-between mb-5 -mt-5">
        <h1 className="text-[2.3rem] font-semibold">Add New project</h1>
        <Button className="flex items-center gap-2 text-sm">
          <Image src={addMemberIcon} alt="add member" width={16} height={16} />
          Add New Member
        </Button>
      </div>
      <AddProjectForm />
      <div className="bg-[#F1F3FF] text-slate-medium w-full sm:w-1/2 lg:w-[55%] mx-auto mb-10 text-xs py-5  flex flex-col md:flex-row md:items-center justify-center">
        <Image
          src={TipIcon}
          alt="pro tip"
          width={12}
          height={12}
          className="hidden md:block"
        />
        <span className="font-bold"> Pro Tip :</span> You can invite project
        members and assign epics immediately after the initial creation process.
      </div>
    </div>
  );
}

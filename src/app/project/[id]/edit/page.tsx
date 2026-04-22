import Button from "@/shared/ui/button";
import EditFormContainer from "./_components/edit-form-container";
import addMemberIcon from "../../../../../public/icons/add-member.svg";
import Image from "next/image";

export default async function EditProjectPage() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="hidden md:flex items-center justify-between mb-5 shrink-0">
        <h1 className="text-[2.3rem] font-semibold">Edit Project</h1>
        <Button className="flex items-center gap-2 text-sm">
          <Image src={addMemberIcon} alt="add member" width={16} height={16} />
          Add New Member
        </Button>
      </div>
      <EditFormContainer />
    </div>
  );
}

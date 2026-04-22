import Button from "@/shared/ui/button";
import Image from "next/image";
import addMemberIcon from "../../../../../public/icons/add-member.svg";
import MembersContainer from "./_components/members-container";

export default function page() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-5 shrink-0">
        <h1 className="text-[2.3rem] font-semibold">Project Members</h1>
        <Button className="hidden md:flex items-center gap-2 text-sm">
          <Image src={addMemberIcon} alt="add member" width={16} height={16} />
          Add New Member
        </Button>
      </div>
      <MembersContainer />
      <Button className="w-10 h-10 ms-auto p-0 flex md:hidden items-center justify-center mt-10">
        <Image src={addMemberIcon} alt="add member" width={20} height={20} />
      </Button>
    </div>
  );
}

import Button from "@/shared/ui/button";
import Image from "next/image";
import Link from "next/link";
import AddIcon from "../../../../../../public/icons/add.svg";
import NoEpicsImage from "../../../../../../public/images/no-epics.png";
export default function NoEpics() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <Image src={NoEpicsImage} alt="no-epics" width={250} height={250} />
      <div className="text-center -mt-10 ">
        <h2 className="text-[2.3rem] font-semibold">
          No epics in this project yet.
        </h2>
        <p className="text-lg text-center text-[#434654] max-w-md font-normal">
          Break down your large project into manageable epics to track progress
          better and maintain architectural clarity.
        </p>
      </div>
      <Button className="w-3/4 mt-5">
        <Link
          href="/project/add-new-project"
          className="flex items-center justify-center gap-3"
        >
          <Image src={AddIcon} alt="plus" width={16} height={16} />
          Create New Project
        </Link>
      </Button>
    </div>
  );
}

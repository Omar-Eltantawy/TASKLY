import Button from "@/shared/ui/button";
import Image from "next/image";
import addEpicIcon from "../../../../../public/icons/add.svg";
import Link from "next/link";
import EpicsContainer from "./_components/epics-container";
import EpicsSearch from "./_components/epics-search";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="hidden md:block text-[2.3rem] font-semibold">
          Project Epics
        </h1>
        <div className="flex items-center justify-center text-center mx-auto md:mx-0 gap-2">
          <EpicsSearch projectId={id} />
          <Link href={`/project/${id}/epics/new`} className="hidden md:block">
            <Button className="flex items-center gap-2 text-sm">
              <Image src={addEpicIcon} alt="add epic" width={16} height={16} />
              New Epic
            </Button>
          </Link>
        </div>
      </div>
      <EpicsContainer projectId={id} />
    </div>
  );
}

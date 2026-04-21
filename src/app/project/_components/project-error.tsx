import Image from "next/image";
import ErrorIcon from "../../../../public/icons/error.svg";
import Button from "@/shared/ui/button";
export default function ProjectError() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 mt-40">
      <div className="bg-[#FFDAD6] w-16 h-16 rounded-md flex items-center justify-center">
        <Image src={ErrorIcon} alt="error" width={20} height={20} />
      </div>
      <div className="text-center space-y-2">
        <h6 className="font-bold text-xl">Something went wrong</h6>
        <p className="text-[1rem] text-[#434654] max-w-77 ">
          We&apos;re having trouble retrieving your <br /> projects right now.
          Please try <br /> again in a moment.
        </p>
      </div>
      <Button>Retry Connection</Button>
    </div>
  );
}

import Button from "@/shared/ui/button";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      Active Project Tasks
      <Link href={`/project/${id}/tasks/new`}>
        <Button>Add New Task </Button>
      </Link>
    </div>
  );
}

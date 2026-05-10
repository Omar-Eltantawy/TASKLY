import AcceptInvitationClient from "./_components/accept-invitation-client";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return (
    <div>
      <main className="min-h-screen flex items-center justify-center bg-surface-low p-4">
        <AcceptInvitationClient token={token} />
      </main>
    </div>
  );
}

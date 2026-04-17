import { Suspense } from "react";
import ResetPasswordForm from "./_components/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center ">
      <Suspense fallback={<p>Loading...</p>}>
        <ResetPasswordForm />{" "}
      </Suspense>
    </div>
  );
}

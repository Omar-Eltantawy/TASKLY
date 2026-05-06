"use client";

import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  inviteMemberSchema,
  InviteMemberFields,
} from "@/shared/lib/schemes/member.schema";
import { inviteMemberAction } from "@/shared/lib/actions/invite-member.action";
import Input from "@/shared/ui/input";
import Button from "@/shared/ui/button";

type Props = {
  projectId: string;
  onSuccess: () => void;
};

export default function InviteForm({ projectId, onSuccess }: Props) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<InviteMemberFields>({
    defaultValues: { email: "" },
    resolver: zodResolver(inviteMemberSchema),
  });

  const onSubmit: SubmitHandler<InviteMemberFields> = async (values) => {
    setServerError(null);
    setSuccessMessage(null);

    const result = await inviteMemberAction(values.email, projectId);

    if (!result.success) {
      setServerError(result.error);
      return;
    }

    setSuccessMessage("Invitation sent successfully!");
    form.reset();

    setTimeout(onSuccess, 1500);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      {/* Server error */}
      {serverError && (
        <div className="mb-4 px-4 py-3 rounded-sm bg-[#FFDAD6] text-error text-sm">
          {serverError}
        </div>
      )}

      {/* Success message */}
      {successMessage && (
        <div className="mb-4 px-4 py-3 rounded-sm bg-green-50 text-green-700 text-sm">
          {successMessage}
        </div>
      )}

      <Controller
        control={form.control}
        name="email"
        render={({ field }) => (
          <Input
            label="Email Address"
            type="email"
            className="w-full"
            placeholder="colleague@company.com"
            error={form.formState.errors.email}
            {...field}
          />
        )}
      />

      <div className="flex gap-3 mt-6">
        <Button
          variant="ghost"
          disabled={form.formState.isSubmitting}
          className="flex-1"
          onClick={onSuccess}
        >
          cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={form.formState.isSubmitting}
          className="flex-1"
        >
          {form.formState.isSubmitting ? "Sending..." : "Send Invitation"}
        </Button>
      </div>
    </form>
  );
}

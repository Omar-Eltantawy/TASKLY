"use client";

import {
  ResetPasswordFields,
  resetPasswordSchema,
} from "@/shared/lib/schemes/auth.schema";
import Input from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PasswordRules from "../../_components/password-rules";
import Button from "@/shared/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { resetPasswordAction } from "@/shared/lib/actions/reset-password.action";
import { Toast } from "@/shared/ui/toast";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [showToast, setShowToast] = useState<boolean>(false);
  const params = useSearchParams();
  const token = params.get("token");

  const form = useForm<ResetPasswordFields>({
    defaultValues: { Password: "", ConfirmPassword: "" },
    resolver: zodResolver(resetPasswordSchema),
  });

  if (!token) {
    return <p>Invalid or expired reset link.</p>;
  }

  console.log(token);

  const onSubmit: SubmitHandler<ResetPasswordFields> = async (values) => {
    const result = await resetPasswordAction(
      { password: values.Password },
      token,
    );

    if ("error_code" in result) {
      form.setError("root", { message: result.msg });
      return;
    }

    setShowToast(true);

    setTimeout(() => {
      router.replace("/login");
    }, 3000);
  };

  const passwordValue = form.watch("Password");
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full sm:w-1/2 lg:w-[35%] p-12 bg-white shadow-[0_48px_24px_0_#041B3C0F]"
    >
      {showToast && (
        <Toast
          type="success"
          message="Your password has been updated successfully. You can now log in"
        />
      )}
      {/* Heading */}
      <div className="text-center md:text-left mb-10">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
          Create a New Password
        </h1>
        <p className="text-slate-medium text-body-md">
          Create a new, strong password to secure your workstation access.{" "}
        </p>
      </div>

      {/* Password */}
      <Controller
        control={form.control}
        name="Password"
        render={({ field }) => (
          <Input
            type="password"
            label="New Password"
            placeholder="Minimum 8 characters"
            error={form.formState.errors.Password}
            {...field}
          />
        )}
      />
      <Controller
        control={form.control}
        name="ConfirmPassword"
        render={({ field }) => (
          <Input
            type="password"
            label="Confirm Password"
            placeholder="Minimum 8 characters"
            error={form.formState.errors.ConfirmPassword}
            {...field}
          />
        )}
      />
      {passwordValue && <PasswordRules password={passwordValue} />}

      <Button
        disabled={form.formState.isSubmitting}
        type="submit"
        variant="primary"
        className="w-full"
      >
        {form.formState.isSubmitting ? "Sending..." : "Send Reset Link"}
      </Button>

      {form.formState.errors.root && (
        <div className="mb-6 mt-6 px-4 py-3 text-center rounded-sm bg-[#FFDAD6] text-error text-sm">
          {form.formState.errors.root.message}
        </div>
      )}
      <Link
        href="/login"
        className="flex items-center justify-center gap-2 text-primary text-sm font-medium mt-6 cursor-pointer "
      >
        Back to sign in
      </Link>
    </form>
  );
}

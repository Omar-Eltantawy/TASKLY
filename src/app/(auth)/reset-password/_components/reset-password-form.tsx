"use client";

import {
  ResetPasswordFields,
  resetPasswordSchema,
} from "@/shared/lib/schemes/auth.schema";
import Input from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PasswordRules from "../../_components/password-rules";
import Button from "@/shared/ui/button";
import Link from "next/link";

export default function ResetPasswordForm() {
  const form = useForm<ResetPasswordFields>({
    defaultValues: { Password: "", ConfirmPassword: "" },
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordFields> = async (values) => {
    console.log(values);
  };

  const passwordValue = form.watch("Password");
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full sm:w-1/2 lg:w-[35%] p-12 bg-white shadow-[0_48px_24px_0_#041B3C0F]"
    >
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
        name="Password"
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

      <Link
        href="/login"
        className="flex items-center justify-center gap-2 text-primary text-sm font-medium mt-6 cursor-pointer "
      >
        Back to sign in
      </Link>
    </form>
  );
}

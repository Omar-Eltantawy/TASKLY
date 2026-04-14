"use client";

import { SignupFields, signupSchema } from "@/shared/lib/schemes/auth.schema";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/shared/ui/input";
import Button from "@/shared/ui/button";
import PasswordRules from "../../_components/password-rules";
import { signupAction } from "@/shared/lib/actions/signup.action";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupForm() {
  const router = useRouter();
  //Form
  const form = useForm<SignupFields>({
    defaultValues: {
      Name: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      JobTitle: "",
    },
    resolver: zodResolver(signupSchema),
  });
  const onSubmit: SubmitHandler<SignupFields> = async (values) => {
    const payload = {
      email: values.Email,
      password: values.Password,
      data: {
        name: values.Name,
        department: values.JobTitle,
      },
    };

    const result = await signupAction(payload);

    if ("error_code" in result) {
      form.setError("Email", {
        message: "A user with this email already exists.",
      });
    } else if ("user" in result) {
      router.push("/login");
    }
  };
  const passwordValue = form.watch("Password");
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full sm:w-1/2 lg:w-[35%] p-12 bg-white shadow-[0_48px_24px_0_#041B3C0F]"
    >
      {/* Heading */}
      <div className="text-left md:text-center mb-10">
        <h1 className="text-xl md:text-2xl lg:text-3xl w-full font-semibold ">
          Create your workspace
        </h1>
        <p className="text-slate-medium text-body-md">
          Join the editorial approach to task management.
        </p>
      </div>
      {/* Name Input */}
      <Controller
        control={form.control}
        name="Name"
        render={({ field }) => (
          <Input
            label="Name"
            placeholder="Enter Your full name"
            error={form.formState.errors.Name}
            {...field}
          />
        )}
      />

      {/* Email Input */}
      <Controller
        control={form.control}
        name="Email"
        render={({ field }) => (
          <Input
            label="Email"
            placeholder="yourname@company.com"
            error={form.formState.errors.Email}
            {...field}
          />
        )}
      />

      {/* Name Input */}
      <Controller
        control={form.control}
        name="JobTitle"
        render={({ field }) => (
          <Input
            label="Job Title"
            placeholder="e.g. Project manager"
            error={form.formState.errors.JobTitle}
            {...field}
          />
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Password */}
        <Controller
          control={form.control}
          name="Password"
          render={({ field }) => (
            <Input
              type="password"
              label="Password"
              placeholder="Minimum 8 characters"
              error={form.formState.errors.Password}
              {...field}
            />
          )}
        />
        {/* Confirm Password */}
        <Controller
          control={form.control}
          name="ConfirmPassword"
          render={({ field }) => (
            <Input
              type="password"
              label="Confirm password"
              placeholder="Repeat your password"
              error={form.formState.errors.ConfirmPassword}
              {...field}
            />
          )}
        />
      </div>
      {passwordValue && <PasswordRules password={passwordValue} />}
      <Button
        disabled={form.formState.isSubmitting}
        type="submit"
        variant="primary"
        className="w-full"
      >
        {form.formState.isSubmitting ? "Creating Account..." : "Submit"}
      </Button>

      <p className="text-center text-slate-medium mt-12">
        Already have an account?
        <Link
          href="/login"
          className="text-primary font-semibold hover:underline ml-1"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}

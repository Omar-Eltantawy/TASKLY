"use client";
import { loginAction } from "@/shared/lib/actions/login.action";
import { LoginFielsds, loginSchema } from "@/shared/lib/schemes/auth.schema";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function LoginForm() {
  const form = useForm<LoginFielsds>({
    defaultValues: {
      Email: "",
      Password: "",
      RememberMe: false,
    },
    resolver: zodResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<LoginFielsds> = async (values) => {
    const payload = {
      email: values.Email,
      password: values.Password,
    };

    const result = await loginAction(payload, values.RememberMe ?? false);

    if ("error_code" in result) {
      form.setError("root", {
        message: "Invalid email or password",
      });
      return;
    }

    window.location.replace("/project");
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full sm:w-1/2 lg:w-[35%] p-12 bg-white shadow-[0_48px_24px_0_#041B3C0F]"
    >
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-xl md:text-2xl lg:text-3xl w-full font-semibold ">
          Welcome Back
        </h1>
        <p className="text-slate-medium text-body-md">
          Please enter your details to access your workspace
        </p>
      </div>
      {/* Email Input */}
      <Controller
        control={form.control}
        name="Email"
        render={({ field }) => (
          <Input
            className="w-full"
            label="Email"
            placeholder="yourname@company.com"
            error={form.formState.errors.Email}
            {...field}
          />
        )}
      />

      {/* Password */}
      <div className="relative">
        <Controller
          control={form.control}
          name="Password"
          render={({ field }) => (
            <Input
              className="w-full"
              type="password"
              label="Password"
              placeholder="Minimum 8 characters"
              error={form.formState.errors.Password}
              {...field}
            />
          )}
        />
        <Link
          href={"/forgot-password"}
          className="text-primary text-xs font-semibold hover:underline transition-all absolute right-0 top-1.5 -translate-y-1/2  inline-block md:hidden"
        >
          Forgot?
        </Link>
      </div>
      <div className="flex  items-center justify-between mb-6">
        <Controller
          control={form.control}
          name="RememberMe"
          render={({ field }) => (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
              <span className="text-sm text-slate-dark">Remember me</span>
            </label>
          )}
        />

        <Link
          href={"/forgot-password"}
          className="text-primary font-semibold hover:underline transition-all hidden md:inline-block"
        >
          Forgot password?
        </Link>
      </div>
      {form.formState.errors.root && (
        <div className="mb-6 px-4 py-3 text-center rounded-sm bg-[#FFDAD6] text-error text-sm">
          {form.formState.errors.root.message}
        </div>
      )}
      <Button
        disabled={form.formState.isSubmitting}
        type="submit"
        variant="primary"
        className="w-full"
      >
        {form.formState.isSubmitting ? "Loading..." : "Login"}
      </Button>

      <p className="text-center text-slate-medium mt-12">
        Don&apos;t have an account?
        <Link
          href="/signup"
          className="text-primary font-semibold hover:underline ml-1"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}

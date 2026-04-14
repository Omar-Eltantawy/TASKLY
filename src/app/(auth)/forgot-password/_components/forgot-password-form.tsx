"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  ForgotPasswordFields,
  forgotPasswordSchema,
} from "@/shared/lib/schemes/auth.schema";
import Input from "@/shared/ui/input";
import Button from "@/shared/ui/button";
import { forgotPasswordAction } from "@/shared/lib/actions/forgot-password.action";
import arrowIcon from "../../../../../public/icons/arrow.svg";
import checkedIcon from "../../../../../public/icons/checked.svg";
import counterIcon from "../../../../../public/icons/counter.svg";
import Image from "next/image";
import { useCountDown } from "@/shared/lib/hooks/use-count-down";
import { useState } from "react";

const RESEND_COOLDOWN = 60 * 5;
const MAX_TRIALS = 3;

export default function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  const { seconds, reset } = useCountDown(RESEND_COOLDOWN);
  const [trials, setTrials] = useState(MAX_TRIALS);
  const [showMessage, setShowMessage] = useState(false);

  const form = useForm<ForgotPasswordFields>({
    defaultValues: { Email: "" },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const onSubmit: SubmitHandler<ForgotPasswordFields> = async (values) => {
    if (trials <= 0) {
      setShowMessage(true);
      return;
    } else {
      await forgotPasswordAction({ email: values.Email });
      setSubmitted(true);
      setTrials((prev) => prev - 1);
      reset();
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full sm:w-1/2 lg:w-[35%] p-12 bg-white shadow-[0_48px_24px_0_#041B3C0F]"
    >
      {/* Heading */}
      <div className="text-center md:text-left mb-10">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
          Forgot Password?
        </h1>
        <p className="text-slate-medium text-body-md">
          No worries, we&apos;ll send you reset instructions.{" "}
        </p>
      </div>
      <Controller
        control={form.control}
        name="Email"
        render={({ field }) => (
          <Input
            label="Email address"
            placeholder="yourname@company.com"
            error={form.formState.errors.Email}
            {...field}
          />
        )}
      />

      <Button
        disabled={submitted && seconds > 0}
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
        <Image src={arrowIcon} alt="arrow" width={16} height={16} />
        <span>Back to login</span>
      </Link>

      {submitted && seconds > 0 && (
        <>
          <div className="flex flex-col md:flex-row text-[#005235] bg-[#82F9BE33] text-sm font-normal rounded-md p-4 mt-6">
            <div className="flex items-start gap-2 ">
              <Image src={checkedIcon} alt="checked" width={16} height={16} />
              <span className="-mt-1">
                If an account exists with this email, we’ve sent a password
                reset link.
              </span>
            </div>
            <div className="flex md:hidden items-center justify-between border-t pt-3 w-full">
              <span className="text-[#00523599] font-bold uppercase  text-[10px]  ">
                Did not receive the email?
              </span>

              <span className="text-primary font-bold text-[10px] ">
                Resend in {formatTime(seconds)}
              </span>
            </div>
          </div>

          <span className="hidden md:flex items-center justify-center gap-2 text-[#434654] uppercase text-center text-xs font-bold  mt-6">
            Did not receive the email?
          </span>

          <div className="hidden md:flex items-center justify-center text-[16px] gap-3 text-[#737685] bg-[#F1F3FF]  font-semibold rounded-md p-4 mt-6 ">
            <Image src={counterIcon} alt="counter" width={16} height={16} />
            <span>Resend in {formatTime(seconds)}</span>
          </div>
        </>
      )}
      {showMessage && (
        <p className="text-[#FF4D4F] bg-[#FFEDED]  font-semibold rounded-md p-4 mt-6 text-center flex items-center justify-center text-[16px] gap-3">
          You have reached the maximum number of attempts. Please try again
          later.
        </p>
      )}
    </form>
  );
}

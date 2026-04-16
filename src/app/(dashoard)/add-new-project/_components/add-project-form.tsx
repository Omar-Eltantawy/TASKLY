"use client";

import { addProjectAction } from "@/shared/lib/actions/add-project.action";
import {
  AddProjectFields,
  addProjectSchema,
} from "@/shared/lib/schemes/project.schema";
import Button from "@/shared/ui/button";
import Icon from "@/shared/ui/icon";
import Input from "@/shared/ui/input";
import Textarea from "@/shared/ui/textare";
import { Toast } from "@/shared/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function AddProjectForm() {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const form = useForm<AddProjectFields>({
    defaultValues: { name: "", description: "" },
    resolver: zodResolver(addProjectSchema),
  });
  const descriptionValue = form.watch("description") ?? "";

  const onSubmit: SubmitHandler<AddProjectFields> = async (values) => {
    const result = await addProjectAction({
      name: values.name,
      description: values.description || undefined,
    });
    if (!result.success) {
      showToast(`Failed to create project: ${result.error}`, "error");
      return;
    }
    form.reset();
    showToast("Project created successfully.", "success");
  };
  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:w-1/2 lg:w-[55%] mx-auto p-6 md:p-12 bg-white shadow-[0_48px_24px_0_#041B3C0F] "
      >
        <div className="flex items-end  justify-start gap-4 border-b border-[#F1F3FF] pt-0 pb-2 mb-2">
          <Icon name="new-project" parentClassName="hidden lg:block" />
          <div className="">
            <h2 className="text-2xl font-semibold">Initialize New Project</h2>
            <p className="text-sm font-normal text-slate-medium">
              Define the scope and foundational details of your project.
            </p>
          </div>
        </div>
        {/* Project title */}
        <Controller
          control={form.control}
          name="name"
          render={({ field }) => (
            <Input
              label="Project Title"
              placeholder="Enter your project name"
              error={form.formState.errors.name}
              {...field}
            />
          )}
        />

        {/* Description */}
        <Controller
          control={form.control}
          name="description"
          render={({ field }) => (
            <Textarea
              label="Description"
              placeholder="Provide a high-level overview of the project's architectural objectives and key milestones..."
              error={form.formState.errors.description}
              maxLength={500}
              currentLength={descriptionValue.length}
              {...field}
            />
          )}
        />

        <div className="flex flex-col sm:flex-row justify-between gap-3 ">
          <Button
            type="button"
            variant="ghost"
            onClick={() => form.reset()}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={form.formState.isSubmitting}
            className="w-full sm:w-auto order-1 md:order-2"
          >
            {form.formState.isSubmitting ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </form>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}

"use client";

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
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { fetchProjects } from "@/store/features/projects/slice";
import { updateProjectAction } from "@/shared/lib/actions/update-project.action";

type Props = {
  projectId: string;
  defaultName: string;
  defaultDescription: string;
};

export default function EditProjectForm({
  projectId,
  defaultName,
  defaultDescription,
}: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const form = useForm<AddProjectFields>({
    defaultValues: {
      name: defaultName,
      description: defaultDescription,
    },
    resolver: zodResolver(addProjectSchema),
  });

  const descriptionValue = form.watch("description") ?? "";

  const onSubmit: SubmitHandler<AddProjectFields> = async (values) => {
    const result = await updateProjectAction(projectId, {
      name: values.name,
      description: values.description || undefined,
    });

    if (!result.success) {
      showToast(`Failed to update project: ${result.error}`, "error");
      return;
    }

    dispatch(fetchProjects(1));
    showToast("Project updated successfully.", "success");
    setTimeout(() => router.push("/project"), 1500);
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:w-1/2 lg:w-[55%] mx-auto p-6 md:p-12 bg-white shadow-[0_48px_24px_0_#041B3C0F] -mt-5"
      >
        <div className="flex items-end justify-start gap-4 border-b border-[#F1F3FF] pt-0 pb-2 mb-2">
          <Icon name="new-project" parentClassName="hidden lg:block" />
          <div>
            <h2 className="text-2xl font-semibold">Edit Project</h2>
            <p className="text-sm font-normal text-slate-medium">
              Update the details of your project.
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
              placeholder="Provide a high-level overview..."
              error={form.formState.errors.description}
              maxLength={500}
              currentLength={descriptionValue.length}
              {...field}
            />
          )}
        />

        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push("/project")}
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
            {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}

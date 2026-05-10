"use client";

import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  addEpicSchema,
  AddEpicFields,
} from "@/shared/lib/schemes/project.schema";
import { addEpicAction } from "@/shared/lib/actions/add-new-epic.action";
import { ProjectMember } from "@/shared/lib/types/project";
import Input from "@/shared/ui/input";
import Textarea from "@/shared/ui/textare";
import Button from "@/shared/ui/button";
import { Toast } from "@/shared/ui/toast";
import Icon from "@/shared/ui/icon";

type Props = {
  projectId: string;
  members: ProjectMember[];
};

export default function NewEpicForm({ projectId, members }: Props) {
  const router = useRouter();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const form = useForm<AddEpicFields>({
    defaultValues: {
      title: "",
      description: "",
      assignee_id: "",
      deadline: "",
    },
    resolver: zodResolver(addEpicSchema),
  });

  const descriptionValue = form.watch("description") ?? "";

  const today = new Date().toISOString().split("T")[0];

  const onSubmit: SubmitHandler<AddEpicFields> = async (values) => {
    const result = await addEpicAction({
      title: values.title,
      project_id: projectId,
      description: values.description || undefined,
      assignee_id: values.assignee_id || undefined,
      deadline: values.deadline || undefined,
    });

    if (!result.success) {
      showToast(`Failed to create epic: ${result.error}`, "error");
      return;
    }

    form.reset();
    showToast("Epic created successfully.", "success");
    setTimeout(() => router.push(`/project/${projectId}/epics`), 1500);
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:w-1/2 lg:w-[55%] mx-auto mb-20 lg:mb-4 px-12 py-3
          bg-white shadow-[0_48px_24px_0_#041B3C0F]"
      >
        {/* Header */}
        <div className="flex items-end justify-start gap-4 border-b border-[#F1F3FF] pt-0 pb-2 mb-6">
          <Icon name="new-project" parentClassName="hidden lg:block" />
          <div>
            <h2 className="text-2xl font-semibold">Create New Epic</h2>
            <p className="text-sm font-normal text-slate-medium">
              Define a high-level goal or milestone for your project.
            </p>
          </div>
        </div>

        {/* Title */}
        <Controller
          control={form.control}
          name="title"
          render={({ field }) => (
            <Input
              className="w-full"
              label="Epic Title"
              placeholder="e.g. Structural Foundation Phase"
              error={form.formState.errors.title}
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
              placeholder="Describe the scope and objectives of this epic..."
              error={form.formState.errors.description}
              maxLength={500}
              currentLength={descriptionValue.length}
              {...field}
            />
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Assignee */}
          <Controller
            control={form.control}
            name="assignee_id"
            render={({ field }) => (
              <div className="flex flex-col mb-6">
                <label className="text-[.625rem] uppercase font-bold mb-1.5 text-[#737685]">
                  Assignee
                </label>

                <select
                  {...field}
                  className="outline-none text-sm font-normal px-4 py-3 rounded-sm bg-surface-highest text-[#6B7280] cursor-pointer"
                >
                  <option value="">Unassigned</option>
                  {members.map((member) => (
                    <option key={member.user_id} value={member.user_id}>
                      {member.metadata.name} — {member.role}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />

          {/* Deadline */}
          <Controller
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <div className="flex flex-col mb-6">
                <label className="text-[.625rem] uppercase font-bold mb-1.5 text-[#737685]">
                  Deadline
                </label>

                <input
                  type="date"
                  min={today}
                  {...field}
                  className="outline-none text-sm font-normal px-4 py-3 rounded-sm
        bg-surface-highest text-[#6B7280] cursor-pointer"
                />

                {form.formState.errors.deadline && (
                  <span className="text-error text-[.625rem] mt-1.5">
                    {form.formState.errors.deadline.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push(`/project/${projectId}/epics`)}
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
            {form.formState.isSubmitting ? "Creating..." : "Create Epic"}
          </Button>
        </div>
      </form>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}

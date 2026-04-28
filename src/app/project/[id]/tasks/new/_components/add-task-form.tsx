"use client";

import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Epic } from "@/shared/lib/types/epic";
import { ProjectMember } from "@/shared/lib/types/project";
import Input from "@/shared/ui/input";
import Textarea from "@/shared/ui/textare";
import Button from "@/shared/ui/button";
import { Toast } from "@/shared/ui/toast";
import { AddTaskFields, addTaskSchema } from "@/shared/lib/schemes/task.schema";
import { addNewTaskAction } from "@/shared/lib/actions/add-new-task.action";
import { STATUS_LABELS, TASK_STATUSES } from "@/shared/lib/constants/constants";

type Props = {
  projectId: string;
  epics: Epic[];
  members: ProjectMember[];
  defaultEpicId?: string;
};

export default function AddTaskForm({
  projectId,
  epics,
  members,
  defaultEpicId,
}: Props) {
  const router = useRouter();

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  const form = useForm<AddTaskFields>({
    defaultValues: {
      title: "",
      description: "",
      epic_id: defaultEpicId,
      assignee_id: "",
      due_date: "",
      status: "TO_DO",
    },
    resolver: zodResolver(addTaskSchema),
  });

  const descriptionValue = form.watch("description") ?? "";

  const onSubmit: SubmitHandler<AddTaskFields> = async (values) => {
    const result = await addNewTaskAction({
      project_id: projectId,
      title: values.title,
      status: values.status,
      epic_id: values.epic_id || undefined,
      description: values.description || undefined,
      assignee_id: values.assignee_id || undefined,
      due_date: values.due_date || undefined,
    });

    if (!result.success) {
      showToast(`Failed to create task: ${result.error}`, "error");
      return;
    }

    form.reset();
    showToast("Task created successfully.", "success");
    setTimeout(() => router.push(`/project/${projectId}/tasks`), 1500);
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[80%]  mx-auto p-6 md:p-12
          bg-white shadow-[0_48px_24px_0_#041B3C0F]"
      >
        {/* Title */}
        <Controller
          control={form.control}
          name="title"
          render={({ field }) => (
            <Input
              className="w-full"
              label="Title"
              placeholder="e.g., Finalize structural schematics"
              error={form.formState.errors.title}
              {...field}
            />
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Status */}
          <div className="flex flex-col">
            <Controller
              control={form.control}
              name="status"
              render={({ field }) => (
                <div className="flex flex-col">
                  <label className="text-[.625rem] uppercase font-bold mb-1.5 text-[#737685]">
                    Status
                  </label>
                  <select
                    {...field}
                    className="outline-none text-sm font-normal px-4 py-3 rounded-sm bg-surface-highest text-[#6B7280] cursor-pointer w-full"
                  >
                    {TASK_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            />
          </div>

          {/* Assignee */}
          <div className="flex flex-col">
            <Controller
              control={form.control}
              name="assignee_id"
              render={({ field }) => (
                <div className="flex flex-col">
                  <label className="text-[.625rem] uppercase font-bold mb-1.5 text-[#737685]">
                    Assignee
                  </label>
                  <select
                    {...field}
                    className="outline-none text-sm font-normal px-4 py-3 rounded-sm bg-surface-highest text-[#6B7280] cursor-pointer w-full"
                  >
                    <option value="">Unassigned</option>
                    {members.map((member) => (
                      <option key={member.user_id} value={member.user_id}>
                        {member.metadata.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            />
          </div>
        </div>

        {/* Epic */}
        <div className="flex flex-col ">
          <Controller
            control={form.control}
            name="epic_id"
            render={({ field }) => (
              <div className="flex flex-col mb-6">
                <label className="text-[.625rem] uppercase font-bold mb-1.5 text-[#737685]">
                  Epic
                </label>

                <select
                  {...field}
                  className="outline-none text-sm font-normal px-4 py-3 rounded-sm bg-surface-highest text-[#6B7280] cursor-pointer w-full"
                >
                  <option value="">No Epic</option>

                  {epics.map((epic) => (
                    <option key={epic.id} value={epic.id}>
                      {`${epic.epic_id} ${epic.title}`}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />
        </div>

        {/* Due Date */}
        <div className="flex flex-col">
          <Controller
            control={form.control}
            name="due_date"
            render={({ field }) => (
              <div className="flex flex-col mb-6">
                <label className="text-[.625rem] uppercase font-bold mb-1.5 text-[#737685]">
                  Due Date
                </label>
                <input
                  type="date"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  className="outline-none text-sm font-normal px-4 py-3 rounded-sm bg-surface-highest text-[#6B7280] cursor-pointer w-full"
                />
              </div>
            )}
          />
        </div>

        {/* Description */}
        <Controller
          control={form.control}
          name="description"
          render={({ field }) => (
            <Textarea
              label="Description"
              placeholder="Provide detailed context for this task..."
              error={form.formState.errors.description}
              maxLength={500}
              currentLength={descriptionValue.length}
              {...field}
            />
          )}
        />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push(`/project/${projectId}/tasks`)}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={form.formState.isSubmitting}
            className="w-full sm:w-auto order-1 md:order-2"
          >
            {form.formState.isSubmitting ? "Creating..." : "Create Task"}
          </Button>
        </div>
      </form>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}

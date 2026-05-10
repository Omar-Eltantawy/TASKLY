import React from "react";
import NewEpicContainer from "./_components/new-epic-container";

export default function page() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="hidden md:block mb-5 shrink-0">
        <h1 className="text-[2.3rem] font-semibold">Create New Epic</h1>
        <p className="text-1rem font-normal text-slate-medium md:max-w-2/5">
          Define a major project phase or high-level milestone to group related
          tasks and track architectural progress.
        </p>
      </div>
      <NewEpicContainer />
    </div>
  );
}

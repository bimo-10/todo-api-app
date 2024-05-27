import ViewTodoLayout from "@/components/layouts/ViewTodoLayout";
import { getTodo } from "@/lib/fetchTodo";
import React from "react";

export default async function page({ params }) {
  // GET ID PARAMS
  const { id } = params;

  // GET TODO BY ID
  const todo = await getTodo(id);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <ViewTodoLayout todo={todo} />
    </div>
  );
}

import FormLayout from "@/components/layouts/FormLayout";
import { getTodos } from "@/lib/fetchTodo";

export default async function Home() {
  // GET ALL TODO
  const todos = await getTodos();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FormLayout todos={todos} />
    </main>
  );
}

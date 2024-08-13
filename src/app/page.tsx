import TodoCard from "@/components/TodoCard";
import { Button } from "@/components/ui/button";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { deleteTodo, getAllTodos, toggleTodo, updateTodo } from "@/services/todos.service";
import Link from "next/link";

export default async function Home() {
  // await prisma.todo.create({data: {title: "DO Something!", description: "desc", complete: false}})
  const todos = await getAllTodos();

  return (
    <>
      <header className="w-full flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Todos</h1>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button>
            <Link href={"/new"}>New</Link>
          </Button>
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {todos?.map((todo) => (
          <TodoCard key={todo.id} todo={todo} toggleTodo={toggleTodo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        ))}
      </div>
    </>
  );
}

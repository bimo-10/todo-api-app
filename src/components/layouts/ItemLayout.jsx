import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Eye, Loader2, Pen, Trash2 } from "lucide-react";
import { deleteTodo, updateTodo } from "@/lib/fetchTodo";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Link from "next/link";

export default function ItemLayout({ todos }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  // DATA INITIALIZATION
  useEffect(() => {
    try {
      if (todos) {
        setIsLoading(false);
      } else {
        throw new Error("Failed to fetch todos");
      }
    } catch (error) {
      setError(error.message);
    }
  }, [todos]);

  // IF LOADING
  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-8">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  // IF ERROR
  if (error) {
    return (
      <div className="flex justify-center items-center mt-8">
        <p>Error: {error}</p>
      </div>
    );
  }

  // BISA MENGGUNAKAN INI JUGA
  // const handleDeleteTodo = async (id) => {
  //   try {
  //     const res = await deleteTodo(id);

  //     router.refresh();
  //     return res;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleUpdateTodo = async (id, body, e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await updateTodo(id, body);

  //     router.refresh();
  //     return res;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // MAP DATA
  const content = todos.data.map((item) => {
    // UPDATE HANDLER
    const handleUpdateTodo = async (e) => {
      e.preventDefault();
      try {
        const res = await updateTodo(item.id, {
          todo: e.target.todo.value,
        });

        router.refresh();
        return res;
      } catch (error) {
        console.error("Failed to update todo:", error);
      }
    };

    // DELETE HANDLER
    const handleDeleteTodo = async () => {
      try {
        const res = await deleteTodo(item.id);
        router.refresh();
        return res;
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <li key={item.id} className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <p>{item.todo}</p>
        </div>
        <div className="flex gap-2">
          {/* VIEW BUTTON */}
          <Link href={`/${item.id}`}>
            <Button size="sm" className="bg-teal-400">
              <Eye />
            </Button>
          </Link>

          {/* DIALOG EDIT BUTTON */}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-sky-400">
                <Pen />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Todo</DialogTitle>
                <DialogDescription>Change your todo.</DialogDescription>
              </DialogHeader>

              {/* FORM EDIT */}
              <form onSubmit={handleUpdateTodo}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="todo" className="text-right">
                      Todo:
                    </Label>
                    <Input
                      id="todo"
                      defaultValue={item.todo}
                      className="col-span-3"
                    />
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Cancel
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="submit" className="bg-sky-400">
                        Save changes
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* ALERT DIALOG DELETE BUTTON */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className={buttonVariants({ variant: "destructive" })}
                  onClick={handleDeleteTodo}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </li>
    );
  });
  return (
    <div className="my-4">
      <h3 className="text-2xl font-semibold">Todo List</h3>

      <ul className="flex flex-col gap-2 mt-4">{content}</ul>
    </div>
  );
}

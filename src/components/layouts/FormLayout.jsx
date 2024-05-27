"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import ItemLayout from "./ItemLayout";
import { postTodo } from "@/lib/fetchTodo";
import { useRouter } from "next/navigation";

// FORM SCHEMA
const formSchema = z.object({
  todo: z.string(),
});

export default function FormLayout({ todos }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  // FORM INITIALIZATION
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: "",
    },
  });

  // FORM SUBMISSION
  const onSubmit = async (values, e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await postTodo(values);

      // Reset form fields after submission
      form.reset({
        todo: "", // Reset specific field
      });
      router.refresh();
      setIsLoading(false);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center text-4xl">Todo App</CardTitle>
        </CardHeader>
        <CardContent>
          {/* FORM */}
          <Form {...form}>
            <form
              action=""
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex justify-center items-end gap-2"
            >
              <FormField
                control={form.control}
                name="todo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Todo</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                Add
              </Button>
            </form>
          </Form>

          {/* ITEM LAYOUT GET DATA */}
          <ItemLayout todos={todos} />
        </CardContent>
      </Card>
    </div>
  );
}

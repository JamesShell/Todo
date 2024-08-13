"use client"

import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createTodo } from "@/services/todos.service";
import Link from "next/link";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    try {
      await createTodo({ title, description });
      // Handle success, e.g., redirect or show a success message
    } catch (error) {
      // Handle error
      console.error("Failed to create todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto md:w-10/12 lg:w-6/12 w-full">
      <CardHeader className="w-full">
        <h1 className="text-2xl font-semibold">New</h1>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="flex gap-2 flex-col">
          <Label htmlFor="title">Title</Label>
          <Input name="title" type="text" placeholder="Do chores" required />
          <Label htmlFor="description">Description</Label>
          <Textarea name="description" placeholder="desc" required />
        </CardContent>
        <CardFooter className="flex gap-1 justify-end">
          <Link className={buttonVariants({ variant: "secondary" })} href="..">
            Cancel
          </Link>
          <Button type="submit" loading={isLoading}>
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

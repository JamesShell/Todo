"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "./ui/checkbox";
import { Todo } from "@prisma/client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogContainer,
  DialogSubtitle,
} from "@/components/animated/animated-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button, buttonVariants } from "./ui/button"; // Import buttonVariants

export default function TodoCard({
  todo,
  toggleTodo,
  updateTodo,
  deleteTodo,
}: {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<void>;
  updateTodo: (id: string, title: string, description: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}) {
  const [checked, setChecked] = useState<boolean>(todo.complete);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [isSaving, setIsSaving] = useState(false); // State for save loading
  const [isDeleting, setIsDeleting] = useState(false); // State for delete loading

  const onToggle = (state: boolean) => {
    toggleTodo(todo.id, state);
    setChecked(state);
  };

  const handleSave = async () => {
    setIsSaving(true); // Set loading state to true
    try {
      await updateTodo(todo.id, title, description);
      setDialogOpen(false); // Close dialog after saving
    } catch (error) {
      console.error("Error saving todo:", error);
      // Optionally handle errors here
    } finally {
      setIsSaving(false); // Reset loading state
    }

    setDialogOpen(false)
  };

  const handleDelete = async () => {
    setIsDeleting(true); // Set loading state to true
    try {
      await deleteTodo(todo.id);
    } catch (error) {
      console.error("Error deleting todo:", error);
      // Optionally handle errors here
    } finally {
      setIsDeleting(false); // Reset loading state
    }
  };

  return (
    <Dialog
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 24,
      }}>
      <DialogTrigger>
        <Card className="cursor-pointer min-h-[300px] flex flex-col" onClick={() => onToggle(!checked)}>
          <CardHeader className="flex flex-row justify-start items-end gap-2">
            <Checkbox checked={checked} onCheckedChange={(c) => onToggle(c as boolean)} />
            <CardTitle className={checked ? "line-through" : ""}>
              {todo.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <CardDescription>{todo.description}</CardDescription>
          </CardContent>
          <CardFooter className="flex flex-row gap-2">
            <DialogSubtitle>
              <Button
                onClick={() => setDialogOpen(true)}
                aria-label='Open dialog'
              >
                Edit
              </Button>
            </DialogSubtitle>
            <Button
              variant='destructive'
              onClick={handleDelete}
              aria-label='Delete Todo'
              disabled={isDeleting} // Disable button when loading
            >
              {isDeleting ? 'Deleting...' : 'Delete'} {/* Display loading text */}
            </Button>
          </CardFooter>
        </Card>
      </DialogTrigger>

      {dialogOpen && (
        <DialogContainer>
          <DialogContent onClose={() => setDialogOpen(false)} className="rounded-xl border bg-card text-card-foreground shadow p-6 w-[500px] flex gap-6 flex-col">
            <div className="flex flex-col gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Do chores"
                value={title}
                onChange={(e) => setTitle(e.target.value)} // Update title state
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)} // Update description state
              />
            </div>
            <DialogSubtitle>
              <Button
                onClick={handleSave}
                disabled={isSaving} // Disable button when loading
              >
                {isSaving ? 'Saving...' : 'Save'} {/* Display loading text */}
              </Button>
            </DialogSubtitle>
            <DialogClose onClose={() => setDialogOpen(false)} />
          </DialogContent>
        </DialogContainer>
      )}
    </Dialog>
  );
}

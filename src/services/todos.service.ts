'use server';

import { redirect } from 'next/navigation';
import prisma from '@/db'; // Adjust the import path as needed
import { Todo } from '@prisma/client';

// Function to create a new todo
export async function createTodo(todo: { title: string; description: string }) {
  if (typeof todo.title !== "string" || todo.title.length === 0) {
    throw new Error("Invalid title");
  }

  if (typeof todo.description !== "string" || todo.description.length === 0) {
    throw new Error("Invalid description");
  }

  // Create a new todo in the database
  await prisma.todo.create({
    data: {
      title: todo.title,
      description: todo.description,
      complete: false,
    },
  });

  console.log("data", { title: todo.title, description: todo.description, });
  redirect('/');
}

// Function to get all todos
export async function getAllTodos(): Promise<Todo[]> {
  return await prisma.todo.findMany();
}

// Function to update a todo
export async function updateTodo(id: string, title: string, description: string) {
  await prisma.todo.update({
    where: { id: id },
    data: {
      title,
      description
    },
  });
}

// Function to toggle the completion status of a todo
export async function toggleTodo(id: string, complete: boolean) {
  await prisma.todo.update({
    where: { id },
    data: {
      complete,
    },
  });
}

// Function to delete a todo
export async function deleteTodo(id: string) {
  await prisma.todo.delete({
    where: { id },
  });

  redirect('/')
}

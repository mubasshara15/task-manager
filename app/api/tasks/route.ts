import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { eq, desc, and } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { db } from "@/db";
import { task } from "@/db/schema";

async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const tasks = await db
    .select()
    .from(task)
    .where(eq(task.userId, session.user.id))
    .orderBy(desc(task.createdAt));

  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { title } = await request.json();

  if (!title?.trim()) {
    return NextResponse.json(
      { message: "Title is required" },
      { status: 400 }
    );
  }

  const [newTask] = await db
    .insert(task)
    .values({
      title: title.trim(),
      completed: false,
      userId: session.user.id,
    })
    .returning();

  return NextResponse.json(newTask);
}

export async function PATCH(request: Request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id, title, completed } = await request.json();

  console.log("PATCH BODY:", { id, title, completed });

  const updateData: Partial<{
    title: string;
    completed: boolean;
  }> = {};

  if (typeof title === "string") {
    updateData.title = title.trim();
  }

  if (typeof completed === "boolean") {
    updateData.completed = completed;
  }

  console.log("UPDATE DATA:", updateData);

  const [updatedTask] = await db
    .update(task)
    .set(updateData)
    .where(
      and(
        eq(task.id, id),
        eq(task.userId, session.user.id)
      )
    )
    .returning();

  console.log("UPDATED TASK:", updatedTask);

  return NextResponse.json(updatedTask);
}

export async function DELETE(request: Request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await request.json();

  await db
    .delete(task)
    .where(
      and(
        eq(task.id, id),
        eq(task.userId, session.user.id)
      )
    );

  return NextResponse.json({
    success: true,
  });
}
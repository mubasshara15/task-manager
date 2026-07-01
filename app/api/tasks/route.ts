import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const tasks = await Task.find({ userId: user.id }).sort({ createdAt: -1 });
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { title } = await request.json();

  const task = await Task.create({
    title,
    completed: false,
    userId: user.id,
  });

  return NextResponse.json(task);
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const body = await request.json();

  const { id, completed, title } = body;

  const updateData: Record<string, unknown> = {};

  if (typeof completed === "boolean") {
    updateData.completed = completed;
  }

  if (title) {
    updateData.title = title;
  }

  const task = await Task.findOneAndUpdate(
    { _id: id, userId: user.id },
    updateData,
    { new: true }
  );

  return NextResponse.json(task);
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { id } = await request.json();

  await Task.findOneAndDelete({ _id: id, userId: user.id });

  return NextResponse.json({
    success: true,
  });
}

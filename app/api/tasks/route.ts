import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";

export async function GET() {
  await connectDB();
  const tasks = await Task.find().sort({ createdAt: -1 });
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  await connectDB();

  const { title } = await request.json();

  const task = await Task.create({
    title,
    completed: false,
  });

  return NextResponse.json(task);
}

export async function PATCH(request: Request) {
  await connectDB();

    const body = await request.json();

    const { id, completed, title } = body;

    const updateData: any = {};

    if (typeof completed === "boolean") {
    updateData.completed = completed;
    }

    if (title) {
    updateData.title = title;
    }

    const task = await Task.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
    );

    return Response.json(task);
}

export async function DELETE(request: Request) {
  await connectDB();

  const { id } = await request.json();

  await Task.findByIdAndDelete(id);

  return NextResponse.json({
    success: true,
  });
}

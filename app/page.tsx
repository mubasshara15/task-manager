"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import Stats from "@/components/Stats";
import SearchBar from "@/components/SearchBar";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import EmptyState from "@/components/EmptyState";
import FilterTabs from "@/components/FilterTabs";
import toast from "react-hot-toast";
import Progress from "@/components/Progress";
import Footer from "@/components/Footer";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState("");
  const [editingTitle, setEditingTitle] = useState("");

  const loadTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      setTitle("");
      await loadTasks();
    } catch (error) {
      console.error("Failed to add task:", error);
    }

    toast.success("Task added successfully!");
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch("/api/tasks", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      await loadTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }

    toast.success("Task deleted.");
  };

  const updateTask = async () => {
    if (!editingTitle.trim()) return;

    await fetch("/api/tasks", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingId,
        title: editingTitle,
      }),
    });

    setEditingId("");
    setEditingTitle("");

    loadTasks();
  };

  const toggleTask = async (
    id: string,
    completed: boolean
  ) => {
    try {
      await fetch("/api/tasks", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          completed,
        }),
      });

      await loadTasks();
    } catch (error) {
      console.error("Failed to update task:", error);
    }

    toast.success(
      completed ? "Task marked as pending" : "Task completed!"
    );
    
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
  const matchesSearch = task.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesFilter =
    filter === "All"
      ? true
      : filter === "Completed"
      ? task.completed
      : !task.completed;

  return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-slate-900 p-8">
      <div className="max-w-3xl mx-auto">
        <Header />

        <Stats
          total={tasks.length}
          completed={tasks.filter((task) => task.completed).length}
        />

        <Progress
          total={tasks.length}
          completed={tasks.filter((task) => task.completed).length}
        />

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <FilterTabs
          filter={filter}
          setFilter={setFilter}
        />

        <TaskForm
          title={title}
          setTitle={setTitle}
          addTask={addTask}
        />

        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <EmptyState />
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                editingId={editingId}
                editingTitle={editingTitle}
                setEditingId={setEditingId}
                setEditingTitle={setEditingTitle}
                updateTask={updateTask}
              />
            ))
          )}
        </div>

        <Footer />
      </div>

     </main>
  );
}
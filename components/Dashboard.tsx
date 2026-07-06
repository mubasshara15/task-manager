"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCards from "@/components/StatsCards";
import ProgressCard from "@/components/ProgressCard";
import TaskTable from "@/components/TaskTable";
import Footer from "@/components/Footer";
import NewTaskModal from "@/components/NewTaskModal";
import toast from "react-hot-toast";
import type { AuthUser, NavSection, Task } from "@/types";
import { authClient } from "@/auth-client";

interface DashboardProps {
  user: AuthUser;
}

export default function Dashboard({ user }: DashboardProps) {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [activeNav, setActiveNav] = useState<NavSection>("dashboard");
  const [sort, setSort] = useState("Latest First");
  const [editingId, setEditingId] = useState("");
  const [editingTitle, setEditingTitle] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filter =
    activeNav === "pending" ? "Pending" : activeNav === "completed" ? "Completed" : "All";

  const setFilter = (value: string) => {
    setActiveNav(value === "Pending" ? "pending" : value === "Completed" ? "completed" : "all");
  };

  const loadTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
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

  const toggleTask = async (id: string, completed: boolean) => {
    const newCompleted = !completed;

    try {
      await fetch("/api/tasks", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          completed: newCompleted,
        }),
      });

      await loadTasks();

      toast.success(
        newCompleted ? "Task completed!" : "Task marked as pending"
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task.");
    }
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      toast.success("Logged out successfully.");

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out.");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const completedCount = tasks.filter((task) => task.completed).length;

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

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === "Oldest First") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sort === "Completed First") {
      return Number(b.completed) - Number(a.completed);
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        activeNav={activeNav}
        onNavigate={setActiveNav}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="md:pl-[72px] lg:pl-64">
        <TopBar
          user={user}
          search={search}
          setSearch={setSearch}
          onOpenSidebar={() => setSidebarOpen(true)}
          onNewTask={() => setIsModalOpen(true)}
          onLogout={handleLogout}
        />

        <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8">
          <DashboardHeader name={user.name} />

          <StatsCards total={tasks.length} completed={completedCount} loading={loading} />

          <ProgressCard
            total={tasks.length}
            completed={completedCount}
            onViewDetails={() => setActiveNav("completed")}
          />

          <TaskTable
            tasks={sortedTasks}
            loading={loading}
            filter={filter}
            setFilter={setFilter}
            sort={sort}
            setSort={setSort}
            quickTitle={title}
            setQuickTitle={setTitle}
            addTask={addTask}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            editingId={editingId}
            editingTitle={editingTitle}
            setEditingId={setEditingId}
            setEditingTitle={setEditingTitle}
            updateTask={updateTask}
          />

          <Footer />
        </main>
      </div>

      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        setTitle={setTitle}
        addTask={addTask}
      />
    </div>
  );
}

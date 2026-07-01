export interface Task {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export type NavSection = "dashboard" | "all" | "pending" | "completed";

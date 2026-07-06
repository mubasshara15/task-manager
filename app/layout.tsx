import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Modern Task Manager built with Next.js, Drizzle ORM and PostgreSQL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "var(--color-surface)",
                color: "var(--color-foreground)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              },
              success: {
                iconTheme: {
                  primary: "#22c55e",
                  secondary: "#ffffff",
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
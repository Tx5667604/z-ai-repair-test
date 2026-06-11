import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "iPhone Ремонт — Сервисный центр",
  description: "Профессиональный ремонт iPhone. Быстро, качественно, с гарантией.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="antialiased bg-white text-foreground overflow-hidden">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import "../index.css";

export const metadata: Metadata = {
  title: "Hwa Pyoung Kim | Backend Software Engineer",
  description: "Backend portfolio built with Next.js, TypeScript, and TailwindCSS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

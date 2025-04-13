import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@repo/shadcn/lib/utils";
import { RootProvider } from "fumadocs-ui/provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "relative flex min-h-svh flex-col overflow-x-hidden"
          // `${geistSans.variable} ${geistMono.variable}`
        )}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

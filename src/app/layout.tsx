import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import '@fontsource/fredoka-one';
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import { AuthProvider } from "@/features/auth/context";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"]
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Little Dimple",
  description: "Little Dimple - Your Trusted Baby Care Partner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} antialiased`}
        style={{ fontFamily: 'Fredoka One, cursive' }}>
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

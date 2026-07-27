import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './components/Header'
import Footer from './components/Footer'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Community Help Hub — Report Local Issues",
  description: "Report local community issues like broken streetlights, water leaks, garbage overflow, and road damage. AI automatically categorizes and formalizes your report for local authorities.",
  keywords: ["community reporting", "civic issues", "Sialkot", "local government", "AI complaint generator"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
     <body className="min-h-full flex flex-col">
  <Header />
  <div className="flex-1">
    {children}
  </div>
  <Footer />
</body>
    </html>
  )
}

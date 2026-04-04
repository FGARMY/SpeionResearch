import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "Speion Research",
    template: "%s — Speion Research",
  },
  description:
    "Independent research in software engineering, artificial intelligence, and applied technology.",
  icons: {
    icon: "/favicon.png",
  },
  metadataBase: new URL("https://research.speion.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Speion Research",
    title: "Speion Research",
    description:
      "Independent research in software engineering, artificial intelligence, and applied technology.",
  },
  twitter: {
    card: "summary",
    title: "Speion Research",
    description:
      "Independent research in software engineering, artificial intelligence, and applied technology.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[var(--color-bg)] transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

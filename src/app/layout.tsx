import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
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
      <body className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300 antialiased selection:bg-[var(--color-accent)] selection:text-[var(--color-bg)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            {/* Sidebar - Desktop Only */}
            <aside className="hidden lg:block w-[12rem] shrink-0 border-r border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-10 sticky top-0 h-screen overflow-y-auto">
              <Sidebar />
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
              <Header />
              <main className="flex-1 bg-[var(--color-bg-secondary)] border-l-0 lg:border-l border-[var(--color-border)]">
                <div className="max-w-4xl px-6 py-12 mx-auto">
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

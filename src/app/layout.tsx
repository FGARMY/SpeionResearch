import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Speion Research Labs",
    template: "%s | Speion Research Labs",
  },
  description:
    "Leading academic-grade research in AI Systems, Cybersecurity, and Automation.",
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
      "Leading academic-grade research in AI Systems, Cybersecurity, and Automation.",
  },
  twitter: {
    card: "summary",
    title: "Speion Research",
    description:
      "Leading academic-grade research in AI Systems, Cybersecurity, and Automation.",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#FFFFFF] text-[#111111] antialiased selection:bg-[#EEEEEE]">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full max-w-[800px] mx-auto px-6 py-20">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

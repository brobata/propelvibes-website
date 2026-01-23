import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Propel Vibes - Ship Your App with Pro Developers",
    template: "%s | Propel Vibes",
  },
  description:
    "Connect with verified developers who specialize in taking AI-built apps to production. Get proposals from experienced professionals.",
  keywords: [
    "AI app development",
    "MVP development",
    "developer marketplace",
    "app launch",
    "freelance developers",
    "ship app",
    "production ready",
  ],
  authors: [{ name: "Propel Vibes" }],
  creator: "Propel Vibes",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://propelvibes.com",
    siteName: "Propel Vibes",
    title: "Propel Vibes - Ship Your App with Pro Developers",
    description:
      "Connect with verified developers who specialize in taking AI-built apps to production.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Propel Vibes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Propel Vibes - Ship Your App with Pro Developers",
    description:
      "Connect with verified developers who specialize in taking AI-built apps to production.",
    images: ["/og-image.png"],
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}

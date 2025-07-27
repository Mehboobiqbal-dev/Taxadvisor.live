import { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import Head from "next/head";
import "./globals.css";
import { Toaster } from "@/app/components/ui/sonner";
import { ThemeProvider } from "next-themes";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tax Advisor",
  description: "Simplifying taxation",
  other: {
    "google-site-verification": "wLF0iQsjbx3PcKcGjJIFnZEC8GX_kUCWA7oz4JKJtjA",
    "google-adsense-account": "ca-pub-2663142027592405",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" type="image/jpeg" href="https://i.ibb.co/vxKbKLHT/photo.jpg" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-46NW49XJ57"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-46NW49XJ57');
          `}
        </Script>
      </body>
    </html>
  );
}

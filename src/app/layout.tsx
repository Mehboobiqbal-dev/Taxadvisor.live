import { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import Head from "next/head";
import "./globals.css";
import { Toaster } from "@/app/components/ui/sonner";


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
    <html lang="en">
      <Head>
                <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
                <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Move Toaster to bottom-right and visually hide empty notification section */}
        <div style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 9999, width: 'auto', pointerEvents: 'none' }}>
          <Toaster position="bottom-right" />
        </div>
        {children}
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

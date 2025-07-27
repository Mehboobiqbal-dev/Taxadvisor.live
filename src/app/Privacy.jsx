import React from "react";
import Script from "next/script"; 
import Header from "./Header";
import Footer from "./Footer";
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';

const Privacy = () => {
  return (
    <>
      <Script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2663142027592405"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <Header />
      <main className="bg-muted/40 py-20">
        <div className="container">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold">Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <p className="text-lg text-muted-foreground">
                At Tax Advisor, we value the privacy of our users and are committed to protecting their personal data.
                This Privacy Policy explains how we collect, use, and disclose your information when you use our website and services.
              </p>

              <div>
                <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
                <p className="mt-2 text-muted-foreground">We collect various types of information when you use our services, including:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li><strong>Personal Information:</strong> Name, email address, and contact information.</li>
                  <li><strong>Usage Data:</strong> IP address, browser type, and pages visited.</li>
                  <li><strong>Cookies:</strong> To enhance user experience and analyze website usage.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>To provide and maintain our services.</li>
                  <li>To improve user experience.</li>
                  <li>To send newsletters and updates (if opted-in).</li>
                  <li>To comply with legal obligations.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold">3. Data Sharing and Disclosure</h2>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li><strong>Service Providers:</strong> Third-party services for payments, data analysis, and marketing.</li>
                  <li><strong>Legal Compliance:</strong> When required by law.</li>
                  <li><strong>Business Transfers:</strong> In case of a merger or acquisition.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold">4. Security of Your Data</h2>
                <p className="mt-2 text-muted-foreground">We implement security measures but cannot guarantee 100% security over the internet.</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold">5. Your Rights</h2>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>Request access, correction, or deletion of your data.</li>
                  <li>Object to data processing under certain conditions.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold">6. Changes to This Privacy Policy</h2>
                <p className="mt-2 text-muted-foreground">We may update this policy and will update the "Last Revised" date accordingly.</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold">7. Contact Us</h2>
                <p className="mt-2 text-muted-foreground">Email: support@taxadvisor.live</p>
              </div>

              <div className="text-center text-sm text-muted-foreground pt-8">
                <p>Last Revised: 2025</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Privacy;

import React from "react";
import Script from "next/script"; 

const Privacy = () => {
  return (
    <>
            <Script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2663142027592405"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <div id="privacy" style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
        <h2>Privacy Policy</h2>

        <p>
          At Tax Advisor, we value the privacy of our users and are committed to protecting their personal data.
          This Privacy Policy explains how we collect, use, and disclose your information when you use our website and services.
        </p>

        <h3>1. Information We Collect</h3>
        <p>We collect various types of information when you use our services, including:</p>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, and contact information.</li>
          <li><strong>Usage Data:</strong> IP address, browser type, and pages visited.</li>
          <li><strong>Cookies:</strong> To enhance user experience and analyze website usage.</li>
        </ul>

        <h3>2. How We Use Your Information</h3>
        <ul>
          <li>To provide and maintain our services.</li>
          <li>To improve user experience.</li>
          <li>To send newsletters and updates (if opted-in).</li>
          <li>To comply with legal obligations.</li>
        </ul>

        <h3>3. Data Sharing and Disclosure</h3>
        <ul>
          <li><strong>Service Providers:</strong> Third-party services for payments, data analysis, and marketing.</li>
          <li><strong>Legal Compliance:</strong> When required by law.</li>
          <li><strong>Business Transfers:</strong> In case of a merger or acquisition.</li>
        </ul>

        <h3>4. Security of Your Data</h3>
        <p>We implement security measures but cannot guarantee 100% security over the internet.</p>

        <h3>5. Your Rights</h3>
        <ul>
          <li>Request access, correction, or deletion of your data.</li>
          <li>Object to data processing under certain conditions.</li>
        </ul>

        <h3>6. Changes to This Privacy Policy</h3>
        <p>We may update this policy and will update the "Last Revised" date accordingly.</p>

        <h3>7. Contact Us</h3>
        <p>Email: support@taxadvisor.live</p>

        <footer style={{ marginTop: "30px", textAlign: "center" }}>
          <p>Last Revised: 2025</p>
        </footer>
      </div>
    </>
  );
};

export default Privacy;

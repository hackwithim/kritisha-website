import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-28">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#0B2341] mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none font-sans-ui text-slate-700 space-y-6">
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="font-editorial text-2xl text-[#0B2341] font-bold mt-10">1. Introduction</h2>
          <p>
            Welcome to KRITISHA Infrastructure. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
          </p>

          <h2 className="font-editorial text-2xl text-[#0B2341] font-bold mt-10">2. The Data We Collect About You</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes email address and telephone numbers (e.g. from our Contact Form or Enquire Now form).</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
          </ul>

          <h2 className="font-editorial text-2xl text-[#0B2341] font-bold mt-10">3. How We Use Your Personal Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To respond to your inquiries when you contact us.</li>
            <li>To manage our relationship with you.</li>
            <li>To improve our website, products/services, marketing or customer relationships.</li>
          </ul>

          <h2 className="font-editorial text-2xl text-[#0B2341] font-bold mt-10">4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
          </p>

          <h2 className="font-editorial text-2xl text-[#0B2341] font-bold mt-10">5. Data Retention</h2>
          <p>
            We will only retain your personal data for as long as reasonably necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.
          </p>

          <h2 className="font-editorial text-2xl text-[#0B2341] font-bold mt-10">6. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
            <br />
            <strong>Email:</strong> info@kritishainfra.com
            <br />
            <strong>Address:</strong> Office No. 319, Commodity Exchange Bldg, Plot No. 2,3,4, Sector 19, Vashi, Navi Mumbai – 400705, Maharashtra, India
          </p>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export default function TermsOfUsePage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-28">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#0B2341] mb-8">Terms of Use</h1>
        
        <div className="prose prose-slate max-w-none font-sans-ui text-slate-700 space-y-6">
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="font-editorial text-2xl text-[#0B2341] font-bold mt-10">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the KRITISHA Infrastructure website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 className="font-editorial text-2xl text-[#0B2341] font-bold mt-10">2. Intellectual Property Rights</h2>
          <p>
            The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary rights. The copying, redistribution, use or publication by you of any such matters or any part of the Site is strictly prohibited.
          </p>

          <h2 className="font-editorial text-2xl text-[#0B2341] font-bold mt-10">3. Use of the Site</h2>
          <p>
            You agree to use this site only for lawful purposes, and in a manner which does not infringe the rights, or restrict, or inhibit the use and enjoyment of the site by any third party.
          </p>

          <h2 className="font-editorial text-2xl text-[#0B2341] font-bold mt-10">4. Disclaimer of Warranties</h2>
          <p>
            The materials on KRITISHA Infrastructure's website are provided on an 'as is' basis. KRITISHA Infrastructure makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2 className="font-editorial text-2xl text-[#0B2341] font-bold mt-10">5. Limitations</h2>
          <p>
            In no event shall KRITISHA Infrastructure or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on KRITISHA Infrastructure's website.
          </p>

          <h2 className="font-editorial text-2xl text-[#0B2341] font-bold mt-10">6. Revisions and Errata</h2>
          <p>
            The materials appearing on KRITISHA Infrastructure's website could include technical, typographical, or photographic errors. KRITISHA Infrastructure does not warrant that any of the materials on its website are accurate, complete or current.
          </p>
          
          <h2 className="font-editorial text-2xl text-[#0B2341] font-bold mt-10">7. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in Maharashtra.
          </p>
        </div>
      </div>
    </div>
  );
}

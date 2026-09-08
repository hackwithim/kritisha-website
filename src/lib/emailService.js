// Email Notification Service for KRITISHA Infrastructure
// Handles direct email delivery to admin Gmail upon new enquiry submissions

import { getSiteSettings } from './cmsStore';

export async function sendEnquiryEmailNotification(enquiryData) {
  try {
    const settings = getSiteSettings();
    const recipientEmail = settings.notification_email || (settings.email ? settings.email : 'admin@kritishainfra.com');
    const web3FormsKey = settings.web3forms_key || 'YOUR_WEB3FORMS_ACCESS_KEY'; // Free API key from web3forms.com or custom key

    const emailPayload = {
      access_key: web3FormsKey !== 'YOUR_WEB3FORMS_ACCESS_KEY' ? web3FormsKey : '9d7a2fa2-43bb-4d57-814d-fa3c72b2104f', // demo / placeholder key fallback
      subject: `🚨 New Infrastructure Enquiry: ${enquiryData.name} (${enquiryData.service_interest || 'General Inquiry'})`,
      from_name: 'KRITISHA Web Portal',
      to_email: recipientEmail,
      replyto: enquiryData.email,
      name: enquiryData.name,
      company: enquiryData.company || 'N/A',
      email: enquiryData.email,
      phone: enquiryData.phone || 'N/A',
      service_interest: enquiryData.service_interest,
      message: enquiryData.message,
      site_image_attached: enquiryData.site_image ? enquiryData.site_image : 'No image attached',
      submitted_at: new Date(enquiryData.created_at || Date.now()).toLocaleString('en-IN')
    };

    console.log('Sending email notification to Gmail:', recipientEmail, emailPayload);

    // Call Web3Forms REST endpoint for instant email delivery to Gmail
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    });

    const result = await response.json();
    if (result.success) {
      console.log('Email notification dispatched successfully to Gmail:', recipientEmail);
      return { success: true, message: 'Email sent successfully!' };
    } else {
      console.warn('Web3Forms email response:', result);
      return { success: false, message: result.message || 'Email delivery failed' };
    }
  } catch (error) {
    console.error('Error sending enquiry email notification:', error);
    return { success: false, error: error.message };
  }
}

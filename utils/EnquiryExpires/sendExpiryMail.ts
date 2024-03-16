import config from "../../config/config";
import nodemailer from "nodemailer";
import {  IUserEmail } from "src/interfaces/schemaInterfaces/enquiryInterface";

export async function sendExpiryNotificationEmails(expiredEnquiries: IUserEmail[]) {
  // Create a transporter for sending emails using nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.gmailId,
      pass: config.gmailPass,
    },
  });
  // Iterate over each expired enquiry and send expiry notification email
  for (const enquiry of expiredEnquiries) {
    const mailOptions = {
      from: config.gmailId,
      to: enquiry.user.email,
      subject: "Your Enquiry Has Expired",
      text: "Your enquiry has expired. Please take necessary actions.",
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${enquiry.user.email}`);
    } catch (error) {
      console.error(`Failed to send email to ${enquiry.user.email}:`, error);
    }
  }
}

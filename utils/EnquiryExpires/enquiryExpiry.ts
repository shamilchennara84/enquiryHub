import EnquiryModel from "../../src/database/models/enquiryModel";
import { sendExpiryNotificationEmails } from "./sendExpiryMail";

export async function markEnquiriesAsExpired(sevenDaysAgo: Date) {
  // Find enquiries older than seven days and not yet expired
  const expiredEnquiries = await EnquiryModel.aggregate([
    { $match: { createdAt: { $lt: sevenDaysAgo }, isExpired: false } },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    { $project: { "user.email": 1, _id: 0 } },
  ]);
  // Send expiry notification emails to users
  await sendExpiryNotificationEmails(expiredEnquiries);
  // Update the isExpired field for the expired enquiries in the database
  await EnquiryModel.updateMany({ createdAt: { $lt: sevenDaysAgo } }, { $set: { isExpired: true } });
}

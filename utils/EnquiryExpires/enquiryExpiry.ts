import EnquiryModel from "../../src/database/models/enquiryModel";
import { sendExpiryNotificationEmails } from "./sendExpiryMail";

export async function markEnquiriesAsExpired(sevenDaysAgo: Date) {
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
 console.log(expiredEnquiries);
  await sendExpiryNotificationEmails(expiredEnquiries);
  await EnquiryModel.updateMany({ createdAt: { $lt: sevenDaysAgo } }, { $set: { isExpired: true } });
}

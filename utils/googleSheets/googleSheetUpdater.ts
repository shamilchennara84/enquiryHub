import { GoogleSpreadsheet } from "google-spreadsheet";
import { getServiceAccountAuth } from "./googleSheetConfigure";
import { UserRepository } from "../../src/database/repositories/userRepository";
import config from "../../config/config";

export async function manageGoogleSheet() {
  // Get the Google Sheet ID from the configuration
  const sheetId: string | undefined = config.googleSheetId;
  if (!sheetId) {
    throw new Error("GOOGLE_SHEET_ID environment variable is not set.");
  }
  // Initialize a new Google Spreadsheet instance
  const doc = new GoogleSpreadsheet(sheetId, getServiceAccountAuth());
  await doc.loadInfo();

  // Get or create sheets for users and enquiries
  let userSheet = doc.sheetsByTitle["users"];
  let enquirySheet = doc.sheetsByTitle["enquiries"];
  if (!userSheet) {
    userSheet = await doc.addSheet({ title: "users" });
  }
  if (!enquirySheet) {
    enquirySheet = await doc.addSheet({ title: "enquiries" });
  }

  // Initialize UserRepository to fetch user and enquiry data
  const userRepository = new UserRepository();
  const users = await userRepository.UserDataSheet();
  const enquiry = await userRepository.getEnquiryDetails();

  if (!users) {
    throw new Error("Error while fetching userData for spreadsheet ");
  }

  // Clear existing rows in user and enquiry sheets
  await userSheet.clearRows();
  await enquirySheet.clearRows();

  // Set header rows for user and enquiry sheets
  await userSheet.setHeaderRow(["First_Name", "Last_Name", "Email", "Profile_Info"]);
  await enquirySheet.setHeaderRow(["EnquiryId", "Raised_By", "Team_Tagged", "Enquiry", "Status", "Created_At"]);

  // Prepare user data to be added to the user sheet
  const userData = users.map((user) => ({
    First_Name: user.First_Name,
    Last_Name: user.Last_Name,
    Email: user.Email,
    Profile_Info: user.Info[0] ? user.Info[0] : "NA",
  }));

  // Prepare enquiry data to be added to the enquiry sheet
  const enquiryData = enquiry.map((enquiry) => ({
    EnquiryId: enquiry._id ? enquiry._id.toString() : "N/A",
    Raised_By: enquiry.Raised_By,
    Team_Tagged: enquiry.Team_Tagged.join(","),
    Enquiry: enquiry.Enquiry,
    Status: enquiry.Status ? "Expired" : "Pending",
    Created_At: enquiry.CreatedAt.toISOString(),
  }));

  // Add user data and enquiry data to the respective sheets
  await userSheet.addRows(userData);
  await enquirySheet.addRows(enquiryData);
}

manageGoogleSheet().catch(console.error);

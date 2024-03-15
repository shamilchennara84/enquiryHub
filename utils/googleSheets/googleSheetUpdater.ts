import { GoogleSpreadsheet } from "google-spreadsheet";
import { getServiceAccountAuth } from "./googleSheetConfigure";
import { UserRepository } from "../../src/database/repositories/userRepository";
import config from "../../config/config";

export async function manageGoogleSheet() {
  const sheetId: string | undefined = config.googleSheetId;
  if (!sheetId) {
    throw new Error("GOOGLE_SHEET_ID environment variable is not set.");
  }
  const doc = new GoogleSpreadsheet(sheetId, getServiceAccountAuth());
  await doc.loadInfo();
  console.log(doc.title);

  let userSheet = doc.sheetsByTitle["users"];
  if (!userSheet) {
    userSheet = await doc.addSheet({ title: "users" });
  }
  const userRepository = new UserRepository();
  const users = await userRepository.UserDataSheet();
  const enquiry = await userRepository.getEnquiryDetails();
  console.log(enquiry);
  if (!users) {
    throw new Error("Error while fetching userData for spreadsheet ");
  }
  await userSheet.clearRows();
  await userSheet.setHeaderRow(["First_Name", "Last_Name", "Email", "Info"]);

  const data = users.map((user) => ({
    First_Name: user.First_Name,
    Last_Name: user.Last_Name,
    Email: user.Email,
    Info: user.Info[0] ? user.Info[0] : "NA",
  }));

  await userSheet.addRows(data);
}

manageGoogleSheet().catch(console.error);

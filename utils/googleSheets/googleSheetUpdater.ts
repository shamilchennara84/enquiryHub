import { GoogleSpreadsheet } from "google-spreadsheet";
import { getServiceAccountAuth } from "./googleSheetConfigure";
import { UserRepository } from "../../src/database/repositories/userRepository";

export async function manageGoogleSheet() {
  const sheetId: string | undefined = process.env.GOOGLE_SHEET_ID;
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
  await userSheet.clearRows();
  await userSheet.setHeaderRow(["First_Name", "Last_Name", "Email", "Info"]);
  const userRepository = new UserRepository();
  const users = await userRepository.UserDataSheet();

  const data = users.map((user) => ({
    First_Name: user.First_Name,
    Last_Name: user.Last_Name,
    Email: user.Email,
    Info: user.Info[0] ? user.Info[0] : 'NA',
  }));

  await userSheet.addRows(data);
}

manageGoogleSheet().catch(console.error);

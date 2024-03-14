
import cron from "node-cron";
import { manageGoogleSheet } from "./googleSheetUpdater";

cron.schedule("* * * * *", async () => {
  try {
    console.log("Google Sheet updated successfully.");
    await manageGoogleSheet();
  } catch (error) {
    console.error("An error occurred while updating the Google Sheet:", error);
  }
});
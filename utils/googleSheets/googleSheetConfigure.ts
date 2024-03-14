import { JWT } from "google-auth-library";
import * as fs from "fs";

export function getServiceAccountAuth() {
  const CREDENTIALS = JSON.parse(fs.readFileSync("google.json", "utf8"));
  const SCOPES = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive.file"];
  const serviceAccountAuth = new JWT({
    email: CREDENTIALS.client_email,
    key: CREDENTIALS.private_key,
    scopes: SCOPES,
  });

  return serviceAccountAuth;
}

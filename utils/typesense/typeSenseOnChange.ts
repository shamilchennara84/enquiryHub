/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "typesense";
import { toUnixTimestamp } from "../../utils/unixTimestamp";
import TypesenseClient from "./typesenseClient";


// Function to update Typesense documents based on MongoDB change events
const updateTypesenseOnChange = async (change: any, typesense: Client, collectionName: string) => {
  console.log("handler called");
  if (change.operationType === "insert") {
    const document = change.fullDocument;
    // Convert createdAt and updatedAt fields to Unix timestamps
    const createdAtTimestamp = toUnixTimestamp(new Date(document.createdAt));
    const updatedAtTimestamp = toUnixTimestamp(new Date(document.updatedAt));
    document.createdAt = createdAtTimestamp;
    document.updatedAt = updatedAtTimestamp;
    console.log(`Insert operation in collection: ${collectionName}`);

    await TypesenseClient.insertDocument(typesense, collectionName, document);
  } else if (change.operationType === "update") {
    const updatedFields = change.updateDescription.updatedFields;
    console.log(updatedFields, "updated");
    console.log(`Update operation in collection: ${collectionName}`);
    if (updatedFields.updatedAt) {
      // Convert the updatedAt timestamp to BigInt and then to a string
      const updatedAtTimestamp = toUnixTimestamp(new Date(updatedFields.updatedAt));
      updatedFields.updatedAt = updatedAtTimestamp;

      await TypesenseClient.updateDocument(typesense, collectionName, updatedFields); // Use the updateDocument method
    }
  } else if (change.operationType === "delete") {
    console.log("delete handler");
    const documentKey = change.documentKey;
    console.log(`Delete operation in collection: ${collectionName}`);

    await TypesenseClient.deleteDocument(typesense, collectionName, documentKey._id.toString()); // Use the deleteDocument method
  }
};

export default updateTypesenseOnChange;

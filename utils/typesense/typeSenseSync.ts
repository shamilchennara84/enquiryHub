/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "typesense";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function upsertDocumentInTypesense(document: any, typesense: Client, collectionName: string) {
  try {
    const documentId = document._id;
     console.log(document, "fields");
    await typesense
      .collections(collectionName)
      .documents()
      .upsert({
        id: documentId,
        ...document,
      });
    console.log(`Upserted document with ID: ${documentId} in collection: ${collectionName}`);
  } catch (error) {
    console.error(`Error upserting document: ${error}`);
  }
}

export async function updateDocumentInTypesense(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  documentKey: any,
  updatedFields: any,
  typesense: Client,
  collectionName: string,
) {
  try {
    const documentId = documentKey._id;
    console.log(updatedFields,"fields");
    await typesense
      .collections(collectionName)
      .documents(documentId)
      .update({
        ...updatedFields,
      });
    console.log(`Updated document with ID: ${documentId} in collection: ${collectionName}`);
  } catch (error) {
    console.error(`Error updating document: ${error}`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function deleteDocumentInTypesense(documentKey: any, typesense: Client, collectionName: string) {
 try {
    const documentId = documentKey._id;

    await typesense.collections(collectionName).documents(documentId).delete();
    console.log(`Deleted document with ID: ${documentId} from collection: ${collectionName}`);
 } catch (error) {
    console.error(`Error deleting document: ${error}`);
 }
}


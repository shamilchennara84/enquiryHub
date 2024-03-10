import { Request, Response, NextFunction } from "express";
import { MongoClient } from "mongodb";
import initializeTypesenseClient from "../../utils/typesense/typesenseClient";
import { Client } from "typesense";
import {
  upsertDocumentInTypesense,
  updateDocumentInTypesense,
  deleteDocumentInTypesense,
} from "../../utils/typesense/typeSenseSync";
import { toUnixTimestamp } from "../../utils/unixTimestamp";

export const typesenseChangeStreamMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const typesense: Client = await initializeTypesenseClient();
    const mongodbOptions = { monitorCommands: true };
    const uri =
      "mongodb+srv://userAdmin:bzYEFdNjMPYhJ79b@cluster0.kuxaltu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri, mongodbOptions);
    await client.connect();

    const collections = ["users", "profiles"];
    const changeStreams = collections.map((collectionName) => {
      const collection = client.db("test").collection(collectionName);
      // console.log(collection,'typesense collection');
      const changeStream = collection.watch();
   

      changeStream.on("change", async (change) => {
        console.log(change.operationType, "opertaion type");
        console.log("event captureed");
        await handleChangeAndUpdateTypesense(change, typesense, collectionName);
      });

      return changeStream;
    });

    setTimeout(() => {
      console.log("Closing the change streams");
      changeStreams.forEach((changeStream) => changeStream.close());
    }, 60000);
    next();
  } catch (error) {
    console.error("Error setting up Typesense change streams:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleChangeAndUpdateTypesense(change: any, typesense: Client, collectionName: string) {
  console.log("handler called");
  if (change.operationType === "insert") {
    const document = change.fullDocument;
    const createdAtTimestamp = toUnixTimestamp(new Date(document.createdAt));
    const updatedAtTimestamp = toUnixTimestamp(new Date(document.updatedAt));
    document.createdAt = createdAtTimestamp;
    document.updatedAt = updatedAtTimestamp;
    console.log(`Insert operation in collection: ${collectionName}`);

    await upsertDocumentInTypesense(document, typesense, collectionName);
  } else if (change.operationType === "update") {
    const documentKey = change.documentKey;
    const updatedFields = change.updateDescription.updatedFields;
    console.log(updatedFields, "updated");
    console.log(`Update operation in collection: ${collectionName}`);
    if (updatedFields.updatedAt) {
      // Convert the updatedAt timestamp to BigInt and then to a string
      const updatedAtTimestamp = toUnixTimestamp(new Date(updatedFields.updatedAt));
      updatedFields.updatedAt = updatedAtTimestamp;

      await updateDocumentInTypesense(documentKey, updatedFields, typesense, collectionName);
    }
  } else if (change.operationType === "delete") {
    console.log("deletehandler");
    const documentKey = change.documentKey;
    console.log(`Delete operation in collection: ${collectionName}`);

    await deleteDocumentInTypesense(documentKey, typesense, collectionName);
  }
}

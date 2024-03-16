/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import TypesenseClient from "../../utils/typesense/typesenseClient";
import {
  usersCollectionSchema,
  enquiriesCollectionSchema,
  profilesCollectionSchema,
} from "../../utils/typesense/collectionCreator";
import MongoClient from "../../utils/typesense/mongoClient";
import updateTypesenseOnChange from "../../utils/typesense/typeSenseOnChange";

// Middleware to initialize Typesense collections and set up MongoDB change streams
const initializeTypesense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Initialize Typesense client
    const client = await TypesenseClient.initializeTypesenseClient();
    const collections = await client.collections().retrieve();
    const collectionNames = collections.map((collection) => collection.name);

    // Create Typesense collections if they don't exist
    if (!collectionNames.includes("users")) {
      await client.collections().create(usersCollectionSchema);
    }
    if (!collectionNames.includes("profiles")) {
      await client.collections().create(profilesCollectionSchema);
    }
    if (!collectionNames.includes("enquiries")) {
      await client.collections().create(enquiriesCollectionSchema);
    }

    // Connect to MongoDB
    const mongoClient = MongoClient.createMongoClient();
    await MongoClient.connectMongo(mongoClient);
    const mongoCollections = await MongoClient.listCollections(mongoClient);

    // Set up change streams for MongoDB collections
    mongoCollections.map((collectionName) => {
      const collection = mongoClient.db("test").collection(collectionName);
      const changeStream = collection.watch([], { fullDocument: "updateLookup" });

      // Listen for change events
      changeStream.on("change", async (changeEvent: { operationType: any }) => {
        await updateTypesenseOnChange(changeEvent, client, collectionName);
      });

      return changeStream;
    });

    // Move to the next middleware
    next();
  } catch (error) {
    console.error("Error setting up Typesense collections:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default initializeTypesense;

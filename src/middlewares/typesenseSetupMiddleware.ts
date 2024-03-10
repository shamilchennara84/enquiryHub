import { Request, Response, NextFunction } from "express";
import initializeTypesenseClient from "../../utils/services/typesenseClient"; 
import {  enquiriesCollectionSchema, profilesCollectionSchema, usersCollectionSchema } from "../../utils/services/collectionCreator";

export const typesenseSetupMiddleware = async (req: Request, res: Response, next: NextFunction) => {
 try {
    console.log("typesenseSetupMiddleware");
    const userSchema = usersCollectionSchema
    const userProfileSchema =  profilesCollectionSchema
    const enquirySchema = enquiriesCollectionSchema
    const client = await initializeTypesenseClient();

  
    const collections = await client.collections().retrieve();
    const collectionNames = collections.map((collection) => collection.name);

     if (!collectionNames.includes("users")) {
       await client.collections().create(userSchema);
       console.log("User Profiles collection created in Typesense.");
     }

    if (!collectionNames.includes("profiles")) {
      await client.collections().create(userProfileSchema);
      console.log("User Profiles collection created in Typesense.");
    }

    if (!collectionNames.includes("enquiries")) {
      await client.collections().create(enquirySchema); 
      console.log("Enquiries collection created in Typesense.");
    }

    next();
 } catch (error) {
    console.error("Error setting up Typesense collections:", error);
    res.status(500).json({ error: "Internal server error" });
 }
}
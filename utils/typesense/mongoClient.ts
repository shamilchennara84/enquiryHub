import { MongoClient, ChangeStream } from "mongodb";
import config from "../../config/config";

const mongoDBClient = {
  // Function to connect to MongoDB
  connectMongo: async function (client: MongoClient): Promise<void> {
    try {
      await client.connect();
    } catch (error) {
      console.error(error);
    }
  },

  // Function to close the MongoDB connection
  closeMongo: async function (client: MongoClient): Promise<void> {
    try {
      await client.close();
    } catch (error) {
      console.error(error);
    }
  },

  // Function to list collections in a database
  listCollections: async function (client: MongoClient): Promise<string[]> {
    const collections = await client.db(config.mongoDBName).listCollections().toArray();
    return collections.map((collection) => collection.name);
  },

  // Function to set up a change stream on a collection
  changeStreams: async function (
    client: MongoClient,
    databaseName: string,
    collectionName: string,
  ): Promise<ChangeStream<Document>> {
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);
    console.log(db, collection);
    return collection.watch([], { fullDocument: "updateLookup" });
  },

  // Function to create a new MongoClient instance
  createMongoClient: function (): MongoClient {
    const mongodbOptions = { monitorCommands: true };
    const uri = config.mongo.uri;
    return new MongoClient(uri, mongodbOptions);
  },
};

export default mongoDBClient;

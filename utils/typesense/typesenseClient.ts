import { Client, Errors } from "typesense";
import config from "../../config/config";

// Initialize Typesense client
const TypesenseClient = {
  initializeTypesenseClient: async () => {
    const client = new Client({
      nodes: [
        {
          host: config.typesenseHost!,
          port: 443,
          protocol: "https",
        },
      ],
      apiKey: config.typesenseAdminApiKey!,
      connectionTimeoutSeconds: 2,
    });
    return client;
  },

  // Import documents into a collection
  importDocuments: async (
    client: Client,
    collectionName: string,
    documents: Record<string, unknown>[],
  ): Promise<void> => {
    try {
      await client.collections(collectionName).documents().import(documents, { action: "create" });
    } catch (error) {
      console.error("Error importing documents:", error);
      throw error;
    }
  },

  // Insert a document into a collection
  insertDocument: async (client: Client, collectionName: string, document: Record<string, unknown>): Promise<void> => {
    try {
      const documentId = document._id;
      await client
        .collections(collectionName)
        .documents()
        .upsert({ id: documentId, ...document });
    } catch (error) {
      console.error("Error inserting document:", error);
      throw error;
    }
  },

  // Update a document in a collection
  updateDocument: async (
    client: Client,
    collectionName: string,
    updatedDocument: Record<string, unknown>,
  ): Promise<void> => {
    try {
      await client.collections(collectionName).documents().upsert(updatedDocument);
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  },

  // Delete a document from a collection
  deleteDocument: async (client: Client, collectionName: string, id: string): Promise<void> => {
    try {
      await client.collections(collectionName).documents(id).delete();
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  },

  // Replace a document in a collection
  replaceDocument: async (
    client: Client,
    collectionName: string,
    id: string,
    document: Record<string, unknown>,
  ): Promise<void> => {
    try {
      await client.collections(collectionName).documents(id).delete();
    } catch (err) {
      if (err instanceof Errors.ObjectNotFound) {
        return;
      }
      throw err;
    }
    try {
      await client.collections(collectionName).documents().create(document);
    } catch (error) {
      console.error("Error replacing document:", error);
      throw error;
    }
  },

  // Drop a collection
  dropCollection: async (client: Client, collectionName: string): Promise<void> => {
    try {
      await client.collections(collectionName).delete();
    } catch (error) {
      console.error("Error dropping collection:", error);
      throw error;
    }
  },

  // Rename a collection
  renameCollection: async (client: Client, collectionName: string, newCollectionName: string): Promise<void> => {
    const aliased_collection = {
      collection_name: collectionName,
    };
    try {
      await client.aliases().upsert(newCollectionName, aliased_collection);
    } catch (error) {
      console.error("Error renaming collection:", error);
      throw error;
    }
  },

  // Check a collection
  checkCollection: async (client: Client, collectionName: string): Promise<number | undefined> => {
    try {
      const result = await client.collections(collectionName).retrieve();
      return result.num_documents;
    } catch (err) {
      if (err instanceof Errors.ObjectNotFound) {
        return undefined;
      }
      throw err;
    }
  },
};

export default TypesenseClient;

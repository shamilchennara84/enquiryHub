import config from "../../config/config";
import typesense from "typesense";

async function initializeTypesenseClient() {
  try {
    const client = new typesense.Client({
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
  } catch (error) {
    console.error("Error initializing Typesense client:", error);
    throw error;
  }
}

export default initializeTypesenseClient;

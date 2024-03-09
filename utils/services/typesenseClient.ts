import config from "config/config";
import typesense from "typesense";

export const client = new typesense.Client({
  nodes: [
    {
      host: config.typesenseHost!,
      port: 443,
      protocol: "http",
    },
  ],
  apiKey: config.typesenseReadOnlyApiKey!,
  connectionTimeoutSeconds: 2,
});








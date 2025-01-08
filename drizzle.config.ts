// drizzle.config.ts
import { Config } from "drizzle-kit";
import { userInputs, registrations, reviews } from "./src/db/schema";

export default {
  schema: "./src/db/schema.ts", // Path to your schema file
  out: "./drizzle_migrations", // Directory for migration files
  dialect: "sqlite", // Specify the dialect as "sqlite" for Cloudflare D1
} as Config;

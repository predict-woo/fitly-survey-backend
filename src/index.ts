// src/index.ts
import { Hono } from "hono";
import { createDb, userInputs, registrations, reviews } from "./db/schema";
import {
  UserInput,
  RegistrationInfo,
  ReviewInfo,
  Env,
  Variables,
} from "./types";
import { cors } from "hono/cors";
import { eq } from "drizzle-orm";

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

// Add CORS middleware
app.use("/*", cors());

// Initialize Drizzle ORM
app.use(async (c, next) => {
  const db = createDb(c.env.DB as D1Database);
  c.set("db", db);
  await next();
});

app.get("/", (c) => c.text("Hello World"));

// API to store UserInput at /survey
app.post("/survey", async (c) => {
  const db = c.get("db");
  const input = await c.req.json<UserInput>();

  const result = await db
    .insert(userInputs)
    .values({
      ...input,
      allergy: JSON.stringify(input.allergy),
      supplementUsedType: JSON.stringify(input.supplementUsedType),
      supplementImportance: JSON.stringify(input.supplementImportance),
      supplementForm: JSON.stringify(input.supplementForm),
    })
    .run();

  return c.json({ key: result.meta.last_row_id });
});

// API to store RegistrationInfo at /registration
app.post("/registration", async (c) => {
  const db = c.get("db");
  const info = await c.req.json<RegistrationInfo>();

  await db.insert(registrations).values(info).run();
  return c.json({ success: true });
});

// API to store ReviewInfo at /review
app.post("/review", async (c) => {
  const db = c.get("db");
  const review = await c.req.json<ReviewInfo>();

  await db.insert(reviews).values(review).run();
  return c.json({ success: true });
});

// Helper function to convert data to CSV with UTF-8 BOM
const convertToCSV = (data: any[]) => {
  if (data.length === 0) return "\uFEFF"; // Add BOM for empty files

  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(",")];

  for (const row of data) {
    const values = headers.map((header) => {
      const val = row[header];
      let csvVal = "";

      if (val === null || val === undefined) {
        csvVal = "";
      } else if (
        typeof val === "string" &&
        (val.startsWith("[") || val.startsWith("{"))
      ) {
        // Handle JSON strings
        csvVal = val.replace(/"/g, '""');
      } else {
        csvVal = String(val).replace(/"/g, '""');
      }

      // Always wrap in quotes to handle special characters
      return `"${csvVal}"`;
    });
    csvRows.push(values.join(","));
  }

  // Add BOM at the start of the string
  return "\uFEFF" + csvRows.join("\n");
};

// Route to export user inputs
app.get("/export/user-inputs", async (c) => {
  const db = c.get("db");
  const data = await db.select().from(userInputs);
  const csv = convertToCSV(data);

  c.header("Content-Type", "text/csv; charset=utf-8");
  c.header("Content-Disposition", "attachment; filename=user_inputs.csv");
  return c.text(csv);
});

// Route to export registrations
app.get("/export/registrations", async (c) => {
  const db = c.get("db");
  const data = await db.select().from(registrations);
  const csv = convertToCSV(data);

  c.header("Content-Type", "text/csv; charset=utf-8");
  c.header("Content-Disposition", "attachment; filename=registrations.csv");
  return c.text(csv);
});

// Route to export reviews
app.get("/export/reviews", async (c) => {
  const db = c.get("db");
  const data = await db.select().from(reviews);
  const csv = convertToCSV(data);

  c.header("Content-Type", "text/csv; charset=utf-8");
  c.header("Content-Disposition", "attachment; filename=reviews.csv");
  return c.text(csv);
});

export default app;

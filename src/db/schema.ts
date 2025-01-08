// src/db/schema.ts
import { drizzle } from "drizzle-orm/d1";
import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";
import { D1Database } from "@cloudflare/workers-types";

export const userInputs = sqliteTable("user_inputs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  experience: integer("experience"),
  age: integer("age"),
  height: real("height"),
  weight: real("weight"),
  style: text("style"),
  goal: text("goal"),
  frequency: text("frequency"),
  duration: text("duration"),
  time: text("time"),
  allergy: text("allergy"),
  supplementUsed: text("supplementUsed"),
  supplementUsedType: text("supplementUsedType"),
  supplementImportance: text("supplementImportance"),
  supplementForm: text("supplementForm"),
  price: real("price"),
});

export const registrations = sqliteTable("registrations", {
  id: integer("id").primaryKey(),
  email: text("email"),
});

export const reviews = sqliteTable("reviews", {
  id: integer("id").primaryKey(),
  star: integer("star"),
  review: text("review"),
});

export function createDb(connection: D1Database) {
  return drizzle(connection);
}

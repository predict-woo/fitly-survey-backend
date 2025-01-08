import { createDb } from "./db/schema";

// src/types.ts
export type UserInput = {
  name: string;
  experience: number;
  age: number;
  height: number;
  weight: number;
  style: string;
  goal: string;
  frequency: string;
  duration: string;
  time: string;
  allergy: string[];
  supplementUsed: string;
  supplementUsedType: string[];
  supplementImportance: string[];
  supplementForm: string[];
  price: number;
};

export type RegistrationInfo = {
  id: number;
  email: string;
};

export type ReviewInfo = {
  id: number;
  star: number;
  review: string;
};

export interface Env {
  DB: D1Database;
}

export interface Variables {
  db: ReturnType<typeof createDb>;
}

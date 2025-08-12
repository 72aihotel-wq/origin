import {
  users,
  homestays,
  type User,
  type UpsertUser,
  type InsertHomestay,
  type Homestay,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Homestay operations
  createHomestay(userId: string, homestay: InsertHomestay): Promise<Homestay>;
  getHomestaysByUser(userId: string): Promise<Homestay[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async createHomestay(userId: string, homestayData: InsertHomestay): Promise<Homestay> {
    const [homestay] = await db
      .insert(homestays)
      .values({
        ...homestayData,
        userId,
      })
      .returning();
    return homestay;
  }

  async getHomestaysByUser(userId: string): Promise<Homestay[]> {
    return await db.select().from(homestays).where(eq(homestays.userId, userId));
  }
}

export const storage = new DatabaseStorage();

import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const homestays = pgTable("homestays", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  ten: text("ten").notNull(),
  diaChí: text("dia_chi").notNull(),
  sdt: text("sdt").notNull(),
  email: text("email").default(""),
  website: text("website").default(""),
  dichVu: text("dich_vu").array().default([]),
  quanAn: text("quan_an").default(""),
  checkin: text("checkin").default(""),
  luuY: text("luu_y").default(""),
  faq: jsonb("faq").$type<Array<{q: string, a: string}>>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertHomestaySchema = createInsertSchema(homestays).omit({
  id: true,
  userId: true,
  createdAt: true,
}).extend({
  email: z.string().optional().default(""),
  website: z.string().optional().default(""),
  quanAn: z.string().optional().default(""),
  checkin: z.string().optional().default(""),
  luuY: z.string().optional().default(""),
  faq: z.array(z.object({
    q: z.string().min(1, "Câu hỏi không được để trống"),
    a: z.string().min(1, "Câu trả lời không được để trống")
  })).optional().default([]),
  dichVu: z.array(z.string()).optional().default([]),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertHomestay = z.infer<typeof insertHomestaySchema>;
export type Homestay = typeof homestays.$inferSelect;

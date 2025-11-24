import { drizzle } from "drizzle-orm/neon-serverless";
import { neonConfig, Pool } from "@neondatabase/serverless";
import ws from "ws";
import * as schema from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import type {
  User,
  InsertUser,
  NewsItem,
  InsertNewsItem,
  ContactSubmission,
  InsertContactSubmission,
} from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be a Neon postgres connection string",
  );
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // News methods
  getAllNews(): Promise<NewsItem[]>;
  getNewsById(id: number): Promise<NewsItem | undefined>;
  createNews(news: InsertNewsItem): Promise<NewsItem>;
  updateNews(id: number, news: Partial<InsertNewsItem>): Promise<NewsItem | undefined>;
  deleteNews(id: number): Promise<boolean>;

  // Contact methods
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
}

class DrizzleStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.username, username))
      .limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db
      .insert(schema.users)
      .values(insertUser)
      .returning();
    return result[0];
  }

  // News methods
  async getAllNews(): Promise<NewsItem[]> {
    return await db
      .select()
      .from(schema.newsItems)
      .orderBy(desc(schema.newsItems.createdAt));
  }

  async getNewsById(id: number): Promise<NewsItem | undefined> {
    const result = await db
      .select()
      .from(schema.newsItems)
      .where(eq(schema.newsItems.id, id))
      .limit(1);
    return result[0];
  }

  async createNews(news: InsertNewsItem): Promise<NewsItem> {
    const result = await db
      .insert(schema.newsItems)
      .values(news)
      .returning();
    return result[0];
  }

  async updateNews(id: number, news: Partial<InsertNewsItem>): Promise<NewsItem | undefined> {
    const result = await db
      .update(schema.newsItems)
      .set(news)
      .where(eq(schema.newsItems.id, id))
      .returning();
    return result[0];
  }

  async deleteNews(id: number): Promise<boolean> {
    const result = await db
      .delete(schema.newsItems)
      .where(eq(schema.newsItems.id, id))
      .returning();
    return result.length > 0;
  }

  // Contact methods
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const result = await db
      .insert(schema.contactSubmissions)
      .values(submission)
      .returning();
    return result[0];
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db
      .select()
      .from(schema.contactSubmissions)
      .orderBy(desc(schema.contactSubmissions.createdAt));
  }
}

export const storage = new DrizzleStorage();

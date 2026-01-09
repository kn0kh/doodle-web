import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const readyVectors = sqliteTable("readyVectors", {
  id: integer("ID").primaryKey({ autoIncrement: true }),
  word: text().notNull(),
  frequenzklasse: integer(),
  wortklasse: text(),
  vector: text().notNull(),
});

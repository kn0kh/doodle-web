import { drizzle } from "drizzle-orm/libsql";
import { gte, isNotNull, and, sql, eq } from "drizzle-orm";
import { createClient } from "@libsql/client";
import { readyVectors } from "./schema";

const client = createClient({
  url: `file:${process.env.DB_FILE_NAME!}`,
});
const db = drizzle(client);

export async function getRandomSecret(): Promise<number> {
  const result = await db
    .select()
    .from(readyVectors)
    .where(
      and(
        isNotNull(readyVectors.frequenzklasse),
        gte(readyVectors.frequenzklasse, 4),
        eq(readyVectors.wortklasse, "Substantiv")
      )
    )
    .orderBy(sql`RANDOM()`)
    .limit(1)
    .get()
    .catch((error) => {
      console.error("[ERROR] Error in the DB or Query:", error.message);
      return null;
    });

  if (!result) {
    console.error(
      "[ERROR] getRandomWord() at @/db/index.ts returned null or undefined"
    );
    throw Error("Unexpected error selecting the secret Word.");
  }
  return result.id;
}

export async function getVectorfromWord(word: string): Promise<string> {
  const result = await db
    .select()
    .from(readyVectors)
    .where(eq(readyVectors.word, word))
    .limit(1)
    .get()
    .catch((error) => {
      console.error("Error fetching vector from word:", error.message);
      return null;
    });
  if (!result) {
    console.error(
      `[ERROR] getVectorfromWord(${word}) didn't found the word in the database`
    );
    throw new Error("Word not found in database");
  } else {
    return result.vector;
  }
}

export async function getWordfromId(id: number): Promise<string> {
  const result = await db
    .select()
    .from(readyVectors)
    .where(eq(readyVectors.id, id))
    .limit(1)
    .get()
    .catch((error) => {
      console.error("Error fetching word from id:", error.message);
      return null;
    });
  if (!result) {
    console.error(
      `[ERROR] getWordfromId(${id}) didn't found the word in the database`
    );
    throw new Error("Word not found in database");
  } else {
    return result.word;
  }
}

export async function getVectorfromId(id: number): Promise<string> {
  const result = await db
    .select()
    .from(readyVectors)
    .where(eq(readyVectors.id, id))
    .limit(1)
    .get()
    .catch((error) => {
      console.error("Error finding vector from id:", error.message);
      return null;
    });
  if (!result) {
    console.error(
      `[ERROR] getVectorfromId(${id}) didn't found the vector from id`
    );
    throw new Error("Coulnd't find secret Vector");
  } else {
    return result.vector;
  }
}

export async function getDatafromWord(word: string): Promise<{
  id: number;
  word: string;
  frequenzklasse: number | null;
  wortklasse: string | null;
  vector: string;
}> {
  const result = await db
    .select()
    .from(readyVectors)
    .where(eq(readyVectors.word, word))
    .limit(1)
    .get()
    .catch((error) => {
      console.error("[ERROR] Error in DB or query:", error.message);
      return null;
    });
  if (!result) {
    console.error(
      `[ERROR] getDatafromWord(${word}) at @/db/index.ts returned null or undefined`
    );
    throw new Error(
      "Unexpected Error occured. Unable to get data on this Word"
    );
  } else {
    return result;
  }
}

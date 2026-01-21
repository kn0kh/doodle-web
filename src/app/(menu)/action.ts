"use server";
import { getRandomSecret, getWordfromId } from "@/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Difficulty } from "@/utils/types";
import { HierarchicalNSW } from "hnswlib-node";

let cachedVectorIndex: Promise<HierarchicalNSW> | null = null;

export async function getIndex(): Promise<HierarchicalNSW> {
  if (cachedVectorIndex) {
    return cachedVectorIndex;
  }

  const dim = 300;
  const index = new HierarchicalNSW("cosine", dim);
  const vectorsStorePath = process.env.VECTORS_STORE;

  if (!vectorsStorePath) {
    console.error(
      "[ERROR] VECTORS_STORE is undefined in environment variables at /app/action.ts",
    );
    throw Error("Unexpected Error while retrieving environment variables");
  }
  try {
    await index.readIndex(vectorsStorePath);
  } catch (error) {
    console.error(
      "[ERROR] Failed to read index from vectors store path:",
      error,
    );
    cachedVectorIndex = null;
    throw Error("Unexpected Error while reading HNSW index from storage");
  }
  console.log("[LOG]Index loaded and cached");
  cachedVectorIndex = Promise.resolve(index);

  return index;
}

export async function startGame(difficulty: Difficulty) {
  const secretId = await getRandomSecret(difficulty);

  const cookieStore = await cookies();
  cookieStore.set("secretWordId", secretId.toString());

  // only for dev
  const secretWord = await getWordfromId(secretId);
  console.log("Secret Word: ", secretWord);
  // remove in prod

  await getIndex();

  redirect("/game");
}

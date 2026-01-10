"use server";
import { cookies } from "next/headers";
import { getVectorfromId, getVectorfromWord } from "@/db";
import { redirect } from "next/navigation";

function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

  return (dotProduct / (magnitudeA * magnitudeB)) * 100;
}

export async function compare(prevState: any, formData: FormData) {
  console.log("[LOG] Retrieving input...");
  const word = formData.get("guessedWord")?.toString();
  if (!word) {
    console.error("[ERROR] Invalid input in formData.get() at /game/action.ts");
    return { ...prevState };
  }
  console.log("[SUCCESS] Retrieved input ");

  console.log("[LOG] Getting vector of the input...");
  let wordVector: number[];
  try {
    wordVector = JSON.parse(await getVectorfromWord(word));
  } catch (error) {
    console.error(`[ERROR] getVectorfromWord(${word}) didn't found the word`);
    return { ...prevState, score: "Word not in Database" };
  }
  console.log("[SUCCESS] Got the vector of the input");

  console.log("[LOG] Retrieving cookies...");
  const cookieStore = await cookies();
  const secretWordId = cookieStore.get("secretWordId")?.value;
  if (!secretWordId) {
    console.error(
      "[ERROR] Got undefined from cookieStore.get('secretWordId') at /game/action.ts"
    );
    throw Error("Unexpected Error while retrieving cookies");
  }
  console.log("[SUCCESS] Retrieved cookies");

  console.log("[LOG] Retrieving secret vector...");
  const secretVector = JSON.parse(await getVectorfromId(Number(secretWordId)));
  console.log("[SUCCESS] Retrieved secret vector");

  console.log("[LOG] Calculating similarity...");
  const score = cosineSimilarity(wordVector, secretVector);
  console.log("[SUCCESS] Computed score for", score);

  const newGuesses = [
    ...prevState.guesses,
    { id: crypto.randomUUID(), word: word, score: Math.round(score) },
  ].sort((a, b) => b.score - a.score);

  if (Math.round(score) === 100) {
    return { ...prevState, won: true };
  }

  return { ...prevState, guesses: newGuesses };
}

export async function goBack() {
  redirect("/");
}

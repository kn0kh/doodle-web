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
  const word = formData.get("guessedWord")?.toString();
  if (!word) {
    console.error("[ERROR] Invalid input in formData.get() at /game/action.ts");
    return { ...prevState, status: { error: true, message: "Invalid input" } };
  }

  let wordVector: number[];
  try {
    wordVector = JSON.parse(await getVectorfromWord(word));
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { ...prevState, status: { error: true, message: errorMessage } };
  }

  const cookieStore = await cookies();
  const secretWordId = cookieStore.get("secretWordId")?.value;
  if (!secretWordId) {
    console.error(
      "[ERROR] Got undefined from cookieStore.get('secretWordId') at /game/action.ts"
    );
    throw Error("Unexpected Error while retrieving cookies");
  }

  const secretVector = JSON.parse(await getVectorfromId(Number(secretWordId)));

  const score = cosineSimilarity(wordVector, secretVector);

  const newGuesses = [
    ...prevState.guesses,
    { id: crypto.randomUUID(), word: word, score: Math.round(score) },
  ].sort((a, b) => b.score - a.score);

  if (Math.round(score) === 100) {
    return { ...prevState, won: true, status: { error: false } };
  }

  return { ...prevState, guesses: newGuesses, status: { error: false } };
}

export async function goBack() {
  redirect("/");
}

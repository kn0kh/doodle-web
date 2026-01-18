"use server";
import { cookies } from "next/headers";
import { getVectorfromId, getVectorfromWord, getWordfromId } from "@/db";
import { redirect } from "next/navigation";
import { HierarchicalNSW } from "hnswlib-node";

let cachedIndex: HierarchicalNSW | null = null;

function getIndex(): HierarchicalNSW {
  if (cachedIndex) {
    return cachedIndex;
  }

  const dim = 300;
  const index = new HierarchicalNSW("cosine", dim);
  const vectorsStorePath = process.env.VECTORS_STORE;

  if (!vectorsStorePath) {
    console.error(
      "[ERROR] VECTORS_STORE is undefined in environment variables at /game/action.ts",
    );
    throw Error("Unexpected Error while retrieving environment variables");
  }
  try {
    index.readIndexSync(vectorsStorePath);
  } catch (error) {
    console.error(
      "[ERROR] Failed to read index from vectors store path:",
      error,
    );
    throw Error("Unexpected Error while reading HNSW index from storage");
  }
  console.log("Index loaded and cached");
  cachedIndex = index;

  return cachedIndex;
}

function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

  return (dotProduct / (magnitudeA * magnitudeB)) * 100;
}

export async function compare(
  prevState: {
    guesses: Array<{ id: string; word: string; score: number }>;
    won: boolean;
    status: { error: boolean; message: string };
  },
  formData: FormData,
) {
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
      "[ERROR] Got undefined from cookieStore.get('secretWordId') at /game/action.ts",
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
    return {
      ...prevState,
      guesses: newGuesses,
      won: true,
      status: { error: false, message: "" },
    };
  }

  return {
    ...prevState,
    guesses: newGuesses,
    status: { error: false, message: "" },
  };
}

export async function goBack() {
  redirect("/");
}

export async function getHint(prevState: {
  hints: Array<{ id: string; hint: string; similarity: number }>;
  times: number;
  usedup: boolean;
  status: { error: boolean; message: string };
}) {
  if (prevState.usedup) {
    return {
      ...prevState,
      status: { error: true, message: "No more hints available" },
    };
  }
  const k = 12;
  const index = getIndex();

  const cookieStore = await cookies();
  const secretWordId = cookieStore.get("secretWordId")?.value;
  if (!secretWordId) {
    console.error(
      "[ERROR] Got undefined from cookieStore.get('secretWordId') at /game/action.ts",
    );
    throw Error("Unexpected Error while retrieving cookies");
  }

  const queryVector = JSON.parse(await getVectorfromId(Number(secretWordId)));
  const result = index.searchKnn(queryVector, k);

  let hintIndex: number;
  let newTimes: number;
  let usedup = prevState.usedup || false;
  switch (prevState.times) {
    case 0:
      newTimes = 1;
      hintIndex = 11;
      break;
    case 1:
      newTimes = 2;
      hintIndex = 7;
      break;
    case 2:
      newTimes = prevState.times;
      usedup = true;
      hintIndex = 3;
      break;
    default:
      throw Error("Error getting hint: times exceeded limit");
  }

  let hint: string;
  try {
    hint = await getWordfromId(result.neighbors[hintIndex]);
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { ...prevState, status: { error: true, message: errorMessage } };
  }

  const distance = 1 - result.distances[hintIndex];
  const newHints = [
    {
      id: crypto.randomUUID(),
      hint: hint,
      similarity: Math.round(distance * 100),
    },
    ...prevState.hints,
  ];

  return {
    ...prevState,
    hints: newHints,
    times: newTimes,
    usedup: usedup,
    status: { error: false, message: "" },
  };
}

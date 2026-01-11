"use server";
import { getRandomSecret, getWordfromId } from "@/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Difficulty } from "@/utils/types";

export async function startGame(difficulty: Difficulty) {
  console.log("Starting game with difficulty:", difficulty);
  const secretId = await getRandomSecret(difficulty);

  const cookieStore = await cookies();
  cookieStore.set("secretWordId", secretId.toString());

  // only for dev
  const secretWord = await getWordfromId(secretId);
  console.log("Secret Word: ", secretWord);
  // remove in prod

  redirect("/game");
}

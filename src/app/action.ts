"use server";
import { getRandomSecret, getWordfromId } from "@/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function startGame() {
  console.log("[LOG] Starting new game...");
  const secretId = await getRandomSecret();
  console.log("[SUCCESS] Picked secret word: ", secretId);

  console.log("[LOG] Creating new cookies...");
  const cookieStore = await cookies();
  cookieStore.set("secretWordId", secretId.toString());
  console.log("[SUCCESS] Cookies created");

  // only for dev
  const secretWord = await getWordfromId(secretId);
  console.log("Secret Word: ", secretWord);
  // remove in prod

  redirect("/game");
}

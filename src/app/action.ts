"use server";
import { getRandomSecret, getWordfromId } from "@/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function startGame() {
  const secretId = await getRandomSecret();

  const cookieStore = await cookies();
  cookieStore.set("secretWordId", secretId.toString());

  // only for dev
  const secretWord = await getWordfromId(secretId);
  console.log("Secret Word: ", secretWord);
  // remove in prod

  redirect("/game");
}

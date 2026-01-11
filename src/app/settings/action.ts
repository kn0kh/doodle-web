"use server";

import { LanguageShort, Difficulty } from "@/utils/types";
import { cookies } from "next/headers";

export async function setLang(language: LanguageShort) {
  const cookieStore = await cookies();
  cookieStore.set("language", language);
}
export async function setDiff(difficulty: Difficulty) {
  const cookieStore = await cookies();
  cookieStore.set("difficulty", difficulty);
}

export async function getLang(): Promise<LanguageShort> {
  const cookieStore = await cookies();
  return (cookieStore.get("language")?.value as LanguageShort) || "de";
}

export async function getDiff(): Promise<Difficulty> {
  const cookieStore = await cookies();
  return (cookieStore.get("difficulty")?.value as Difficulty) || "normal";
}

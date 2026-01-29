export type Guess = {
  id: string;
  word: string;
  score: number;
  vecDir: [number, number, number];
};

export type Hint = {
  id: string;
  hint: string;
  similarity: number;
};

export type LanguageShort = "de" | "en" | "fr" | "es" | "it" | "ru" | "test";
export type Difficulty = "easy" | "normal" | "hard" | "random";

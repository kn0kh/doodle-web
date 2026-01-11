export type Guess = {
  id: string;
  word: string;
  score: number;
};

export type LanguageShort = "de" | "en" | "fr" | "es" | "it" | "ru" | "test";
export type Difficulty = 0 | 1 | 2 | 3;

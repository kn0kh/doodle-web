"use client";

import { createContext, useContext, useState } from "react";
import { LanguageShort, Difficulty } from "@/utils/types";

type Settings = {
  language: LanguageShort;
  difficulty: Difficulty;
};

const GameSettingsContext = createContext<{
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
} | null>(null);

export function GameSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<Settings>({
    language: "de",
    difficulty: "easy",
  });

  return (
    <GameSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </GameSettingsContext.Provider>
  );
}

export const useGameSettings = () => useContext(GameSettingsContext);

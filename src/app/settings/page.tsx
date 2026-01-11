"use client";

import { LanguageShort, Difficulty } from "@/utils/types";
import { useGameSettings } from "@/context/game-settings-context";

export default function gameSettings() {
  const { settings, setSettings } = useGameSettings()!;
  return (
    <>
      <h2>Settings</h2>
      <hr></hr>
      <h3>Language</h3>
      <select
        name="selectLanguage"
        value={settings.language}
        onChange={(e) =>
          setSettings((prev) => ({
            ...prev,
            language: e.target.value as LanguageShort,
          }))
        }
      >
        <option value="de">Deutsch</option>
      </select>
      <br></br>
      <h3>Difficulty</h3>
      <select
        name="selectDiff"
        value={settings.difficulty}
        onChange={(e) =>
          setSettings((prev) => ({
            ...prev,
            difficulty: Number(e.target.value) as Difficulty,
          }))
        }
      >
        <option value="0">Easy</option>
        <option value="1">Normal</option>
        <option value="2">Hard</option>
        <option value="3">Impossible</option>
      </select>
    </>
  );
}

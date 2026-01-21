"use client";

import { LanguageShort, Difficulty } from "@/utils/types";
import { useGameSettings } from "@/context/game-settings-context";
import Link from "next/link";

export default function GameSettings() {
  const { settings, setSettings } = useGameSettings()!;
  return (
    <div className="menu">
      <header className="header" style={{ marginBottom: "2rem" }}>
        <h2 className="label-two">Settings</h2>
      </header>

      <main className="menu-panel settings-select">
        <h3 className="label-three">Language</h3>
        <select
          name="selectLanguage"
          style={{ marginBottom: "2rem" }}
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
        <h3 className="label-three">Difficulty</h3>
        <select
          name="selectDiff"
          value={settings.difficulty}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              difficulty: e.target.value as Difficulty,
            }))
          }
        >
          <option value="easy">Easy</option>
          <option value="normal">Normal</option>
          <option value="hard">Hard</option>
          <option value="random">Random</option>
        </select>
        <div className="btn-wrapper" style={{ marginTop: "4rem" }}>
          <Link href="/" className="btn back-btn">
            Back
          </Link>
        </div>
      </main>
    </div>
  );
}

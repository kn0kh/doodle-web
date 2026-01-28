"use client";

import { startGame } from "./action";
import Link from "next/link";
import { useGameSettings } from "@/context/game-settings-context";
import { Difficulty } from "@/utils/types";

function DifficultyLabel({ difficulty }: { difficulty: Difficulty }) {
  switch (difficulty) {
    case "easy":
      return <span style={{ color: "green" }}>EASY</span>;
    case "normal":
      return <span style={{ color: "yellow" }}>NORMAL</span>;
    case "hard":
      return <span style={{ color: "red" }}>HARD</span>;
    case "random":
      return (
        <span
          style={{
            backgroundImage:
              "linear-gradient(to right, red, orange, yellow, green, blue, violet)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          RANDOM
        </span>
      );
    default:
      return <span>UNKNOWN</span>;
  }
}

export default function Home() {
  const gameSettings = useGameSettings();
  if (!gameSettings) {
    throw new Error("Game settings not found. Please return to the main menu.");
  }
  return (
    <div className="menu">
      <header className="header">
        <h1 className="label">
          <i>Contextualle</i>
        </h1>
        <p className="under_label">Guess the secret word from context</p>
      </header>
      <main className="menu-panel">
        <p className="current-difficulty">
          <i>Current difficulty:</i>{" "}
          <DifficultyLabel difficulty={gameSettings.settings.difficulty} />
        </p>
        <form
          className="btn-wrapper"
          action={() => startGame(gameSettings.settings.difficulty)}
        >
          <button type="submit" className="btn">
            Start Game
          </button>
        </form>
        <Link className="btn-link" href="/settings">
          <u>Settings</u>
        </Link>
      </main>
    </div>
  );
}

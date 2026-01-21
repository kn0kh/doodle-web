"use client";

import { startGame } from "./action";
import { useGameSettings } from "@/context/game-settings-context";
import { useRouter } from "next/navigation";

export default function ErrorBoundary({ error }: { error: Error }) {
  const gameSettings = useGameSettings();
  const router = useRouter();
  if (!gameSettings) {
    return (
      <div>
        <p>Game settings not found. Please return to the main menu.</p>
        <button
          onClick={() => {
            router.push("/");
          }}
        >
          Go Back
        </button>
      </div>
    );
  }
  return (
    <>
      <p>{error.message}</p>
      <button
        onClick={() => {
          console.log("[LOG] Retrying to start the game");
          startGame(gameSettings.settings.difficulty);
        }}
      >
        Try again
      </button>
    </>
  );
}

"use client";

import { startGame } from "./action";
import { useGameSettings } from "@/context/game-settings-context";

export default function ErrorBoundary({ error }: { error: Error }) {
  const { settings } = useGameSettings()!;
  return (
    <>
      <p>{error.message}</p>
      <button
        onClick={() => {
          console.log("[LOG] Retrying to start the game");
          startGame(settings.difficulty);
        }}
      >
        Try again
      </button>
    </>
  );
}

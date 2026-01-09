"use client";

import { startGame } from "./action";

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <>
      <p>{error.message}</p>
      <button
        onClick={() => {
          console.log("[LOG] Retrying to start the game");
          startGame();
        }}
      >
        Try again
      </button>
    </>
  );
}

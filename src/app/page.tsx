"use client";

import { startGame } from "./action";
import Link from "next/link";
import { useGameSettings } from "@/context/game-settings-context";

export default function Home() {
  const { settings } = useGameSettings()!;
  return (
    <div>
      <h1>Vector of the Day</h1>
      <hr></hr>
      <form action={() => startGame(settings.difficulty)}>
        <button type="submit">Start Game</button>
      </form>
      <Link href="/settings">Settings</Link>
      <br></br>
      <p>
        <i>Current difficulty:</i> {settings.difficulty}
      </p>
    </div>
  );
}

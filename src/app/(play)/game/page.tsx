"use client";
import { useActionState, useEffect, useState } from "react";
import { compare, getHint } from "@/app/(play)/game/action";
import { Guess } from "@/utils/types";
import { initialGState, initialHState } from "@/utils/initialStates";
import GuessArea from "@/app/(play)/game/GuessArea";
import HintArea from "@/app/(play)/game/HintArea";
import SphereArea from "@/app/(play)/game/SphereArea";
import WinScreen from "./WinScreen";
import WastedScreen from "./WastedScreen";

export default function Game() {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [Gstate, handleGuess] = useActionState(compare, initialGState);
  const [Hstate, handleHint] = useActionState(getHint, initialHState);

  useEffect(() => {
    if (Gstate.ended) {
      localStorage.removeItem("Guesses");
      return;
    }
    const storedGuesses = localStorage.getItem("Guesses");
    const hasStoredGuesses = storedGuesses && storedGuesses !== "[]";

    if (Gstate.guesses.length === 0 && hasStoredGuesses) {
      try {
        setGuesses(JSON.parse(storedGuesses as string));
        return;
      } catch (error) {
        console.error("Failed to parse stored guesses:", error);
        localStorage.removeItem("Guesses");
      }
    }

    localStorage.setItem("Guesses", JSON.stringify(Gstate.guesses));
    setGuesses(Gstate.guesses);
  }, [Gstate]);

  return (
    <div className="game-layout-wrapper">
      {Gstate.ended === "won" ? (
        <WinScreen
          word={Gstate.guesses[0].word}
          numGuesses={Gstate.guesses.length}
        ></WinScreen>
      ) : Gstate.ended === "lost" ? (
        <WastedScreen />
      ) : (
        <>
          <SphereArea />
          <GuessArea
            GState={Gstate}
            handleGuess={handleGuess}
            guesses={guesses}
          />
          <HintArea HState={Hstate} handleHint={handleHint} />
        </>
      )}
    </div>
  );
}

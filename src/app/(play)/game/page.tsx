"use client";
import { useActionState } from "react";
import { compare, goBack, getHint } from "@/app/(play)/game/action";
import { Guess, Hint } from "@/utils/types";
import { getColor } from "@/utils/helpers";
import GuessArea from "@/app/(play)/game/GuessArea";
import HintArea from "@/app/(play)/game/HintArea";
import SphereArea from "@/app/(play)/game/SphereArea";

const initialGState: {
  guesses: Guess[];
  won: boolean;
  status: { error: boolean; message: string };
} = {
  guesses: [],
  won: false,
  status: { error: false, message: "" },
};

const initialHState: {
  hints: Hint[];
  times: number;
  usedup: boolean;
  status: { error: boolean; message: string };
} = {
  hints: [],
  times: 0,
  usedup: false,
  status: { error: false, message: "" },
};

export default function Game() {
  const [Gstate, handleGuess] = useActionState(compare, initialGState);
  const [Hstate, handleHint] = useActionState(getHint, initialHState);
  return (
    <div className="game-layout-wrapper">
      {Gstate.won ? (
        <>
          <p>YOU WON!!!</p>
          <p>It took you {Gstate.guesses.length} guesses</p>
          <form action={goBack}>
            <button type="submit">Go back</button>
          </form>
        </>
      ) : (
        <>
          <SphereArea />
          <GuessArea GState={Gstate} handleGuess={handleGuess} />
          <HintArea HState={Hstate} handleHint={handleHint} />
        </>
      )}
    </div>
  );
}

"use client";
import { useActionState } from "react";
import { compare, goBack, getHint } from "@/app/(play)/game/action";
import { Guess, Hint } from "@/utils/types";
import Link from "next/link";
import GuessArea from "@/app/(play)/game/GuessArea";
import HintArea from "@/app/(play)/game/HintArea";

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
    <>
      {Gstate.won ? (
        <div>
          <p>YOU WON!!!</p>
          <p>It took you {Gstate.guesses.length} guesses</p>
          <form action={goBack}>
            <button type="submit">Go back</button>
          </form>
        </div>
      ) : (
        <div>
          <GuessArea GState={Gstate} handleGuess={handleGuess} />
          <HintArea HState={Hstate} handleHint={handleHint} />
          <Link href="/">Surrender</Link>
        </div>
      )}
    </>
  );
}

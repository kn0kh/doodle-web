"use client";
import Form from "next/form";
import { useActionState } from "react";
import { compare, goBack, getHint } from "@/app/(play)/game/action";
import { Guess } from "@/utils/types";
import Link from "next/link";

const initialGState: {
  guesses: { id: string; word: string; score: number }[];
  won: boolean;
  status: { error: boolean; message: string };
} = {
  guesses: [],
  won: false,
  status: { error: false, message: "" },
};

const initialHState: {
  hints: { id: string; hint: string; similarity: number }[];
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
      {!Gstate.won && (
        <div>
          <Form action={handleGuess}>
            <input name="guessedWord"></input>
            <button type="submit">Test</button>
          </Form>
          {Hstate.usedup ? (
            <p>
              <i>No more hints available</i>
            </p>
          ) : (
            <Form action={handleHint}>
              <button type="submit">Hint</button>
            </Form>
          )}
          <ul>
            {Hstate.hints.map(
              (hintObj: { id: string; hint: string; similarity: number }) => (
                <li key={hintObj.id}>
                  {hintObj.hint}: {hintObj.similarity}%
                </li>
              ),
            )}
          </ul>
          {Hstate.status.error && (
            <div style={{ color: "red" }}>{Hstate.status.message}</div>
          )}
          {Gstate.status.error && (
            <div style={{ color: "red" }}>{Gstate.status.message}</div>
          )}
          <ol>
            {Gstate.guesses.map((guess: Guess) => (
              <li key={guess.id}>
                {guess.word}: {guess.score}%
              </li>
            ))}
          </ol>
        </div>
      )}
      {Gstate.won && (
        <div>
          <p>YOU WON!!!</p>
          <p>It took you {Gstate.guesses.length} guesses</p>
          <button
            onClick={() => {
              goBack();
            }}
          >
            Go back
          </button>
        </div>
      )}
      <Link href="/">Surrender</Link>
    </>
  );
}

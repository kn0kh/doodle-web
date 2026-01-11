"use client";
import Form from "next/form";
import { useActionState, useState } from "react";
import { compare, goBack } from "@/app/game/action";
import { Guess } from "@/utils/types";

const initialState = {
  guesses: [],
  won: false,
  status: { error: false, message: "" },
};

export default function Game() {
  const [state, formAction] = useActionState(compare, initialState);
  return (
    <>
      <Form action={formAction}>
        <input name="guessedWord"></input>
        <button type="submit">Test</button>
      </Form>
      {state.status.error && (
        <div style={{ color: "red" }}>{state.status.message}</div>
      )}
      {!state.won && (
        <ol>
          {state.guesses.map((guess: Guess) => (
            <li key={guess.id}>
              {guess.word}: {guess.score}%
            </li>
          ))}
        </ol>
      )}
      {state.won && (
        <div>
          <p>YOU WON!!!</p>
          <p>It took you {state.guesses.length + 1} guesses</p>
          <button
            onClick={() => {
              goBack();
            }}
          >
            Go back
          </button>
        </div>
      )}
    </>
  );
}

"use client";
import Form from "next/form";
import { useActionState } from "react";
import { compare, goBack } from "../game/action";

const initialState = {
  won: false,
  geussedWord: "",
  score: null,
};

export default function Game() {
  const [state, formAction, isPending] = useActionState(compare, initialState);

  return (
    <>
      <Form action={formAction}>
        <input name="guessedWord"></input>
        <button type="submit">Test</button>
      </Form>
      {state.won ? <p>YOU WON!!!</p> : <p>{state.score}</p>}
      {state.won && (
        <button
          onClick={() => {
            goBack();
          }}
        >
          Go back
        </button>
      )}
    </>
  );
}

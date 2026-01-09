"use client";
import Form from "next/form";
import { useActionState } from "react";
import { compare } from "../game/action";

const initialState = {
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
      <p>{!state.score ? "" : state.score}</p>
    </>
  );
}

import Form from "next/form";
import { Guess } from "@/utils/types";

const initialGState: {
  guesses: Guess[];
  won: boolean;
  status: { error: boolean; message: string };
} = {
  guesses: [],
  won: false,
  status: { error: false, message: "" },
};

export default function GuessArea({
  GState,
  handleGuess,
}: {
  GState: typeof initialGState;
  handleGuess: (payload: FormData) => void;
}) {
  return (
    <>
      <div>
        <Form action={handleGuess}>
          <input
            id="guessedWord"
            name="guessedWord"
            aria-label="Enter your guess"
          />
          <button type="submit">Guess</button>
        </Form>
      </div>
      {GState.status.error && (
        <div style={{ color: "red" }}>{GState.status.message}</div>
      )}
      <ol>
        {GState.guesses.map((guess: Guess) => (
          <li key={guess.id}>
            {guess.word}: {guess.score}%
          </li>
        ))}
      </ol>
    </>
  );
}

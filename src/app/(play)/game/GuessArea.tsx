import Form from "next/form";
import { Guess } from "@/utils/types";
import Link from "next/link";
import { getColor } from "@/utils/helpers";

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
    <div className="guess-area-wrapper">
      <h3 className="attempt-counter">
        <i>Attempt #{GState.guesses.length + 1}</i>
      </h3>
      <Form className="guess-container" action={handleGuess}>
        <div className="input-wrapper">
          <input
            name="guessedWord"
            className="word-input"
            placeholder="Enter your guess"
            autoFocus
          />
        </div>
        <div className="btn-wrapper guess-btn-wrapper">
          <button className="btn guess-btn" type="submit">
            Guess!
          </button>
        </div>
      </Form>
      {GState.status.error && (
        <div className="error-message">{GState.status.message}</div>
      )}
      <table className="guess-table">
        <tbody>
          {GState.guesses.map((guess: Guess, index: number) => (
            <tr
              key={guess.id}
              className={index % 2 !== 0 ? "odd-row" : "even-row"}
            >
              <td style={{ textAlign: "right" }}>{guess.word}</td>
              <td style={{ textAlign: "left", color: getColor(guess.score) }}>
                {guess.score}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/" className="btn-link" style={{ fontSize: "0.8rem" }}>
        <i>
          <u>Surrender</u>
        </i>
      </Link>
    </div>
  );
}

import Link from "next/link";

export default function WinScreen({
  word,
  numGuesses,
}: {
  word: string;
  numGuesses: number;
}) {
  return (
    <div className="win-screen-wrapper">
      <h2 className="label-two">
        <b>You WON!</b>
      </h2>
      <p>
        In <i className="highlight-word">{numGuesses} </i> guesses you finally
        guessed the word:
      </p>
      <h1 className="winning-word">
        <i className="highlight-word">{word}</i>
      </h1>
      <div className="btn-wrapper" style={{ marginTop: "2rem" }}>
        <Link href="/" className="btn back-btn">
          To Home
        </Link>
      </div>
    </div>
  );
}

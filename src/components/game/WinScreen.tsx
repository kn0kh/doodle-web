import Link from "next/link";

export default function WinScreen({
  word,
  numGuesses,
}: {
  word: string;
  numGuesses: number;
}) {
  return (
    <div className="center-flex" style={{ gridArea: "1 / 1 / -1 / -1" }}>
      <h2 className="label-two">
        <b>You WON!</b>
      </h2>
      <p>
        After <i className="highlight-word">{numGuesses}</i> attempts you
        finally guessed:
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

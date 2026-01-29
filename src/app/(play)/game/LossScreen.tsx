import Link from "next/link";

export default function LossScreen({ word }: { word: string }) {
  return (
    <div className="center-flex" style={{ gridArea: "1 / 1 / -1 / -1" }}>
      <h2 className="label-two">
        <b>You lost!</b>
      </h2>
      <p>The secret word was:</p>
      <h1 className="highlight-word">
        <i>{word}</i>
      </h1>
      <div className="btn-wrapper" style={{ marginTop: "2rem" }}>
        <Link href="/" className="btn back-btn">
          Go home and cry
        </Link>
      </div>
    </div>
  );
}

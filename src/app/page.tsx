import { startGame } from "./action";

export default function Home() {
  return (
    <div>
      <h1>Vector of the Day</h1>
      <hr></hr>
      <form action={startGame}>
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}

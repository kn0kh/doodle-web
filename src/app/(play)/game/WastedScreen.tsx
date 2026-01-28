export default function WastedScreen() {
  // get secret
  return (
    <div className="wasted-screen-wrapper">
      <h2>You lost!</h2>
      <p>The secret word was:</p>
      <h1 className="highlight-word"></h1>
    </div>
  );
}

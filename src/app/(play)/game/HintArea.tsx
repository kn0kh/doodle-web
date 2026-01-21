import Form from "next/form";
import { Hint } from "@/utils/types";

export default function HintArea({
  HState,
  handleHint,
}: {
  HState: {
    hints: Hint[];
    times: number;
    usedup: boolean;
    status: { error: boolean; message: string };
  };
  handleHint: (payload: FormData) => void;
}) {
  return (
    <div className="hint-area-wrapper">
      {HState.usedup ? (
        <p>
          <i>No more hints available</i>
        </p>
      ) : (
        <Form action={handleHint}>
          <button type="submit">Hint</button>
        </Form>
      )}
      {HState.status.error && (
        <div style={{ color: "red" }}>{HState.status.message}</div>
      )}
      <ul>
        {HState.hints.map((hintObj) => (
          <li key={hintObj.id}>
            {hintObj.hint}: {hintObj.similarity}%
          </li>
        ))}
      </ul>
    </div>
  );
}

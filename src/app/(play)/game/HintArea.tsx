import Form from "next/form";
import { Hint } from "@/utils/types";
import { getColor } from "@/utils/helpers";

export default function HintArea({
  HState,
  handleHint,
}: {
  HState: {
    hints: Hint[];
    times: number;
    usedUp: boolean;
    status: { error: boolean; message: string };
  };
  handleHint: (payload: FormData) => void;
}) {
  return (
    <div className="hint-area-wrapper">
      {HState.usedUp ? (
        <div className="btn-wrapper hint-btn-wrapper">
          <button
            className="btn hint-btn"
            type="submit"
            disabled
            aria-label="No more hints"
          >
            No more hints
          </button>
        </div>
      ) : (
        <Form action={handleHint}>
          <div className="btn-wrapper hint-btn-wrapper">
            <button className="btn hint-btn" type="submit">
              Hint
            </button>
          </div>
        </Form>
      )}
      {HState.status.error && (
        <div style={{ color: "red" }}>{HState.status.message}</div>
      )}
      <table className="guess-table">
        <tbody>
          {HState.hints.map((hintObj, index) => (
            <tr
              key={hintObj.id}
              className={index % 2 !== 0 ? "odd-row" : "even-row"}
            >
              <td style={{ textAlign: "right" }}>{hintObj.hint}</td>
              <td
                style={{
                  color: getColor(hintObj.similarity),
                  textAlign: "left",
                }}
              >
                {hintObj.similarity}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

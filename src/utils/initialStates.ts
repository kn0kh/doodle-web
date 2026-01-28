import { Guess, Hint } from "@/utils/types";

export const initialGState: {
  guesses: Guess[];
  ended: "lost" | "won" | false;
  status: { error: boolean; message: string };
} = {
  guesses: [],
  ended: false,
  status: { error: false, message: "" },
} as const;

export const initialHState: {
  hints: Hint[];
  times: number;
  usedUp: boolean;
  status: { error: boolean; message: string };
} = {
  hints: [],
  times: 0,
  usedUp: false,
  status: { error: false, message: "" },
} as const;

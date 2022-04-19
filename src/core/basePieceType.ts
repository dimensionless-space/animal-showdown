import { z } from "zod";

export const zBasePieceType = z.enum([
  "chicken",
  "elephant",
  "giraffe",
  "lion",
]);

export type BasePieceType = z.infer<typeof zBasePieceType>;

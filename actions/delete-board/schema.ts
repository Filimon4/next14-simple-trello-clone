import { z } from "zod";

export const DeletBoard = z.object({
  id: z.string(),
})
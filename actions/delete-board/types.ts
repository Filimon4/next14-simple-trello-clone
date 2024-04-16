import { z } from 'zod';
import { Board } from '@prisma/client';

import { ActionState } from '@/lib/create-safe-action';

import { DeletBoard } from './schema';

export type InputType = z.infer<typeof DeletBoard>;
export type ReturnType = ActionState<InputType, Board>;

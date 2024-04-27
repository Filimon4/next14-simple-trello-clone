import { z } from 'zod';
import { Task } from '@prisma/client';

import { ActionState } from '@/lib/create-safe-action';

import { CreateTaskList } from './schema';

export type InputType = z.infer<typeof CreateTaskList>;
export type ReturnType = ActionState<InputType, Task>;

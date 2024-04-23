"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateTask } from "./schema";
import { createAuditLog } from "@/lib/creater-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }

  const { title, cardId, boardId } = data;
  let task;

  try {
    // task = await db.task.create({
    //   data: {
    //     title,
    //     cardId,
    //     boardId
    //   }
    // })

    // await createAuditLog({
    //   entityId: task.id,
    //   entityTitle: task.title,
    //   entityType: ENTITY_TYPE.CARD,
    //   action: ACTION.CREATE
    // })
  } catch (error) {
    return {
      error: "Failed to create."
    }
  }

  revalidatePath(`/board/${boardId}`);
  return { data: task };
}

export const createTask = createSafeAction(CreateTask, handler)
 
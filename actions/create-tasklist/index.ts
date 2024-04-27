"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateTaskList } from "./schema";
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
  let taskList;

  try {
    const card = await db.card.findUnique({
      where: {
        id: cardId,
      }
    })

    if (!card) {
      return {
        error: "card not found"
      }
    }

    const lastTask = await db.task.findFirst({
      where: {
        cardId
      },
      orderBy: { order: 'desc' }
    })
    
    const nextOrder = lastTask ? lastTask.order + 1 : 1;

    taskList = await db.task.create({
      data: {
        title,
        cardId,
        check: false,
        order: nextOrder
      }
    })   

    // await createAuditLog({
    //   entityTitle: list.title,
    //   entityId: list.id,
    //   entityType: ENTITY_TYPE.LIST,
    //   action: ACTION.CREATE
    // })
  } catch (error) {
    return {
      error: "Failed to create."
    }
  }

  revalidatePath(`/board/${boardId}`);
  return { data: taskList };
}

export const createTaskList = createSafeAction(CreateTaskList, handler)
 
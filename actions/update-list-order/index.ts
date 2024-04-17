"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateListOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }

  const { items, boardId } = data;
  let lists;

  try {
    const transaction = items.map((lst) => 
      db.list.update({
        where: {
          id: lst.id,
          board: {
            orgId,
          },
        },
        data: {
          order: lst.order,
        }
      })
    )
    lists = await db.$transaction(transaction);
    
  } catch (error) {
    return {
      error: "Failed to reorder"
    }
  }

  revalidatePath(`/board/${boardId}`);
  return { data: lists };
}

export const updateListOrder = createSafeAction(UpdateListOrder, handler)
 
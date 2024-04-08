"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteBoard(id: string) {
  await db.board.delete({
    where: {
      id
    }
  })
  
  revalidatePath('/organization/org_2ek8hsrBXyZ4dGPgUI4ddoVpuK5')
}
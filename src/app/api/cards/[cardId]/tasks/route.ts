import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function GET(
  request: Request,
  { params }: { params: {cardId: string} }
) {
  console.log(params)
  try {
    const { userId, orgId } = auth()

    if (!userId || !orgId) {
      return new NextResponse("Unathorized", {status: 401})
    }

    const tasks = await db.task.findMany({
      where: {
        cardId: params.cardId,
      }
    })
    
    return NextResponse.json(tasks)
  } catch (error) {
    return new NextResponse("Internal Error", {status: 500})
  }
}

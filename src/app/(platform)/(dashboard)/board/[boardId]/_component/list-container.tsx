"use client";

import { List } from "@prisma/client";

interface ListContrainerProps {
  data: List[];
  boardId: string;
}

export const ListContrainer = ({
  data,
  boardId
}: ListContrainerProps) => {
  return (
    <div>
      List Container
    </div>
  )
}

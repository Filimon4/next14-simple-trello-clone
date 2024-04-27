import { Task } from '@prisma/client'
import React from 'react'

interface TaskProps {
  data: Task
}

export const Tasks = ({
  data
}: TaskProps) => {
  return (
    <div>

    </div>
  )
}

Tasks.Skeleton = function TasksSkeletion() {
  return (
    <div>Loading...</div>
  )
}

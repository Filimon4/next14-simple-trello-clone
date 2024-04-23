"use client";

import { Card, List } from "@prisma/client";

import { toast } from "sonner"
import { Copy, Trash, SquareCheck } from "lucide-react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useAction } from "@main/hooks/use-action";
import { copyCard } from "@main/actions/copy-card";
import { deleteCard } from "@main/actions/delete-card";
import { createTask } from "@main/actions/create-task"
import { useCardModal } from "@main/hooks/use-card-modal";
import { TasksFormPopover } from "@/components/form-tasks/form-popover";

interface ActionsProps {
  data: Card & { list: List};
}

export const Actions = ({
  data
}: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const {
    execute: executeCopyCard,
    isLoading: isLoadingCopy,
  } = useAction(copyCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" copied`)
      cardModal.onClose()
    },
    onError: (error) => {
      toast.error(`Card error: "${error}"`)
    },
  });
  
  const {
    execute: executeDeleteCard,
    isLoading: isLoadingDelete,
  } = useAction(deleteCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" deleted`)
      cardModal.onClose()
    },
    onError: (error) => {
      toast.error(`Card error: "${error}"`)
    }
  });

  const {
    execute: executeCreateTask,
    isLoading: isLoadingCreateTask,
  } = useAction(createTask, {
    onSuccess: (data) => {
      toast.success(`Task "${data.title}" created`)
    },
    onError: (error) => {
      toast.error(`Task error: "${error}"`)
    }
  });

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({
      id: data.id,
      boardId,
    })
  }

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({
      id: data.id,
      boardId,
    })
  }

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">
        Actions
      </p>
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant={"gray"}
        className="w-full justify-start"
        size="inline"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant={"gray"}
        className="w-full justify-start"
        size="inline"
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
      <TasksFormPopover>
        <Button
          onClick={() => {}}
          disabled={isLoadingCreateTask}
          variant={"gray"}
          className="w-full justify-start"
          size="inline"
          >
          <SquareCheck className="h-4 w-4 mr-2" />
          Add Tasks
        </Button>
      </TasksFormPopover>
    </div>
  )
}

Actions.Skeleton = function ActionsSekeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  )
}
"use client";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";
import { FormSubmit } from "../form/form-submit";
import { Button } from "../ui/button";
import { FormInput } from "../form/form-input";
import { ElementRef, useRef } from "react";
import { useAction } from "@main/hooks/use-action";
import { toast } from "sonner";

interface FormTasksPopoverProps{
  children: React.ReactNode
}

export const TasksFormPopover = ({
  children
}: FormTasksPopoverProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null);

  const {execute, filedErrors} = useAction(createTaskList, {
    onSuccess: (data) => {
      toast.success("Task lists created!");
      closeRef.current?.click()
    }
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({title})
  }

  return (
    <Popover>
      <PopoverTrigger>
        {children}
      </PopoverTrigger>
      <PopoverContent
        className="w-80 pt-3"
        side="bottom"
      >
        <div className="text-sm font-medium text-center text-neutral-700 pb-4">
          Create task board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant={"ghost"}
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit}>
          <div className="my-4">
            <FormInput id="title" label="Tasks title" type="text" />
          </div>
          <FormSubmit>
            Add
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}
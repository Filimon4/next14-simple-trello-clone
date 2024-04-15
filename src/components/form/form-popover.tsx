"use client"

import { toast } from "sonner";
import { X } from "lucide-react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@main/hooks/use-action";
import { createBoard } from '@main/actions/create-board';
import { Button } from "@/components/ui/button";

import { FormInput } from './form-input';
import { FormSubmit } from './form-submit';
import { FormPicker } from "./form-picker";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const  FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const { execute, filedErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log({ data });
      toast.success("Board created!");
    },
    onError: (error) => {
      console.log({ error })
      toast.error(error)
    }
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title })
  }

  return (
    <Popover>
      <PopoverTrigger>
        {children}
      </PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-700 pb-4">
          Create board
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant={"ghost"}
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker 
              id="image"
              errors={filedErrors}
              
            />
            <FormInput 
              id="title"
              label="Board title"
              type="text"
              errors={filedErrors}
            />
          </div>
          <FormSubmit className="w-full">
            Create
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}
 

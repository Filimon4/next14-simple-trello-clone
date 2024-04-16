"use client";

import { toast } from "sonner";

import { ElementRef, useRef, useState } from "react"
import { Board } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { updateBoard } from "@main/actions/update-board";
import { useAction } from "@main/hooks/use-action";

interface BoardTitleFormProps {
  data: Board;
};

export const BoardTitleForm = ({
  data
}: BoardTitleFormProps) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated!`)
      setTitle(data.title)
      disabledEditin();
    },
    onError: (error) => {
      toast.error(error);
    }
  })

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditin = () => {
    // TODO: Focus inputs
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    })
  }

  const disabledEditin = () => {
    setIsEditing(false)
  }

  const onSumbit = (formData: FormData) => {
    const title = formData.get('title') as string;
    
    console.log("I am submited", title)
    execute({
      title,
      id: data.id
    })
  } 

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  if (isEditing) {
    return (
      <form ref={formRef} action={onSumbit} className="flex items-center gap-x-2">
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className='text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none'
        />
      </form>
    )
  }

  return (
    <Button
      onClick={enableEditin}
      variant="transparent"
      className="font-bold text-lg h-auto w-auto p-1 px-2"
    >
      {title}
    </Button>
  )
}

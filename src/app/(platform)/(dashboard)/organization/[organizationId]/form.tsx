"use client";

import { createBoard } from "@main/actions/create-board";
import { FormInput } from "./form-input";
import { FormButton } from "./form-button";
import { useAction } from "@main/hooks/use-action";

export const Form = () => {
  const { execute, filedErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, 'SUCCESS!')
    },
    onError: (error) => {
      console.error(error)
    }
  });
 
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  }

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={filedErrors} />
      </div>
      <FormButton />
    </form>
  );
};

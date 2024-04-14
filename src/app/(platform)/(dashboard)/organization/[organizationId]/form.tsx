"use client";

import { createBoard } from "@main/actions/create-board";

import { useAction } from "@main/hooks/use-action";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

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

    console.log({ title })

    execute({ title });
  }

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput 
          label="Board title"
          errors={filedErrors}
          id='title'
        />
      </div>
      <FormSubmit >
        Save
      </FormSubmit>
    </form>
  );
};

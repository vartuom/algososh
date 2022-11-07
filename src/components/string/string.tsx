import React, {useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";

export const StringComponent: React.FC = () => {

  const [value, setValue] = useState('');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <SolutionLayout title="Строка">
    <form>
      <Input value={value} onChange={onChange} placeholder={"Введите текст"} maxLength={11} isLimitText={true}/>
      <Button type={"submit"} text={"Развернуть"}/>
    </form>
    </SolutionLayout>
  );
};

import React, {useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";

export const StringComponent: React.FC = () => {

  const [value, setValue] = useState('');
  const [arr, setArr] = useState([] as Array<string>);
  const [curr, setCurr] = useState(0);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const delay = (ms: number) => new Promise<void>(
      resolve => setTimeout(resolve, ms)
  );

  const swap = (arr: Array<string>, i: number, j: number) => {
    const temp  = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return arr
  }

  const getState = (index: number) => {
    if (index < curr || index > arr.length - 1 - curr) {
      return ElementStates.Modified
    }
    if (index === curr || index === arr.length - 1 - curr) {
      return ElementStates.Changing
    }
    return ElementStates.Default
  }

  const reverseString = async () => {
    let tempArr = value.split('');
    for (let i = 0; i < Math.floor(tempArr.length / 2 ); i++) {
      let j = tempArr.length - 1 - i;
      setCurr(i);
      tempArr = swap(tempArr, i, j);
      console.log(curr);
      setArr([...tempArr]);
      await delay(500);
    }
  }


  return (
    <SolutionLayout title="Строка">
      <form onSubmit={e => {
        e.preventDefault()
        reverseString();
      }}>
        <Input value={value} onChange={onChange} placeholder={"Введите текст"} maxLength={11} isLimitText={true}/>
        <Button type={"submit"} text={"Развернуть"}/>
      </form>
      <div>
        {arr.map((char, index) => (
            <Circle letter={char} state={getState(index)}/>
        ))}
      </div>
    </SolutionLayout>
  );
};

import React, {useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import styles from "./string.module.css"
import {animationDelayWithAbort} from "../../utils/utils";
import {getReversingStringSteps, getState} from "./utils/utils";

export const StringComponent: React.FC = () => {

  const [value, setValue] = useState('');
  const [arr, setArr] = useState([] as Array<string>);
  const [currIndex, setCurrIndex] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const controller = new AbortController();
  const signal = controller.signal;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const printReverseString = async () => {
    //отключаем кнопку
    setIsPending(true);
    setArr(value.split(''));
    setCurrIndex(0);
    const tempArr = getReversingStringSteps(value);
    for (const step of tempArr) {
      await animationDelayWithAbort(500, null, signal);
      setCurrIndex((prev) => prev+1)
      setArr([...step]);
    }
    setCurrIndex(Math.floor(tempArr[0].length / 2)+1);
    setIsPending(false);
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.inputForm} onSubmit={e => {
        e.preventDefault()
        printReverseString();
      }}>
        <Input value={value} onChange={onChange} placeholder={"Введите текст"} maxLength={11} isLimitText={true} disabled={isPending}/>
        <Button type={"submit"} text={"Развернуть"} isLoader={isPending} disabled={value.trim().length > 0 ? false : true}/>
      </form>
      <div className={styles.circleRow}>
        {arr.map((char, index, array) => (
            <Circle key={`${index}-${char}`} letter={char} state={getState(index, currIndex, array)}/>
        ))}
      </div>
    </SolutionLayout>
  );
};

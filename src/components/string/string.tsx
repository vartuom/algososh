import React, {useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import styles from "./string.module.css"
import {animationDelay} from "../../utils/utils";
import {swap} from "../../utils/utils";
import {getState} from "./utils/utils";

export const StringComponent: React.FC = () => {

  const [value, setValue] = useState('');
  const [arr, setArr] = useState([] as Array<string>);
  const [currIndex, setCurrIndex] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reverseString = async () => {
    //отключаем кнопку
    setIsPending(true);
    let tempArr = value.split('');
    setArr([...tempArr]);
    setCurrIndex(0);
    for (let i = 0; i < Math.floor(tempArr.length / 2 ); i++) {
      await animationDelay(1000);
      let j = tempArr.length - 1 - i;
      setCurrIndex(i+1);
      swap(tempArr, i, j);
      setArr([...tempArr]);
    }
    //закрашиваем центр, если элементов было нечетное количество
    setCurrIndex(Math.floor(tempArr.length / 2)+1);
    setIsPending(false);
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.inputForm} onSubmit={e => {
        e.preventDefault()
        reverseString();
      }}>
        <Input value={value} onChange={onChange} placeholder={"Введите текст"} maxLength={11} isLimitText={true} disabled={isPending}/>
        <Button type={"submit"} text={"Развернуть"} isLoader={isPending}/>
      </form>
      <div className={styles.circleRow}>
        {arr.map((char, index, array) => (
            <Circle key={`${index}-${char}`} letter={char} state={getState(index, currIndex, array)}/>
        ))}
      </div>
    </SolutionLayout>
  );
};

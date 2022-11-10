import React, {useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Stack} from "../stack-page/stack";
import {animationDelay} from "../../utils/utils";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";

const stack = new Stack<string>();

export const StackPage: React.FC = () => {

  const [value, setValue] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [stackArr, setStackArr] = useState([] as Array<string>);
  const [isHighlight, setIsHighlight] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const push = async () => {
    setIsPending(true);
    stack.push(value);
    setIsHighlight(true);
    setStackArr(stack.getStack());
    setValue('');
    await animationDelay(500);
    setIsHighlight(false);
    setIsPending(false);
  }

  const pop = async () => {
    setIsPending(true);
    setIsHighlight(true);
    await animationDelay(500);
    stack.pop();
    setStackArr(stack.getStack());
    setValue('');
    setIsHighlight(false);
    setIsPending(false);
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.inputForm} onSubmit={e => {
        e.preventDefault()
      }}>
        <Input value={value} onChange={onChange} placeholder={"Введите текст"} maxLength={4} isLimitText={true}/>
        <Button text={"Добавить"} isLoader={isPending} onClick={push}/>
        <Button text={"Удалить"} isLoader={isPending} onClick={pop}/>
        <Button text={"Очистить"} isLoader={isPending} onClick={() => {
          stack.clear();
          setStackArr(stack.getStack());
        }}/>
      </form>
      <div className={styles.circleRow}>
        {stackArr.map((item, index: number, array) => {
          return (
              <Circle
                  key={index}
                  letter={item}
                  index={index}
                  state = {isHighlight ? index === array.length - 1 ? ElementStates.Changing : ElementStates.Default : ElementStates.Default}
                  head={index === array.length - 1 ? "top" : ""}
              />)
        })}
      </div>
    </SolutionLayout>
  );
};

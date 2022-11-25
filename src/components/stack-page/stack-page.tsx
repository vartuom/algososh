import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Stack} from "../stack-page/stack";
import {animationDelayWithAbort} from "../../utils/utils";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";

const stack = new Stack<string>();

export const StackPage: React.FC = () => {

    const [value, setValue] = useState('');
    const [isPending, setIsPending] = useState("");
    const [stackArr, setStackArr] = useState([] as Array<string>);
    const [isHighlight, setIsHighlight] = useState(false);

    const controller = new AbortController();
    const signal = controller.signal;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const push = async () => {
        setIsPending("push");
        stack.push(value);
        setIsHighlight(true);
        setStackArr(stack.getStack());
        setValue('');
        await animationDelayWithAbort(500, null, signal);
        setIsHighlight(false);
        setIsPending("");
    }

    const pop = async () => {
        setIsPending("pop");
        setIsHighlight(true);
        await animationDelayWithAbort(500, null, signal);
        stack.pop();
        setStackArr(stack.getStack());
        setValue('');
        setIsHighlight(false);
        setIsPending("");
    }

    return (
        <SolutionLayout title="Стек">
            <form className={styles.inputForm} onSubmit={e => {
                e.preventDefault()
            }}>
                <fieldset className={styles.controlSet} disabled={isPending === "" ? false : true}>
                    <Input value={value} onChange={onChange} placeholder={"Введите текст"} maxLength={4}
                           isLimitText={true} extraClass={styles.inputField}/>
                    <Button text={"Добавить"} isLoader={isPending === "push" ? true : false} onClick={push}/>
                    <Button text={"Удалить"} isLoader={isPending === "pop" ? true : false} onClick={pop}/>
                    <Button text={"Очистить"} onClick={() => {
                        stack.clear();
                        setStackArr(stack.getStack());
                    }} extraClass={styles.clearBtn}/>
                </fieldset>
            </form>
            <div className={styles.circleRow}>
                {stackArr.map((item, index: number, array) => {
                    return (
                        <Circle
                            key={index}
                            letter={item}
                            index={index}
                            state={isHighlight ? index === array.length - 1 ? ElementStates.Changing : ElementStates.Default : ElementStates.Default}
                            head={index === array.length - 1 ? "top" : ""}
                        />)
                })}
            </div>
        </SolutionLayout>
    );
};

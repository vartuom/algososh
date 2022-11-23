import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css"
import {animationDelay, animationDelayWithAbort} from "../../utils/utils";
import {getFibonacciNumbers} from "./utils/utils";

export const FibonacciPage: React.FC = () => {

    const [value, setValue] = useState('');
    const [arr, setArr] = useState([] as Array<number>);
    const [isPending, setIsPending] = useState(false);

    const controller = new AbortController();
    const signal = controller.signal;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const printFibonacciNumbers = async (n: string) => {
        const lastElement = parseInt(n);
        if (typeof lastElement === 'number' && lastElement > 0) {
            setValue("");
            setIsPending(true);
            setArr([]);
            const tempArr = getFibonacciNumbers(lastElement);
            for (const number of tempArr) {
                setArr((prev) => [...prev, number]);
                //await animationDelay(500);
                await animationDelayWithAbort(500, null, signal)
            }
            setIsPending(false);
        }
    }

    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <form className={styles.inputForm} onSubmit={e => {
                e.preventDefault()
                printFibonacciNumbers(value);
            }}>
                <Input value={value} onChange={onChange} placeholder={"Введите текст"} type={'number'} max={'20'}
                       isLimitText={true} disabled={isPending}/>
                <Button type={"submit"} text={"Рассчитать"} isLoader={isPending}/>
            </form>
            <div className={styles.circleRow}>
                {arr.map((char, index) => (
                    <Circle key={`${index}-${char}`} letter={char.toString()} index={index+1}/>
                ))}
            </div>
        </SolutionLayout>
    );
};

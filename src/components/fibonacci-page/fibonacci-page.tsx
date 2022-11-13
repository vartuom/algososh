import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css"
import {animationDelay} from "../../utils/utils";

export const FibonacciPage: React.FC = () => {

    const [value, setValue] = useState('');
    const [arr, setArr] = useState([] as Array<number>);
    const [isPending, setIsPending] = useState(false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const getFibonacciNumbers = async (n: string) => {
        const lastElement = parseInt(n);
        if (typeof lastElement === 'number' && lastElement > 0) {
            setValue("");
            setIsPending(true);
            await animationDelay(500);
            const tempArr = [1];
            setArr([...tempArr]);
            await animationDelay(500);
            if (lastElement === 1) {
                setIsPending(false);
                return
            }
            tempArr.push(1);
            setArr([...tempArr]);
            await animationDelay(500);
            if (lastElement === 2) {
                setIsPending(false);
                return
            }
            for (let i = 2; i < lastElement; i++) {
                tempArr[i] = tempArr[i - 1] + tempArr[i - 2];
                setArr([...tempArr]);
                await animationDelay(500);
            }
            setIsPending(false);
        }
    }


    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <form className={styles.inputForm} onSubmit={e => {
                e.preventDefault()
                getFibonacciNumbers(value);
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

import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css"

export const FibonacciPage: React.FC = () => {

    const [value, setValue] = useState('');
    const [arr, setArr] = useState([] as Array<string>);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const [isPending, setIsPending] = useState(false);

    const getFibSequence = (n: string) => {

    }


    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <form className={styles.inputForm} onSubmit={e => {
                e.preventDefault()
                reverseString();
            }}>
                <Input value={value} onChange={onChange} placeholder={"Введите текст"} max={19} isLimitText={true}/>
                <Button type={"submit"} text={"Рассчитать"} isLoader={isPending}/>
            </form>
            <div className={styles.circleRow}>
                {arr.map((char, index) => (
                    <Circle key={`${index}-${char}`} letter={char} state={getState(index)}/>
                ))}
            </div>
        </SolutionLayout>
    );
};

import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {LinkedList} from "./linkedList";
import {ArrowIcon} from "../ui/icons/arrow-icon";

const randomArr = Array.from(
    {length: 4},
    () => {
        return Math.floor(Math.random() * 101) + ""
    }
);

const list = new LinkedList<string>(randomArr);

export const ListPage: React.FC = () => {

    const [value, setValue] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [listArr, setListArr] = useState()

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <SolutionLayout title="Связный список">
            <form className={styles.inputForm} onSubmit={e => {
                e.preventDefault()
            }}>
                <Input value={value} onChange={onChange} placeholder={"Введите текст"} maxLength={4}
                       isLimitText={true}/>
                <Button text={"Добавить"} isLoader={isPending}/>
                <Button text={"Удалить"} isLoader={isPending}/>
                <Button text={"Очистить"} isLoader={isPending} onClick={() => {
                }}/>
            </form>
            <div className={styles.circleRow}>
                {list.print().map((item, index: number, array) => {
                    return (
                        <div className={styles.circleWrapper}>
                            <Circle
                                key={index}
                                index={index}
                                letter={item}
                            />
                            {index < array.length - 1 && <ArrowIcon fill={"#0032FF"} />}
                        </div>
                    )
                })}
            </div>
        </SolutionLayout>
    );
};

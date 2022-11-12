import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {LinkedList} from "./linkedList";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {animationDelay} from "../../utils/utils";

interface ISmallElement {
    value: string,
    type: "top" | "bottom"
}

interface IListArrItem {
    value: string,
    smallElement: ISmallElement | undefined,
    state: ElementStates;
}

const randomArr = Array.from(
    {length: 4},
    () => {
        return Math.floor(Math.random() * 101) + ""
    }
);

const list = new LinkedList<string>(randomArr);
const initListArr: Array<IListArrItem> = list.print().map((item) => ({
    value: item,
    smallElement: undefined,
    state: ElementStates.Default
}))

export const ListPage: React.FC = () => {

    const [value, setValue] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [listArr, setListArr] = useState(initListArr);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleAppend = async () => {
        setIsPending(true);
        list.append(value);
        listArr[listArr.length - 1] = {
            ...listArr[listArr.length - 1],
            smallElement: {
                value: value,
                type: "top"
            }
        }
        setListArr([...listArr]);
        setValue('');
        await animationDelay(500);
        listArr[listArr.length - 1] = {
            ...listArr[listArr.length - 1],
            smallElement: undefined
        }
        setListArr([...listArr]);
        listArr.push({
            value: value,
            smallElement: undefined,
            state: ElementStates.Modified
        })
        setListArr([...listArr]);
        await animationDelay(500);
        listArr[listArr.length - 1].state = ElementStates.Default;
        setListArr([...listArr]);
        setIsPending(false);
    }

    const handlePop = async () => {
        setIsPending(true);
        listArr[listArr.length - 1] = {
            ...listArr[listArr.length - 1],
            value: "",
            smallElement: {
                value: listArr[listArr.length - 1].value,
                type: "bottom"
            }
        }
        list.deleteTail();
        setListArr([...listArr]);
        await animationDelay(500);
        listArr.pop();
        setListArr([...listArr]);
        setIsPending(false);
    }

    return (
        <SolutionLayout title="Связный список">
            <form className={styles.inputForm} onSubmit={e => {
                e.preventDefault()
            }}>
                <Input value={value} onChange={onChange} placeholder={"Введите текст"} maxLength={4}
                       isLimitText={true}/>
                <Button text={"Добавить"} isLoader={isPending} onClick={handleAppend}/>
                <Button text={"Удалить"} isLoader={isPending} onClick={handlePop}/>
                <Button text={"Очистить"} isLoader={isPending} onClick={() => {
                }}/>
            </form>
            <div className={styles.circleRow}>
                {listArr.map((item, index: number, array) => {
                    return (
                        <div className={styles.circleWrapper}>
                            <Circle
                                key={index}
                                index={index}
                                letter={item.value}
                                state={item.state}
                            />
                            {index < array.length - 1 && <ArrowIcon fill={"#0032FF"} />}
                            {item.smallElement && <div className = {item.smallElement.type === "top" ? styles.smallTop : styles.smallBottom}><Circle letter={item.smallElement.value} isSmall={true} state={ElementStates.Changing}/></div>}
                        </div>
                    )
                })}
            </div>
        </SolutionLayout>
    );
};

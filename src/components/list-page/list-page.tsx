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
    const [indexValue, setIndexValue] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [listArr, setListArr] = useState(initListArr);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const onChangeIndex = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIndexValue(event.target.value);
    };

    const append = async () => {
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

    const pop = async () => {
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

    const prepend = async () => {
        setIsPending(true);
        list.prepend(value);
        listArr[0].smallElement = {
            value: value,
            type: "top",
        }
        setValue("");
        setListArr([...listArr]);
        await animationDelay(500);
        listArr[0].smallElement = undefined;
        listArr.unshift({
            ...listArr[0],
            value: value,
            state: ElementStates.Modified
        });
        setListArr([...listArr]);
        await animationDelay(500);
        listArr[0].state = ElementStates.Default;
        setListArr([...listArr])
        setIsPending(false);
    }

    const dropHead = async () => {
        setIsPending(true);
        listArr[0] = {
            ...listArr[0],
            value: "",
            smallElement: {
                value: listArr[0].value,
                type: "bottom"
            }
        }
        list.deleteHead();
        setListArr([...listArr]);
        await animationDelay(500);
        listArr.shift();
        setListArr([...listArr]);
        setIsPending(false);
    }

    const addAtIndex = async () => {
        setIsPending(true);
        const index = parseInt(indexValue)
        list.addByIndex(value, index)
        for (let i = 0; i <= index; i++) {
            listArr[i] = {
                ...listArr[i],
                state: ElementStates.Changing,
                smallElement: {
                    value: value,
                    type: "top"
                }
            }
            await animationDelay(500);
            setListArr([...listArr]);
            if (i > 0) {
                listArr[i-1] = {
                    ...listArr[i-1],
                    smallElement: undefined
                }
            }
            setListArr([...listArr]);
        }
        await animationDelay(500);
        listArr[index] = {
            ...listArr[index],
            state: ElementStates.Default,
            smallElement: undefined
        }
        listArr.splice(index, 0, {
            value: value,
            state: ElementStates.Modified,
            smallElement: undefined
        })
        setListArr([...listArr]);
        listArr[index].state = ElementStates.Default;
        listArr.forEach((item) => {
            item.state = ElementStates.Default;
        })
        await animationDelay(500);
        setListArr([...listArr]);
        setValue("");
        setIndexValue("");
        setIsPending(false);
    }

    const deleteAtIndex = async () => {
        setIsPending(true);
        const index = parseInt(indexValue);
        list.deleteByIndex(index);
        for (let i = 0; i <= index; i++) {
            listArr[i] = {
                ...listArr[i],
                state: ElementStates.Changing,
            }
            await animationDelay(500);
            setListArr([...listArr]);
        }
        listArr[index] = {
            ...listArr[index],
            value: "",
            smallElement: {
                value: listArr[index].value,
                type: "bottom"
            }
        }
        await animationDelay(500);
        setListArr([...listArr]);
        listArr.splice(index, 1)
        listArr[index - 1] = {
            ...listArr[index - 1],
            value: listArr[index - 1].value,
            state: ElementStates.Modified,
            smallElement: undefined
        }
        await animationDelay(500);
        setListArr([...listArr]);
        listArr.forEach((elem) => {
            elem.state = ElementStates.Default;
        })
        await animationDelay(500);
        setListArr([...listArr]);
        setIndexValue("");
        setIsPending(false);
    }

    return (
        <SolutionLayout title="Связный список">
            <form className={styles.inputForm} onSubmit={e => {
                e.preventDefault()
            }}>
                <Input value={value} onChange={onChange} placeholder={"Введите текст"} maxLength={4}
                       isLimitText={true}/>
                <Button text={"Добавить в tail"} isLoader={isPending} onClick={append}/>
                <Button text={"Удалить из tail"} isLoader={isPending} onClick={pop}/>
                <Button text={"Добавить в head"} isLoader={isPending} onClick={prepend}/>
                <Button text={"Удалить из head"} isLoader={isPending} onClick={dropHead}/>
                <Button text={"Очистить"} isLoader={isPending} onClick={() => {
                }}/>
            </form>
            <form className={styles.inputForm} onSubmit={e => {
                e.preventDefault()
            }}>
                <Input value={indexValue} onChange={onChangeIndex} placeholder={"Введите индекс"}/>
                <Button text={"Добавить по индексу"} isLoader={isPending} onClick={addAtIndex}/>
                <Button text={"Удалить по индексу"} isLoader={isPending} onClick={deleteAtIndex}/>
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
                            {index < array.length - 1 && <ArrowIcon fill={"#0032FF"}/>}
                            {item.smallElement && <div
                                className={item.smallElement.type === "top" ? styles.smallTop : styles.smallBottom}>
                                <Circle letter={item.smallElement.value} isSmall={true} state={ElementStates.Changing}/>
                            </div>}
                        </div>
                    )
                })}
            </div>
        </SolutionLayout>
    );
};

import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {LinkedList} from "./linkedList";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {animationDelayWithAbort} from "../../utils/utils";
import {generateRandomNumArray} from "./utils/utils";

interface ISmallElement {
    value: string,
    type: "top" | "bottom"
}

interface IListArrItem {
    value: string,
    smallElement: ISmallElement | undefined,
    state: ElementStates;
}

const randomArr = generateRandomNumArray(4);

const list = new LinkedList<string>(randomArr);
const initListArr: Array<IListArrItem> = list.toArray().map((item) => ({
    value: item,
    smallElement: undefined,
    state: ElementStates.Default
}))

export const ListPage: React.FC = () => {

    const [value, setValue] = useState("");
    const [indexValue, setIndexValue] = useState("");
    const [isPending, setIsPending] = useState("");
    const [listArr, setListArr] = useState(initListArr);

    const controller = new AbortController();
    const signal = controller.signal;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const onChangeIndex = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIndexValue(event.target.value);
    };

    const append = async () => {
        setIsPending("append");
        list.append(value);
        listArr[listArr.length - 1] = {
            ...listArr[listArr.length - 1],
            smallElement: {
                value: value,
                type: "top"
            }
        }
        setListArr([...listArr]);
        setValue("");
        await animationDelayWithAbort(500, null, signal);
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
        await animationDelayWithAbort(500, null, signal);
        listArr[listArr.length - 1].state = ElementStates.Default;
        setListArr([...listArr]);
        setIsPending("");
    }

    const pop = async () => {
        setIsPending("pop");
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
        await animationDelayWithAbort(500, null, signal);
        listArr.pop();
        setListArr([...listArr]);
        setIsPending("");
    }

    const prepend = async () => {
        setIsPending("prepend");
        list.prepend(value);
        listArr[0].smallElement = {
            value: value,
            type: "top",
        }
        setValue("");
        setListArr([...listArr]);
        await animationDelayWithAbort(500, null, signal);
        listArr[0].smallElement = undefined;
        listArr.unshift({
            ...listArr[0],
            value: value,
            state: ElementStates.Modified
        });
        setListArr([...listArr]);
        await animationDelayWithAbort(500, null, signal);
        listArr[0].state = ElementStates.Default;
        setListArr([...listArr])
        setIsPending("");
    }

    const dropHead = async () => {
        setIsPending("dropHead");
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
        await animationDelayWithAbort(500, null, signal);
        listArr.shift();
        setListArr([...listArr]);
        setIsPending("");
    }

    const addAtIndex = async () => {
        const index = parseInt(indexValue)
        if (index === list.getSize()) {
            setIndexValue("");
            append();
            return
        }
        setIsPending("addAtIndex");
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
            await animationDelayWithAbort(500, null, signal);
            setListArr([...listArr]);
            if (i > 0) {
                listArr[i - 1] = {
                    ...listArr[i - 1],
                    smallElement: undefined
                }
            }
            setListArr([...listArr]);
        }
        await animationDelayWithAbort(500, null, signal);
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
        await animationDelayWithAbort(500, null, signal);
        setListArr([...listArr]);
        setValue("");
        setIndexValue("");
        setIsPending("");
    }

    const deleteAtIndex = async () => {
        setIsPending("deleteAtIndex");
        const index = parseInt(indexValue);
        list.deleteByIndex(index);
        for (let i = 0; i <= index; i++) {
            listArr[i] = {
                ...listArr[i],
                state: ElementStates.Changing,
            }
            await animationDelayWithAbort(500, null, signal);
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
        await animationDelayWithAbort(500, null, signal);
        setListArr([...listArr]);
        listArr.splice(index, 1)
        listArr[index - 1] = {
            ...listArr[index - 1],
            value: listArr[index - 1].value,
            state: ElementStates.Modified,
            smallElement: undefined
        }
        await animationDelayWithAbort(500, null, signal);
        setListArr([...listArr]);
        listArr.forEach((elem) => {
            elem.state = ElementStates.Default;
        })
        await animationDelayWithAbort(500, null, signal);
        setListArr([...listArr]);
        setIndexValue("");
        setIsPending("");
    }

    return (
        <SolutionLayout title="Связный список">
            <form className={styles.inputForm} onSubmit={e => {
                e.preventDefault()
            }}>
                <fieldset className={styles.controlSet} disabled={isPending === "" ? false : true}>
                    <Input name={"value"} value={value} onChange={onChange} placeholder={"Введите текст"} maxLength={4}
                           isLimitText={true} extraClass={styles.inputField}/>
                    <Button text={"Добавить в head"} name={"prepend"} onClick={prepend}
                            extraClass={styles.btnNormal} isLoader={isPending === "prepend" ? true : false}
                            disabled={!value}/>
                    <Button text={"Добавить в tail"} name={"append"} onClick={append}
                            extraClass={styles.btnNormal} isLoader={isPending === "append" ? true : false}
                            disabled={!value}/>
                    <Button text={"Удалить из head"} name={"dropHead"} onClick={dropHead}
                            extraClass={styles.btnNormal} isLoader={isPending === "dropHead" ? true : false}
                            disabled={list.getSize() === 0 ? true : false}/>
                    <Button text={"Удалить из tail"} name={"pop"} onClick={pop}
                            extraClass={styles.btnNormal} isLoader={isPending === "pop" ? true : false}
                            disabled={list.getSize() === 0 ? true : false}/>
                    <Input name={"index"} value={indexValue} onChange={onChangeIndex} placeholder={"Введите индекс"}
                           extraClass={styles.inputField}/>
                    <Button text={"Добавить по индексу"} onClick={addAtIndex}
                            extraClass={styles.btnWide} isLoader={isPending === "addAtIndex" ? true : false}
                            disabled={!indexValue || list.getSize() < parseInt(indexValue)}/>
                    <Button text={"Удалить по индексу"} onClick={deleteAtIndex}
                            extraClass={styles.btnWide} isLoader={isPending === "deleteAtIndex" ? true : false}
                            disabled={list.getSize() === 0 ? true : false || !indexValue || list.getSize() - 1 < parseInt(indexValue)}/>
                </fieldset>
            </form>
            <div className={styles.circleRow}>
                {listArr.map((item, index: number, array) => {
                    return (
                        <div className={styles.circleWrapper} key={index}>
                            <Circle
                                key={index}
                                index={index}
                                letter={item.value}
                                state={item.state}
                                head={index === 0 && !item.smallElement ? "head" : ""}
                                tail={index === array.length - 1 && !item.smallElement ? "tail" : ""}
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

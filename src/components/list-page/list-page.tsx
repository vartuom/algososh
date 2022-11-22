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
        await animationDelay(500);
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
        await animationDelay(500);
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
            await animationDelay(500);
            setListArr([...listArr]);
            if (i > 0) {
                listArr[i - 1] = {
                    ...listArr[i - 1],
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
        setIsPending("");
    }

    return (
        <SolutionLayout title="Связный список">
            <form className={styles.inputForm} onSubmit={e => {
                e.preventDefault()
            }}>
                <fieldset className={styles.controlSet} disabled={isPending === "" ? false : true}>
                    <Input value={value} onChange={onChange} placeholder={"Введите текст"} maxLength={4}
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
                    <Input value={indexValue} onChange={onChangeIndex} placeholder={"Введите индекс"}
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
                                head={index === 0 ? "head" : ""}
                                tail={index === list.getSize() - 1 ? "tail" : ""}
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

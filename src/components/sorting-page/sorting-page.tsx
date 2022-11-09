import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import styles from "./sorting-page.module.css"
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {Column} from "../ui/column/column";
import {animationDelay} from "../../utils/utils";

interface IArrElement {
    value: number,
    state: ElementStates
}

export const SortingPage: React.FC = () => {

    const [arr, setArr] = useState([] as Array<IArrElement>);
    const [isPending, setIsPending] = useState(false);
    const [isBubble, setIsBubble] = useState(false)

    const handleRadioInput = (e: ChangeEvent<HTMLInputElement>) => {
        setIsBubble(e.target.value === "bubble" ? true : false);
    }

    const generateRandomArray = () => {
        setIsPending(true)
        const randomArr = Array.from(
            {length: 7},
            () => {return {value: Math.floor(Math.random()*101), state: ElementStates.Default}}
        );
        setArr([...randomArr])
        setIsPending(false)
    }

    const swap = (arr: Array<IArrElement>, firstIndex: number, secondIndex: number): void => {
        const temp = arr[firstIndex];
        arr[firstIndex] = arr[secondIndex];
        arr[secondIndex] = temp;
    };

    const selectionSort = async (arr: Array<IArrElement>, isAscending: boolean) => {
        setIsPending(true);
        const arrLength = arr.length;
        for (let i = 0; i < arrLength; i++) {
            //индекс максимального или минимального элемента
            //в зависимости от направления сортировки
            let chosenIndex = i;
            arr[chosenIndex].state = ElementStates.Changing;
            for (let j = i + 1; j < arrLength; j++) {
                arr[j].state = ElementStates.Changing;
                setArr([...arr]);
                await animationDelay(500);
                if (isAscending ? arr[j].value < arr[chosenIndex].value : arr[j].value > arr[chosenIndex].value) {
                    chosenIndex = j;
                    arr[j].state = ElementStates.Changing;
                    arr[chosenIndex].state = i === chosenIndex ? ElementStates.Changing : ElementStates.Default;
                }
                if (j !== chosenIndex) {
                    arr[j].state = ElementStates.Default;
                }
                setArr([...arr]);
            }
            swap(arr, chosenIndex, i);
            arr[chosenIndex].state = ElementStates.Default;
            arr[i].state = ElementStates.Modified;
            setArr([...arr]);
        }
        setIsPending(false);
    };

    return (
        <SolutionLayout title="Сортировка массива">
            <form className={styles.inputForm}>
                <RadioInput label={"Выбор"} disabled={isPending} value={"select"} checked={!isBubble} onChange={handleRadioInput}/>
                <RadioInput label={"Пузырек"} disabled={isPending} value={"bubble"} checked={isBubble} onChange={handleRadioInput}/>
                <Button text={"По возрастанию"} sorting={Direction.Ascending} isLoader={isPending} onClick={() => selectionSort(arr, true)}/>
                <Button text={"По убыванию"} sorting={Direction.Descending} onClick={() => selectionSort(arr, false)} isLoader={isPending}/>
                <Button text={"Новый массив"} onClick={generateRandomArray} isLoader={isPending}/>
            </form>
            <div className={styles.columnsRow}>
                {arr.map((element, index) => {
                    return <Column index={element.value} state={element.state} key={index}/>
                })}
            </div>
        </SolutionLayout>
    );
};

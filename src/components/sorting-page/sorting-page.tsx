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

    const swap = (arr: Array<IArrElement>, firstIndex: number, secondIndex: number) => {
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
            let selectedIndex = i;
            arr[selectedIndex].state = ElementStates.Changing;
            for (let j = i + 1; j < arrLength; j++) {
                arr[j].state = ElementStates.Changing;
                setArr([...arr]);
                await animationDelay(500);
                if (isAscending ? arr[j].value < arr[selectedIndex].value : arr[j].value > arr[selectedIndex].value) {
                    selectedIndex = j;
                    arr[j].state = ElementStates.Changing;
                    arr[selectedIndex].state = i === selectedIndex ? ElementStates.Changing : ElementStates.Default;
                }
                if (j !== selectedIndex) arr[j].state = ElementStates.Default;
                setArr([...arr]);
            }
            swap(arr, selectedIndex, i);
            arr[selectedIndex].state = ElementStates.Default;
            arr[i].state = ElementStates.Modified;
            setArr([...arr]);
        }
        setIsPending(false);
    };

    const bubbleSort = async (arr: Array<IArrElement>, isAscending: boolean) => {
        const arrLength = arr.length;
        let left;
        let right;
        for (let i = 0; i < arrLength; i++) {
            for (let j = 0; j < arrLength - i - 1; j++) {
                left = arr[j].value;
                right = arr[j + 1].value;
                arr[j].state = ElementStates.Changing;
                arr[j + 1].state = ElementStates.Changing;
                setArr([...arr]);
                await animationDelay(500);
                if (isAscending ? left < right : left > right) {
                    arr[j].value = right;
                    arr[j + 1].value = left;
                }
                arr[j].state = ElementStates.Default;
                if (arr[j + 1]) arr[j + 1].state = ElementStates.Default;
                setArr([...arr]);
            }
            arr[arrLength - i - 1].state = ElementStates.Modified;
            setArr([...arr])
        }
    }

    return (
        <SolutionLayout title="Сортировка массива">
            <form className={styles.inputForm}>
                <RadioInput label={"Выбор"} disabled={isPending} value={"select"} checked={!isBubble} onChange={handleRadioInput}/>
                <RadioInput label={"Пузырек"} disabled={isPending} value={"bubble"} checked={isBubble} onChange={handleRadioInput}/>
                <Button text={"По возрастанию"} sorting={Direction.Ascending} isLoader={isPending} onClick={() => selectionSort(arr, true)}/>
                <Button text={"По убыванию"} sorting={Direction.Descending} onClick={() => bubbleSort(arr, false)} isLoader={isPending}/>
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

import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import styles from "./sorting-page.module.css"
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";

export const SortingPage: React.FC = () => {

    const [arr, setArr] = useState([] as any);

    const generateRandomArray = () => {
        const randomArr = Array.from(
            {length: 5},
            () => {return {value: Math.floor(Math.random()*101), state: ElementStates.Default}}
        );
        setArr([...randomArr])
        console.log([...randomArr])
    }

    return (
        <SolutionLayout title="Сортировка массива">
            <form className={styles.inputForm}>
                <RadioInput label={"Выбор"} />
                <RadioInput label={"Пузырек"} />
                <Button text={"По возрастанию"} sorting={Direction.Ascending}/>
                <Button text={"По убыванию"} sorting={Direction.Descending}/>
                <Button text={"Новый массив"} onClick={generateRandomArray}/>
            </form>
        </SolutionLayout>
    );
};

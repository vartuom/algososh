import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import styles from "./sorting-page.module.css"
import {Direction} from "../../types/direction";
import {Column} from "../ui/column/column";
import {
    generateRandomNumArray,
    getBubbleSortSteps,
    getSelectionSortSteps,
    getColumnState,
    Step, getRandomNumber
} from "./utils/utils";

export const SortingPage: React.FC = () => {

    const randomArray = useRef<number[]>(generateRandomNumArray(getRandomNumber(3, 17)))
    const intervalId = useRef<NodeJS.Timeout>();

    const [isBubble, setIsBubble] = useState(false)
    const [sortDirection, setSortDirection] = useState("ASC");
    const [algorithmSteps, setAlgorithmSteps] = useState<Step[]>([
        {currentArray: randomArray.current, sortedIndexes: []}
    ])
    const [currentAlgorithmStep, setCurrentAlgorithmStep] = useState(0);
    const isPending = currentAlgorithmStep < algorithmSteps.length - 1;

    useEffect(() => {
        return () => {
            if (intervalId.current)
                clearInterval(intervalId.current)
        }
    })

    const handleRadioInput = (e: ChangeEvent<HTMLInputElement>) => {
        setIsBubble(e.target.value === "bubble" ? true : false);
    }

    const handleNewArrButton = () => {
        randomArray.current = generateRandomNumArray(getRandomNumber(3, 17));
        setAlgorithmSteps(
            [{currentArray: randomArray.current, sortedIndexes: []}]
        )
        setCurrentAlgorithmStep(0);
    }

    const makeSort = (direction: string) => {
        setSortDirection(direction);
        let sortSteps: Array<Step>;
        if (isBubble) {
            sortSteps = getBubbleSortSteps(randomArray.current, direction);
        } else {
            sortSteps = getSelectionSortSteps(randomArray.current, direction);
        }
        setAlgorithmSteps(sortSteps);
        setCurrentAlgorithmStep(0);
        intervalId.current = setInterval(() => {
            if (sortSteps.length) {
                setCurrentAlgorithmStep((currentStep) => {
                    const nextStep = currentStep + 1;
                    if (nextStep > sortSteps.length - 1 && intervalId.current) {
                        clearInterval(intervalId.current);
                        randomArray.current = sortSteps[sortSteps.length - 1].currentArray;
                        return currentStep
                    }
                    return nextStep
                })
            }
        }, 500)
    }

    return (
        <SolutionLayout title="Сортировка массива">
            <form className={styles.inputForm}>
                <fieldset className={styles.radioSet}>
                    <RadioInput label={"Выбор"} disabled={isPending} value={"select"}
                                checked={!isBubble} onChange={handleRadioInput}/>
                    <RadioInput label={"Пузырек"} disabled={isPending} value={"bubble"}
                                checked={isBubble} onChange={handleRadioInput}/>
                </fieldset>
                <fieldset className={styles.buttonSet} disabled={isPending}>
                    <Button
                        text={"По возрастанию"}
                        name={"ASC"}
                        sorting={Direction.Ascending}
                        onClick={() => makeSort("ASC")}
                        isLoader={sortDirection === "ASC" && isPending}
                        extraClass={styles.btnNormal}
                    />
                    <Button
                        text={"По убыванию"}
                        name={"DESC"}
                        sorting={Direction.Descending}
                        onClick={() => makeSort("DESC")}
                        isLoader={sortDirection !== "ASC" && isPending}
                        extraClass={styles.btnNormal}
                    />
                </fieldset>
                <Button text={"Новый массив"} onClick={handleNewArrButton}
                        extraClass={styles.btnNormal}
                        disabled={isPending}/>
            </form>
            <div className={styles.columnsRow}>
                {algorithmSteps.length !== 0 &&
                    algorithmSteps[currentAlgorithmStep].currentArray.map(
                        (currentNumber, index) => (
                            <Column
                                index={currentNumber}
                                key={index}
                                state={getColumnState(
                                    index,
                                    algorithmSteps.length - 1,
                                    currentAlgorithmStep,
                                    algorithmSteps[currentAlgorithmStep]
                                )}
                            />
                        )
                    )}
            </div>
        </SolutionLayout>
    );
};

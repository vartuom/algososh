import {ElementStates} from "../../../types/element-states";
import {swap} from "../../../utils/utils";

export interface Step {
    currentArray: Array<number>,
    sortedIndexes: Array<number>,
    aIndex?: number,
    bIndex?: number,
}

export const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateRandomNumArray = (length: number) => {
    return Array.from(
        {length: length},
        () => {
            return Math.floor(Math.random() * 101)
        }
    );
}

export function getSelectionSortSteps(arr: Array<number>, direction: string) {
    const steps = [] as Array<Step>;
    for (let i = 0; i < arr.length - 1; i++) {
        let indexMin = i;
        for (let j = i + 1; j < arr.length; j++) {
            steps.push({
                currentArray: [...arr],
                aIndex: i,
                bIndex: j,
                sortedIndexes: [...(steps[steps.length - 1]?.sortedIndexes || [])]
            });
            if (
                direction === "ASC"
                    ? arr[indexMin] > arr[j]
                    : arr[indexMin] < arr[j]
            ) {
                indexMin = j;
            }
        }
        if (indexMin !== i) {
            [arr[i], arr[indexMin]] = [
                arr[indexMin],
                arr[i]
            ]
        }
        steps[steps.length - 1].sortedIndexes.push(i);
    }
    steps.push({
        currentArray: [...arr],
        sortedIndexes: steps[steps.length - 1]?.sortedIndexes || []
    })
    return steps
}

export function getBubbleSortSteps(arr: Array<number>, direction: string,) {
    const steps = [] as Array<Step>;
    if (arr.length <= 1) return [{
        currentArray: [...arr],
        sortedIndexes: [],
        aIndex: 0,
        bIndex: 0
    }];
    let isElementSwapped;
    let iterationNumber = 0;
    do {
        isElementSwapped = false;
        for (let i = 0; i < arr.length - 1 - iterationNumber; i++) {
            if (direction === "ASC"
                ? arr[i] > arr[i + 1]
                : arr[i] < arr[i + 1]
            ) {
                swap(arr, i, i+1)
                isElementSwapped = true;
            }
            steps.push({
                currentArray: [...arr],
                sortedIndexes: [...(steps[steps.length - 1]?.sortedIndexes || [])],
                aIndex: i,
                bIndex: i + 1
            });
        }
        steps[steps.length - 1].sortedIndexes.push(steps[steps.length - 1].bIndex!);
        iterationNumber++
    } while (isElementSwapped)
    steps[steps.length - 1] = {
        ...steps[steps.length - 1],
        aIndex: -1,
        bIndex: -1
    }
    return steps
}

export function getColumnState(index: number, maxIndex: number, currentStepNumber: number, currentStep: Step) {
    if ([currentStep.aIndex, currentStep.bIndex].includes(index)) {
        return ElementStates.Changing;
    }

    if (
        currentStep.sortedIndexes.includes(index) ||
        (currentStepNumber === maxIndex && maxIndex > 0)
    ) {
        return ElementStates.Modified;
    }

    return ElementStates.Default
}

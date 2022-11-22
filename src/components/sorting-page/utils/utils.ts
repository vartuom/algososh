import {ElementStates} from "../../../types/element-states";

export interface Step {
    currentArray: Array<number>,
    sortedIndexes: Array<number>,
    aIndex?: number,
    bIndex?: number,
}

export const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateRandomObjArray = (length: number) => {
    return Array.from(
        {length: length},
        () => {
            return {value: Math.floor(Math.random() * 101), state: ElementStates.Default}
        }
    );
}

export const generateRandomNumArray = (length: number) => {
    return Array.from(
        {length: length},
        () => {
            return Math.floor(Math.random() * 101)
        }
    );
}

export function getSelectionSortSteps(sourceArray: Array<number>, direction: string,) {
    const steps = [] as Array<Step>;
    for (let i = 0, l = sourceArray.length, k = l - 1; i < k; i++) {
        let indexMin = i;
        for (let j = i + 1; j < l; j++) {
            steps.push({
                currentArray: [...sourceArray],
                aIndex: i,
                bIndex: j,
                sortedIndexes: [...(steps[steps.length - 1]?.sortedIndexes || [])]
            });
            if (
                direction === "ASC"
                    ? sourceArray[indexMin] > sourceArray[j]
                    : sourceArray[indexMin] < sourceArray[j]
            ) {
                indexMin = j;
            }
        }
        if (indexMin !== i) {
            [sourceArray[i], sourceArray[indexMin]] = [
                sourceArray[indexMin],
                sourceArray[i]
            ]
        }
        steps[steps.length - 1].sortedIndexes.push(i);
    }
    steps.push({
        currentArray: [...sourceArray],
        sortedIndexes: steps[steps.length - 1]?.sortedIndexes || []
    })
    return steps
}

export function getBubbleSortSteps(sourceArray: Array<number>, direction: string,) {
    const steps = [] as Array<Step>;
    let isElementSwapped;
    let iterationNumber = 0;
    do {
        isElementSwapped = false;
        for (let i = 0; i < sourceArray.length - 1 - iterationNumber; i++) {
            if (direction === "ASC"
                ? sourceArray[i] > sourceArray[i + 1]
                : sourceArray[i] < sourceArray[i + 1]
            ) {
                let tmp = sourceArray[i];
                sourceArray[i] = sourceArray[i + 1];
                sourceArray[i + 1] = tmp;
                isElementSwapped = true;
            }
            steps.push({
                currentArray: [...sourceArray],
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


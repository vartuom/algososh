import {ElementStates} from "../../../types/element-states";
import {swap} from "../../../utils/utils";

export const getState = (index: number, currIndex: number, arr: Array<string>) => {
    if (index < currIndex || index > arr.length - 1 - currIndex) {
        return ElementStates.Modified
    }
    if (index === currIndex || index === arr.length - 1 - currIndex) {
        return ElementStates.Changing
    }
    return ElementStates.Default
}

export const getReversingStringSteps = (sourceString: string) => {
    const stringArr = sourceString.split('');
    const stepsArr = [];
    for (let i = 0; i < Math.floor(stringArr.length / 2 ); i++) {
        stepsArr[i] = stringArr;
        let j = stringArr.length - 1 - i;
        swap(stringArr, i, j);
    }
    return stepsArr;
};
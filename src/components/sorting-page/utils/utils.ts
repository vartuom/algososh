import {ElementStates} from "../../../types/element-states";

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

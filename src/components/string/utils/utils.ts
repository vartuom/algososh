//определяем цвет кружка на основе индекса следующего кандидата на перестановку
import {ElementStates} from "../../../types/element-states";

export const getState = (index: number, currIndex: number, arr: Array<string>) => {
    if (index < currIndex || index > arr.length - 1 - currIndex) {
        return ElementStates.Modified
    }
    if (index === currIndex || index === arr.length - 1 - currIndex) {
        return ElementStates.Changing
    }
    return ElementStates.Default
}
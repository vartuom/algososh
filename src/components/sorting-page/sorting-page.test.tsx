import {getSelectionSortSteps} from "./utils/utils";
import {getBubbleSortSteps} from "./utils/utils";

describe('sorting algorithms test', () => {
    it('sorts array in descending order by selection sort algorithm', () => {
        const testArr = [1, 2, 3, 4, 5];
        const steps = getSelectionSortSteps(testArr, 'DESC');
        expect(steps[steps.length-1].currentArray.join(', ')).toBe([5, 4, 3, 2, 1].join(', '))
    })
    it('sorts array in ascending order by selection sort algorithm', () => {
        const testArr = [5, 4, 3, 2, 1];
        const steps = getSelectionSortSteps(testArr, 'ASC');
        expect(steps[steps.length-1].currentArray.join(', ')).toBe([1, 2, 3, 4, 5].join(', '))
    })
    it('sorts void array by selection sort algorithm', () => {
        const testArr = [] as Array<number>;
        const steps = getSelectionSortSteps(testArr, 'DESC');
        expect(steps[steps.length-1].currentArray.join('')).toBe('')
    })
    it('sorts single element array by selection sort algorithm', () => {
        const testArr = [1];
        const steps = getSelectionSortSteps(testArr, 'DESC');
        expect(steps[steps.length-1].currentArray.join('')).toBe('1')
    })


    it('sorts array in descending order by bubble sort algorithm', () => {
        const testArr = [1, 2, 3, 4, 5];
        const steps = getBubbleSortSteps(testArr, 'DESC');
        expect(steps[steps.length-1].currentArray.join(', ')).toBe([5, 4, 3, 2, 1].join(', '))
    })
    it('sorts array in ascending order by bubble sort algorithm', () => {
        const testArr = [5, 4, 3, 2, 1];
        const steps = getBubbleSortSteps(testArr, 'ASC');
        expect(steps[steps.length-1].currentArray.join(', ')).toBe([1, 2, 3, 4, 5].join(', '))
    })
    it('sorts void array by bubble sort algorithm', () => {
        const testArr = [] as Array<number>;
        const steps = getBubbleSortSteps(testArr, 'DESC');
        expect(steps[steps.length-1].currentArray.join('')).toBe('')
    })
    it('sorts single element array by bubble sort algorithm', () => {
        const testArr = [1];
        const steps = getBubbleSortSteps(testArr, 'DESC');
        expect(steps[steps.length-1].currentArray.join('')).toBe('1')
    })
})
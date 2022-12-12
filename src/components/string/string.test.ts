import {getReversingStringSteps} from "./utils/utils";

describe('reverse string algorithm test', () => {
    it('reverses odd-length string', () => {
        const testOddString = '12345';
        const steps = getReversingStringSteps(testOddString);
        expect(steps[steps.length-1].join('')).toBe('54321')
    })
    it('reverses even-length string', () => {
        const testEvenString = '123456';
        const steps = getReversingStringSteps(testEvenString);
        expect(steps[steps.length-1].join('')).toBe('654321')
    })
    it('reverses single letter string', () => {
        const testSingleString = '1';
        const steps = getReversingStringSteps(testSingleString);
        expect(steps[steps.length-1].join('')).toBe('1')
    })
    it('reverses void string', () => {
        const testVoidString = '';
        const steps = getReversingStringSteps(testVoidString);
        expect(steps[steps.length-1].join('')).toBe('')
    })
})
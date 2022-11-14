export const getFibonacciNumbers = (lastElement: number) => {
    const tempArr = [1];
    if (lastElement === 1) {
        return tempArr
    }
    tempArr.push(1);
    if (lastElement === 2) {
        return tempArr
    }
    for (let i = 2; i < lastElement; i++) {
        tempArr[i] = tempArr[i - 1] + tempArr[i - 2];
    }
    return tempArr
}
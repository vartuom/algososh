//задержка рендеринга
export const animationDelay = (ms: number) => new Promise<void>(
    resolve => setTimeout(resolve, ms)
);

export const swap = <T>(arr: Array<T>, firstIndex: number, secondIndex: number) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};
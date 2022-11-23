//задержка рендеринга
export const animationDelay = (ms: number) => new Promise<void>(
    resolve => setTimeout(resolve, ms)
);

export const animationDelayWithAbort = (ms: number, value: string | null, signal: AbortSignal) => {
    return new Promise((resolve, reject) => {
        const listener = () => {
            clearTimeout(timer);
            reject(new Error('Aborted'))
        };
        const timer = setTimeout(() => {
            signal?.removeEventListener('Abort', listener);
            resolve(value);
        }, ms)
        if (signal?.aborted) {
            listener();
        }
        signal?.addEventListener('Abort', listener)
    })
}

export const swap = <T>(arr: Array<T>, firstIndex: number, secondIndex: number) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};
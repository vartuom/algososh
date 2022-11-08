//задержка рендеринга
export const animationDelay = (ms: number) => new Promise<void>(
    resolve => setTimeout(resolve, ms)
);
export const generateRandomNumArray = (length: number) => {
    return Array.from(
        {length: length},
        () => {
            return Math.floor(Math.random() * 101) + ""
        }
    );
}
export function getLevelNumber(levelIndex: number, sublevelIndex: number, totalSublevels: number) {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return (levelIndex + 1) + (totalSublevels > 1 ? alphabet[sublevelIndex] : '');
}

export const normalizeGuess = guess => (guess || "").replace(/[^A-Za-z0-9]/g, '').toLocaleLowerCase();
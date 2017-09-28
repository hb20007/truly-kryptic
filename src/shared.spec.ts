import { getLevelNumber } from "./shared";

describe('Shared Utilities', () => {
    it('getLevelNumber formats level numbers correctly', () => {
        expect(getLevelNumber(23, 0, 1)).toBe('24');
        expect(getLevelNumber(23, 0, 2)).toBe('24a');
        expect(getLevelNumber(23, 1, 2)).toBe('24b');
    });
});
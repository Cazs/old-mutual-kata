import runCopier from '../src/main.js';

describe('Old Mutual Code Kata', () => {
    it('Should expect Batman', () => {
        expect(runCopier('Batman\nSuperman')).toBe('Batman');
    });
});
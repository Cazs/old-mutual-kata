import { runCopier } from '../src/main.js';

describe('Old Mutual Code Kata', () => {
    it('Should expect the response to be Batman', () => {
        expect(runCopier('Batman\nSuperman')).toBe('Batman');
    });
    
    it('Should expect the response to be Super', () => {
        expect(runCopier()).toBe('Super');
    });
});

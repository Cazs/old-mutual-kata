import { copyCharacter } from '../src/main.js';

describe('Old Mutual Code Kata Unit Tests', () => {
    it('Should expect the response to be Batman', () => {
        expect(copyCharacter('Batman\nSuperman')).toBe('Batman');
    });
    
    it('Should expect the response to be Super', () => {
        expect(copyCharacter()).toBe('Super');
    });
    
    it('Should expect the response to be Ironman', () => {
        expect(copyCharacter('Ironman\n')).toBe('Ironman');
    });
    
    it('Should expect the response to be empty', () => {
        expect(copyCharacter('\nSpiderman')).toBe('');
    });
});

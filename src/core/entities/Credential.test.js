import { Credential } from './Credential';

describe('isEligiblePassword: Check if a string is an eligible password', () => {
    it('Should return false if empty string', () => {
        const email = 'test@test.com';
        const password = '';
        const credential = new Credential(email, password);
        expect(credential.isEligiblePassword()).toBe(false);
    });

    it('Should return false if string length less 8', () => {
        const email = 'test@test.com';
        const password = 'bAA2d@s';
        const credential = new Credential(email, password);
        expect(credential.isEligiblePassword()).toBe(false);
    });

    it('Should return false if string has no lowercase characters', () => {
        const email = 'test@test.com';
        const password = 'ABC23@AN2';
        const credential = new Credential(email, password);
        expect(credential.isEligiblePassword()).toBe(false);
    });

    it('Should return false if string has no uppercase characters', () => {
        const email = 'test@test.com';
        const password = 'abc23@an2';
        const credential = new Credential(email, password);
        expect(credential.isEligiblePassword()).toBe(false);
    });

    it('Should return false if string has no numerical characters', () => {
        const email = 'test@test.com';
        const password = 'abcDk(an)';
        const credential = new Credential(email, password);
        expect(credential.isEligiblePassword()).toBe(false);
    });

    it('Should return false if string has no special characters', () => {
        const email = 'test@test.com';
        const password = 'sjkadKJF92J';
        const credential = new Credential(email, password);
        expect(credential.isEligiblePassword()).toBe(false);
    });

    it('Should return true if string length more than 8 and\
    has lowercase, uppercase, numerical and special characters', () => {
            const email = '';
            const password = 'abcdEFGh2@aaa';
            const credential = new Credential(email, password);
            expect(credential.isEligiblePassword()).toBe(true);
        });
});
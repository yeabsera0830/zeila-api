class Credential {
    phoneNumber = '';
    password = '';

    constructor(phoneNumber, password) {
        this.phoneNumber = phoneNumber;
        this.password = password;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }

    isEligiblePassword() {
        const password = this.password;
        return (
            password.length >= 8 &&
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password) &&
            this.containsSpecialCharacters(password)
        );
    }

    containsSpecialCharacters(str) {
        const specialCharacters = ' ~`!@#$%^&*()_-+={[}]:;"\'|\\<,>.?/';
        for (char of str) {
            if (specialCharacters.indexOf(char) >= 0)
                return true;
        }
        return false;
    }
}

export { Credential };
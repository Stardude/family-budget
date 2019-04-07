export const checkIfValuesExist = (...args) => {
    for (let value of args) {
        if (!value || value === '') {
            return false;
        }
    }

    return true;
};

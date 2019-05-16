
export const checkIfValuesExist = (...args) => {
    for (let value of args) {
        if (!value || value === '') {
            return false;
        }
    }

    return true;
};

export const convertToSelectList = (array, labelProp, valueProp) =>
    array.map(item => ({ label: labelProp ? item[labelProp] : item, value: valueProp ? item[valueProp] : item }));

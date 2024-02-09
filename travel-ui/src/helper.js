import dayjs from "dayjs";

export const handleTaxInputForPercentage = (e, form, fieldName) => {
    // if (!/[0-9|.|%]/.test(event.key)) {
    // if (!/^((?!0)\d{1,3}|0|\.\d{1,2})($|\.$|\.\d{1,2}$)/.test(event.key)) {
    // if (!/^\d+(\.\d+)?$/.test(event.key)) {
    // if (!/^(?=.)\d*(\.\d+)?$/.test(event.key)) {
    // if (!/\d*\.?\d*/.test(event.key)) {

    let val = form?.getFieldValue(fieldName);

    if (val?.includes('.') && val?.split('.')[val?.split('.')?.length - 1]?.length > 1) {
        e.preventDefault();
    }
    if (e.key === '.' && !val?.includes('.')) return;

    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }

    // let formatVal = val?.replace('%', '');
    // form?.setFieldValue(fieldName, `${formatVal}%`);
};

export const renderMoneyFormat = (number) => {
    return number ? <>&#8377; {Number(number).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</> : <>&#8377; 0.00</>
};

export const onlyNumbers = async (event) => {
    if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
        return;
    }
};

export const formatFloatNumber = async (val, form, inputName) => {
    if (val.trim() === '.' || !val) {
        return form.setFieldValue(inputName, '0.00');
    }
    let temp = parseFloat(val).toFixed(2);
    return form.setFieldValue(inputName, temp);
};

export const checkModulePermission = async (allPermissions, module, permission) => {
    if (allPermissions?.length > 0) {
        const isRead = allPermissions.find(o => o.name === `${module}.Read`) ? true : false;
        const isCreate = allPermissions.find(o => o.name === `${module}.Create`) ? true : false;
        const isUpdate = allPermissions.find(o => o.name === `${module}.Update`) ? true : false;
        const isDelete = allPermissions.find(o => o.name === `${module}.Delete`) ? true : false;
        return { isRead, isCreate, isUpdate, isDelete };
    }
};

export const getIndianMoneyFormat = (str) => {
    if (str) {
        str = str?.toString().split(".");
        return str[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,") + (str[1] ? ("." + str[1]) : "");
    } else return '';
};

export const sortByDuration = (arr, length, sortBy, firstParam, secondParam) => {
    const sortedDurations = [];
    for (let i = 0; i < length; i++) {
        const currentObject = arr[i];
        let j = 0;
        let sortedTemp = sortedDurations?.length ? sortedDurations[j]?.[firstParam] : null;
        let currTemp = currentObject?.[firstParam];
        if (secondParam) {
            sortedTemp = sortedTemp ? sortedDurations[j]?.[firstParam]?.[secondParam] : null;
            currTemp = currentObject?.[firstParam]?.[secondParam];
        }
        // while (sortBy === 'asc' && j < sortedDurations.length && sortedDurations[j]?.legsDetails?.duration < currentObject?.legsDetails?.duration) {
        while (sortBy === 'asc' && j < sortedDurations.length && sortedTemp < currTemp) {
            j++;
        }
        // while (sortBy === 'dsc' && j < sortedDurations.length && sortedDurations[j]?.legsDetails?.duration > currentObject?.legsDetails?.duration) {
        while (sortBy === 'dsc' && j < sortedDurations.length && sortedTemp > currTemp) {
            j++;
        }
        sortedDurations.splice(j, 0, currentObject);
    }
    // if (sortBy === 'dsc') sortedDurations.reverse();
    return sortedDurations;
};

const convertTimeStringToSortable = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
};

export const sortedListForField = (arr, sortBy, firstParam, secondParam) => {
    arr.sort((a, b) => {
        let fTemp = a[firstParam], sTemp = b[firstParam];
        if (secondParam) {
            fTemp = fTemp[secondParam];
            sTemp = sTemp[secondParam];
        }
        // const timeA = convertTimeStringToSortable(a?.legsDetails?.departureTime);
        const timeA = convertTimeStringToSortable(fTemp);
        const timeB = convertTimeStringToSortable(sTemp);
        return sortBy === 'dsc' ? timeB - timeA : timeA - timeB;
    });
    return arr;
};

export const sortedListForArraival = (arr, sortBy, firstParam, secondParam) => {
    arr.sort((a, b) => {
        const timeA = convertTimeStringToSortable(a?.legsDetails?.departureTime);
        const timeB = convertTimeStringToSortable(b?.legsDetails?.departureTime);
        return sortBy === 'dsc' ? timeB - timeA : timeA - timeB;
    });
    return arr;
};

export const disabledFromToday = (current) => {
    return current && current < dayjs().startOf('day');
};

export const capitalizeFirstLetter = (string = '') => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
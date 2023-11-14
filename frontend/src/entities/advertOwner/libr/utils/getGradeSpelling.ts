export const getGradeSpelling = (value: number) => {
    const lastStr = value.toString().at(-1);
    const lastTwoStr = value.toString().slice(-2);
    let result = 'оцен';

    if (lastTwoStr >= '11' && lastTwoStr <= '14') {
        result += 'ок';
    } else if (lastStr === '1') {
        result += 'ка';
    } else if (lastStr === '2' || lastStr === '3' || lastStr === '4') {
        result += 'ки';
    } else {
        result += 'ок';
    }

    return result;
};

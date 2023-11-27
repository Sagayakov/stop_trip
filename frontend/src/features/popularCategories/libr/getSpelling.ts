export const getSpelling = (value: number) => {
    const lastStr = value.toString().at(-1);
    const lastTwoStr = value.toString().slice(-2);
    let result = 'предложени';

    if (lastTwoStr >= '11' && lastTwoStr <= '14') {
        result += 'й';
    } else if (lastStr === '1') {
        result += 'е';
    } else if (lastStr === '2' || lastStr === '3' || lastStr === '4') {
        result += 'я';
    } else {
        result += 'й';
    }

    return result;
};
import { getOppositeColor } from "./getOppositeColor";
import { getRandomColor } from "./getRandomColor";

export const getUserIcon = (name: string) => {
    const arr = name.split(' ');
    const firstLetters = arr.map((el) => el[0].toUpperCase()).join('');

    const lettersColor = getRandomColor();
    const bgColor = getOppositeColor(lettersColor);

    return {
        firstLetters,
        lettersColor,
        bgColor
    }
};
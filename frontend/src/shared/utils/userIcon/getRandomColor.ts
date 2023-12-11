import { LIGHT_COLORS } from "./lightColors";

export const getRandomColor = () => {
    const randomColor = Math.floor(Math.random() * LIGHT_COLORS.length);
    
    return LIGHT_COLORS[randomColor];
};
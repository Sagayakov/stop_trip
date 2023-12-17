export const getOppositeColor = (color: string) => {
    const MAX_COLOR = 'FFFFFF';
    const SYSTEM_OF_NOTATION = 16;

    const maxColorDecimal = parseInt(MAX_COLOR, SYSTEM_OF_NOTATION);
    const colorDecimal = parseInt(color.slice(1), SYSTEM_OF_NOTATION);
    const oppositeDecimal = maxColorDecimal - colorDecimal;
    
    return `#${oppositeDecimal.toString(SYSTEM_OF_NOTATION)}`;
};
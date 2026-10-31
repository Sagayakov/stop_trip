
export const getUserIcon = (name: string | undefined) => {
    if (name) {
        // Инициалы: первые буквы первых двух слов, без скобок и цифр («Анна (демо)» → «АД»)
        const firstLetters = name
            .split(/\s+/)
            .map((word) => word.replace(/[^\p{L}]/gu, ''))
            .filter(Boolean)
            .slice(0, 2)
            .map((word) => word[0].toUpperCase())
            .join('');

        // Цвета аватара — фирменные, а не случайные при каждой отрисовке
        const lettersColor = '#0E6B5C';
        const bgColor = '#E4F1EE';

        return {
            firstLetters,
            lettersColor,
            bgColor,
        };
    } else {
        const firstLetters = '';
        return { firstLetters };
    }
};

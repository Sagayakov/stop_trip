/* eslint-disable react-hooks/rules-of-hooks */
import { useLayoutEffect, useState } from 'react';

type MatchMediaResult = {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
};

const queries = [
    '(max-width: 767px)',
    '(min-width: 768px) and (max-width: 1023px)',
    '(min-width: 1024px)',
];

export const useMatchMedia = (): MatchMediaResult => {
    if (typeof window === 'undefined') {
        return { isMobile: false, isTablet: false, isDesktop: false };
    }
    const mediaQueryLists = queries.map((el) => window.matchMedia(el));

    const getValues = () => mediaQueryLists.map((el) => el.matches);

    const [values, setValues] = useState(getValues);

    useLayoutEffect(() => {
        const handler = () => setValues(getValues);

        mediaQueryLists.forEach((el) => el.addEventListener('change', handler));

        return () =>
            mediaQueryLists.forEach((el) =>
                el.removeEventListener('change', handler)
            );
    });

    return ['isMobile', 'isTablet', 'isDesktop'].reduce(
        (acc, screen, index) => ({
            ...acc,
            [screen]: values[index],
        }),
        { isMobile: false, isTablet: false, isDesktop: false }
    );
};

type Place = { name: string; slug: string } | null | undefined;

/**
 * Место объявления одной строкой без повторов: «Хойан, Дананг», а не «Вьетнам, Дананг, Хойан».
 * Страну по умолчанию не показываем — весь сайт про одну страну.
 */
export const formatPlace = (
    places: { country?: Place; region?: Place; city?: Place },
    lang: string,
    { withCountry = false }: { withCountry?: boolean } = {}
) => {
    const ordered = withCountry
        ? [places.country, places.region, places.city]
        : [places.city, places.region];

    return ordered
        .filter((place): place is { name: string; slug: string } => !!place)
        .map((place) =>
            lang === 'ru'
                ? place.name
                : `${place.slug[0].toUpperCase()}${place.slug.slice(1)}`.replace(/-/g, ' ')
        )
        .filter((name, index, all) => all.indexOf(name) === index)
        .join(', ');
};

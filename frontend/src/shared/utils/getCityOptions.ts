type SelectType = {
    value: string;
    label: string;
};

export const getCityOptions = (lang: 'ru' | 'en', values: SelectType[]) =>
    lang === 'ru'
        ? values
        : values.map((el) => ({
              value: el.value,
              label: `${el.value[0].toUpperCase()}${el.value.slice(
                  1
              )}`,
          }));

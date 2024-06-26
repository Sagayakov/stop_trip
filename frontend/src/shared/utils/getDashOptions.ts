type SelectType = {
    value: string;
    label: string;
};

export const getDashOptions = (lang: 'ru' | 'en', values: SelectType[] | undefined = []) => 
    lang === 'ru'
        ? values
        : values.map((el) => ({
              value: el.value,
              label: `${el.value
                .split('_')
                .map((item) => `${item[0].toUpperCase()}${item.slice(1)}`)
                .join(' ')}`,
          }));

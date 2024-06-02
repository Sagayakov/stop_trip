import { SearchFormTypes } from 'pages/advertisementSearch/AdvertisementSearch.tsx';
import { Price } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';

export const queryStringBuilder = (currentParams: URLSearchParams, data: SearchFormTypes) => {
    const params = new URLSearchParams(currentParams);

    (Object.keys(data) as Array<keyof SearchFormTypes>).forEach(key => {
        const value = data[key];

        if (Array.isArray(value)) {
            value.forEach(item => params.append(key, item));
        } else if (typeof value === 'object' && value !== null) {
            if (key === 'price') {
                const price = value as Price;
                if (price.min !== null && price.min !== undefined && price.min) {
                    params.set('price_min', String(price.min));
                }
                if (price.max !== null && price.max !== undefined && price.max) {
                    params.set('price_max', String(price.max));
                }
            } else {
                (Object.keys(value) as Array<keyof typeof value>).forEach(subKey => {
                    const subValue = value[subKey];
                    if (subValue !== null && subValue !== undefined) {
                        params.set(`${key}[${subKey}]`, String(subValue));
                    }
                });
            }
        } else if (value !== null && value !== undefined && value !== '') {
            params.set(key, String(value));
        }
    });

    return params.toString();
};
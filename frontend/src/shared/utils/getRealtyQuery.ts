import {
    Commission,
    LivingSpace,
    Price,
    RoomsCount,
    TotalArea,
    TypeSettingRealty,
} from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { getMultiQuery } from './getMultiQuery';

export const getRealtyQuery = (data: TypeSettingRealty) => {
    let query = '';

    for (const key in data) {
        if (data[key as keyof TypeSettingRealty]) {
            if (Number(data[key as keyof TypeSettingRealty])) {
                query += `&${key}=${data[key as keyof TypeSettingRealty]
                    .toString()
                    .replace(/,/g, '.')}`;
            } else if (
                data[key as keyof TypeSettingRealty] === 'property_balcony'
            ) {
                query += `&property_balcony=${
                    data[key as keyof TypeSettingRealty]
                }`;
            } else if (
                typeof data[key as keyof TypeSettingRealty] === 'boolean'
            ) {
                query += `&${key}=true`;
            } else if (Array.isArray(data[key as keyof TypeSettingRealty])) {
                query += getMultiQuery(
                    key,
                    data[key as keyof TypeSettingRealty] as string[]
                );
            } else {
                type Total =
                    | TotalArea
                    | LivingSpace
                    | Commission
                    | RoomsCount
                    | Price;

                const limitQuery = (
                    data[key as keyof TypeSettingRealty] as Price
                ).limit
                    ? `&price_max=${
                          (data[key as keyof TypeSettingRealty] as Price).limit
                      }`
                    : '';

                const maxQuery = (data[key as keyof TypeSettingRealty] as Total)
                    .max
                    ? `&${key}_max=${(
                          data[key as keyof TypeSettingRealty] as Total
                      ).max
                          .toString()
                          .replace(/,/g, '.')}`
                    : '';

                const minQuery = (data[key as keyof TypeSettingRealty] as Total)
                    .min
                    ? `&${key}_min=${(
                          data[key as keyof TypeSettingRealty] as Total
                      ).min
                          .toString()
                          .replace(/,/g, '.')}`
                    : '';

                query += `${minQuery}${maxQuery}${limitQuery}`;
            }
        }
    }

    return query;
};

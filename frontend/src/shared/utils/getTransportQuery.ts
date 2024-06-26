import {
    TypeSettingTransport,
    Price,
} from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { getMultiQuery } from './getMultiQuery';

export const getTransportQuery = (data: TypeSettingTransport) => {
    let query = '';

    for (const key in data) {
        if (data[key as keyof TypeSettingTransport]) {
            if (typeof data[key as keyof TypeSettingTransport] === 'boolean') {
                query += `&${key}=true`;
            } else if (
                typeof data[key as keyof TypeSettingTransport] === 'string'
            ) {
                query += `&${key}=${data[key as keyof TypeSettingTransport]}`;
            } else if (Array.isArray(data[key as keyof TypeSettingTransport])) {
                query += getMultiQuery(
                    key,
                    data[key as keyof TypeSettingTransport] as string[]
                );
            } else {
                const maxQuery = (
                    data[key as keyof TypeSettingTransport] as Price
                ).max
                    ? `&${key}_max=${(
                          data[key as keyof TypeSettingTransport] as Price
                      ).max
                          .toString()
                          .replace(/,/g, '.')}`
                    : '';

                const minQuery = (
                    data[key as keyof TypeSettingTransport] as Price
                ).min
                    ? `&${key}_min=${(
                          data[key as keyof TypeSettingTransport] as Price
                      ).min
                          .toString()
                          .replace(/,/g, '.')}`
                    : '';

                query += `${minQuery}${maxQuery}`;
            }
        }
    }
    return query;
};

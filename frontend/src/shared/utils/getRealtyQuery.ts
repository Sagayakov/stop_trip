import { 
    Commission,
    LivingSpace,
    Price,
    TotalArea,
    TypeSettingRealty
} from "../../widgets/settingForm/settingRealty/libr/TypeSettingRealty";
import { getMultiQuery } from "./getMultiQuery";

export const getRealtyQuery = (data: TypeSettingRealty) => {
    let query = '';

    for (const key in data) {
        if (data[key as keyof TypeSettingRealty]) {
            if (Number(data[key as keyof TypeSettingRealty])) {
                query += `&${key}=${data[key as keyof TypeSettingRealty]}`;
            } else if (data[key as keyof TypeSettingRealty] === "property_amenities") {
                query +=`&property_amenities=${(data[key as keyof TypeSettingRealty] as string)
                    .split(',').map((el) => `${el.trim()}`).join(',')}`;
            } else if (data[key as keyof TypeSettingRealty] === "property_balcony") {
                query +=`&property_balcony=${data[key as keyof TypeSettingRealty]}`;
            } else if (typeof data[key as keyof TypeSettingRealty] === "boolean") {
                query += `&${key}=true`;
            } else if (Array.isArray(data[key as keyof TypeSettingRealty])) {
                query += getMultiQuery(key, data[key as keyof TypeSettingRealty] as string[]);
            } else if (data[key as keyof TypeSettingRealty] === "price") {
                const maxQuery = (data[key as keyof TypeSettingRealty] as Price).max
                    ? `&price_max=${(data[key as keyof TypeSettingRealty] as Price).max}`
                    : '';
                const minQuery = (data[key as keyof TypeSettingRealty] as Price).min
                    ? `&price_min=${(data[key as keyof TypeSettingRealty] as Price).min}`
                    : '';
                const limitsQuery = (data[key as keyof TypeSettingRealty] as Price).adverts
                    ? `&price_max=${(data[key as keyof TypeSettingRealty] as Price).adverts}`
                    : '';
                query += `${minQuery}${maxQuery}${limitsQuery}`;
            } else {
                type Total = TotalArea | LivingSpace | Commission;
                const maxQuery = (data[key as keyof TypeSettingRealty] as Total).max
                    ? `&${key}_max=${(data[key as keyof TypeSettingRealty] as Total).max}`
                    : '';
                const minQuery = (data[key as keyof TypeSettingRealty] as Total).min
                    ? `&${key}_min=${(data[key as keyof TypeSettingRealty] as Total).min}`
                    : '';
                query += `${minQuery}${maxQuery}`;
            }
        } 
    }
    return query;
}
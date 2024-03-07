import { ProductType } from 'pages/advertPage/libr/types';

export type FiltersType = Record<keyof ProductType, SelectType[] | RangeType>;

export type ChoicesType = {
    name: keyof ProductType;
    choices: SelectType[] | boolean[];
};

type RangeType = {
    min: number | null;
    max: number | null;
};

export type SelectType = {
    value: string | number | boolean;
    label: string | number;
};

export type AvailableFiltersType = {
    count: number;
    available_params: Record<
        keyof ProductType,
        string[] | { min: number; max: number }
    >;
};

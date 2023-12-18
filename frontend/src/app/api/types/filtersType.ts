import { ProductType } from "pages/advertPage/libr/types";

export type FiltersType = {
    count: number;
    params: ChoicesType[] | RangeType[];
}

export type ChoicesType = {
    name: keyof ProductType;
    choices: SelectType[] | boolean[];
}

type RangeType = {
    name: keyof ProductType;
    range: {
        min: number | null;
        max: number | null;
    }[];
}

export type SelectType = {
    value: string| number | null;
    label: string| number | null;
}
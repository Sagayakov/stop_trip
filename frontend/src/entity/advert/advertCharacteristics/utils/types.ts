import { Amenity } from 'pages/advertPage/libr/types';

export type CharacteristicsListType = [
    string,
    string | number | boolean | string[] | null | Amenity[],
][];

export type ValueType = string | number | boolean | string[] | null | Amenity[];

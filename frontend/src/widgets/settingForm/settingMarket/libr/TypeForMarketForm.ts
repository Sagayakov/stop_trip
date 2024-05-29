export interface TypeForMarketForm {
    region: string[];
    city: string[];
    market_condition: string;
    price: Price;
}

export interface Price {
    min: number;
    max: number;
}

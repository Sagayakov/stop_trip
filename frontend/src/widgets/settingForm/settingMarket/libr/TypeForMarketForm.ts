export interface TypeForMarketForm {
    market_condition: Condition | Condition[];
}
interface Condition {
    value: string;
    label: string;
}

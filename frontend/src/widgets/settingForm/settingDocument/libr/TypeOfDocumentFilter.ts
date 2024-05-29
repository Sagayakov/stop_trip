export interface TypeOfDocumentFilter {
    region: string[];
    city: string[];
    document_type: string[];
    document_duration: string[];
    price: Price;
}

export interface Price {
    min: number;
    max: number;
}
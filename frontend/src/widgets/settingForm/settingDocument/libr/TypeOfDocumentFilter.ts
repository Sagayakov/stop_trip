export interface TypeOfDocumentFilter {
    city: string[];
    document_type: Document[];
    document_duration: Document[];
}

interface Document {
    value: string;
    label: string;
}

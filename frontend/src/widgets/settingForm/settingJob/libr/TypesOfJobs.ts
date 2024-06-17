export interface TypesOfJobs {
    region: string[];
    city: string[];
    job_type: string[];
    job_duration: string[];
    job_payment_type: string[];
    job_experience: boolean;
    price: Price;
}

export interface SelectOption {
    value: string;
    label: string;
}

export interface Price {
    min: number;
    max: number;
}

export interface TypesOfJobs {
    typeOfJob: string[];
    durationOfWork: string[];
    typeOfPayment: string[];
    withExperience: boolean;
    price: Price;
}

export interface SelectOption {
    value: string;
    label: string;
}

interface Price {
    min: number;
    max: number;
}

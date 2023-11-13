export interface TypeSettingTransport {
    typeOfService: TypeOfServise;
    typeOfTransport: TypeOfTransport;
    transportationCategory: string[];
    mark: string[];
    model: string[];
    engineType: string[];
    engineСapacity: EngineCapacity;
    drive: Drive;
    yearOfProduction: YearOfProduction;
    transmissionType: TransmissionType;
    bodyType: string[];
    condition: Condition;
    commission: Comission;
}
export interface SelectOption {
    value: string;
    label: string;
}
type TypeOfServise = 'Аренда' | 'Продажа'

type TypeOfTransport = 'Наземный' | 'Водный'
type Drive = 'Передний' | 'Задний' | 'Постоянный полный' | 'Полный подключаемый'
interface EngineCapacity{
    min: number
    max: number
}
type TransmissionType = 'МКПП' | 'АКПП' | 'Робот'
interface YearOfProduction{
    min: number
    max: number
}

type Condition = 'Новый' | 'Б/у' | 'Аварийный' | 'На запчасти'

interface Comission {
    min: number
    max: number
}
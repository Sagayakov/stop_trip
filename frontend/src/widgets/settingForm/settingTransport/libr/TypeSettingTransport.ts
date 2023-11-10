export interface TypeSettingTransport {
    typeOfService: TypeOfServise;
    typeOfTransport: TypeOfTransport;
    transportationCategory: TransportationCategory | SelectOption | string[];
    mark: Mark;
    model: Model;
    engineType: EngineType;
    engineСapacity: string[];
    drive: Drive;
    yearOfProduction: string[];
    transmissionType: TransmissoinType;
    bodyType: BodyType;
    condition: Condition;
    passengerCapacity: number;
    commission: number;
}
interface SelectOption {
    value: string;
    label: string;
}
type TypeOfServise = 'Аренда' | 'Продажа'

type TypeOfTransport = 'Наземный' | 'Водный'

type TransportationCategory =
    | 'Мотоцикл'
    | 'Мопед'
    | 'Легковой автомобиль'
    | 'Грузовой автомобиль'
    | 'Автобус'
    | 'Трицикл'
    | 'Трэйлер'
    | 'Дом на колесах'
    | 'Моторная лодка'
    | 'Вёсельная лодка'
    | 'Катер'
    | 'Другое'
    | null

type Mark = 'Не выбрано' |'Yamaha'

type Model = 'Не выбрано' | 'Fascino'

type EngineType = 'Не выбрано' | 'Бензиновый' | 'Дизельный' | 'Газовый' | 'Электрический' | 'Гибрид'

type Drive = 'Не выбрано' | 'Передний' | 'Задний' | 'Постоянный полный' | 'Полный подключаемый'

type TransmissoinType = 'Не выбрано' | 'МКПП' | 'АКПП' | 'Робот'

type BodyType = 'Не выбрано' | 'Седан' | 'Хэтчбэк' | 'Лифтбэк' | 'Купе' | 'Кабриолет' | 'Внедорожник' | 'Лимузин' | 'Пикап'

type Condition = 'Не выбрано' | 'Новый' | 'Б/у' | 'Аварийный' | 'На запчасти'

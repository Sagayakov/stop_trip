export interface TypeSettingTransport {
    typeOfService: TypeOfServise;
    typeOfTransport: TypeOfTransport;
    transportationCategory: TransportationCategory;
    mark: Mark;
    model: Model;
    engineType: EngineType;
    engineСapacity: number;
    drive: Drive;
    yearOfProduction: number;
    transmissionType: TransmissoinType;
    bodyType: BodyType;
    condition: Condition;
    passengerCapacity: number
}

type TypeOfServise = 'Аренда' | 'Продажа';

type TypeOfTransport = 'Наземный' | 'Водный';

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
    | 'Другое';

type Mark = 'Yamaha'

type Model = 'Fascino'

type EngineType = 'Бензиновый' | 'Дизельный' | 'Газовый' | 'Электрический' | 'Гибрид'

type Drive = 'Передний' | 'Задний' | 'Постоянный полный' | 'Полный подключаемый'

type TransmissoinType = 'МКПП' | 'АКПП' | 'Робот'

type BodyType = 'Седан' | 'Хэтчбэк' | 'Лифтбэк' | 'Купе' | 'Кабриолет' | 'Внедорожник' | 'Лимузин' | 'Пикап'

type Condition = 'Новый' | 'Б/у' | 'Аварийный' | 'На запчасти';

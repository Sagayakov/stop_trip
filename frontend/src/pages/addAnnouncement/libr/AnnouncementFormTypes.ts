export interface FormAddAnn extends TypeForTransport, TypeForRealty {
    announcementCategory: string;
    announcementName: string;
    announcementPrice: number;
    announcementDescription: string;
    announcementPhoto: File[];
    announcementLocation: AnnouncementLocation;
    announcementDoc: Doc;
    announcementEvent: AnnEvent;
    announcementFood: Food;
    annoucementTaxi: Taxi;
    announcementService: boolean;
    annoucementMarket: string[];
    announcementExchange: Exchange;
    announcementJob: Job;
    announcementExcursion: Excursion;
}
export interface SelectOption {
    value: string;
    label: string;
}
interface AnnouncementLocation {
    latitude: number;
    longitude: number;
}
interface Doc {
    docType: string;
    validityPeriod: string;
}
interface AnnEvent {
    start: string;
    end: string;
    isOnline: boolean;
}
interface Food {
    delivery: boolean;
    establishment: boolean;
    foodType: string[];
}
interface Taxi {
    unit: string[];
    taxiType: string[];
}
interface Exchange {
    name: string[];
    exchangeFor: string[];
    rate: string;
}

interface Job {
    jobType: string[];
    duration: string[];
    payment: string[];
    withExp: boolean;
}

interface Excursion {
    food: boolean;
    transfer: boolean;
}

interface TypeForTransport {
    transportTypeOfService: TypeOfServise;
    transportTypeOfTransport: TypeOfTransport;
    transportTransportationCategory: string[] | string;
    transportMark: string[] | string;
    transportModel: string[] | string;
    transportEngineType: string[] | string;
    transportEngineСapacity: EngineCapacity;
    transportDrive: Drive;
    transportYearOfProduction: YearOfProduction;
    transportTransmissionType: TransmissionType;
    transportBodyType: string[] | string;
    transportCondition: Condition;
    transportCommission: Comission;
}
interface TypeForRealty {
    TypeOfService: TypeOfServise;
    PropertyCity: string[] | string;
    PropertyDistrict: string[] | string;
    FloorsQuantity: number;
    FloorNumber: number;
    Prepayment: string[] | string;
    HouseType: string[] | string;
    TypeOfProperty: string[] | string;
    RentalCondition: string[] | string;
    TotalArea: TotalArea;
    LivingSpace: LivingSpace;
    Parking: boolean;
    SleepingPlaces: number;
    HasFurniture: boolean;
    Amenities: string[] | string;
    RoomsQuantity: RoomsQuantity;
    BathRoom: BathRoom;
    BathroomQuantity: number;
    Balcony: boolean | string;
    Comission: Comission;
}

type TypeOfServise = 'Аренда' | 'Продажа';

type TypeOfTransport = 'Наземный' | 'Водный';
type Drive =
    | 'Передний'
    | 'Задний'
    | 'Постоянный полный'
    | 'Полный подключаемый';
interface EngineCapacity {
    min: number;
    max: number;
}
type TransmissionType = 'МКПП' | 'АКПП' | 'Робот' | 'Вариатор';
interface YearOfProduction {
    min: number;
    max: number;
}

type Condition = 'Новый' | 'Б/у' | 'Аварийный' | 'На запчасти';
interface TotalArea {
    min: number;
    max: number;
}

interface LivingSpace {
    min: number;
    max: number;
}

type RoomsQuantity = 1 | 2 | 3 | 4;
type BathRoom = 'separate' | 'combined';

interface Comission {
    min: number;
    max: number;
}

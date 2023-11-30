import { TypeSettingTransport } from "../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport";

export interface FormAddAnn extends TypeSettingTransport{
    announcementCategory: string[];
    announcementName: string;
    announcementPrice: string;
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

interface Excursion{
    food: boolean
    transfer: boolean
}
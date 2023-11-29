export interface FormAddAnn {
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
    docType: string
    validityPeriod: string
}
interface AnnEvent{
    start: string
    end: string
    isOnline: boolean
}
interface Food{
    delivery: boolean
    establishment: boolean
    foodType: string[]
}
interface Taxi {
    unit: string[]
    taxiType: string[]
}
export interface FormAddAnn {
    announcementCategory: string[];
    announcementName: string;
    announcementPrice: string;
    announcementDescription: string;
    announcementPhoto: File[];
    announcementLocation: AnnouncementLocation;
}
export interface SelectOption {
    value: string;
    label: string;
}
interface AnnouncementLocation {
    latitude: number;
    longitude: number;
}
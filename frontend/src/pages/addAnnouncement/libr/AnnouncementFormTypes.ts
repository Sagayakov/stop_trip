export interface FormAddAnn {
    announcementCategory: string[];
    announcementName: string;
    announcementPrice: string;
    announcementDescription: string;
    announcementPhoto: FileList[];
    announcementLocation: string[];
}
export interface SelectOption {
    value: string;
    label: string;
}
import { Messenger } from 'pages/advertPage/libr/types';

export type MessengersType = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Result[];
};

export type Result = {
    id: number;
    messenger: Messenger;
    link_to_user: string;
};

export type AddMessengerType = {
    messenger: number;
    link_to_user: string;
};

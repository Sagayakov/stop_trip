export type OptionType = {
    value: string;
    label: string;
    icon: string;
};

export const options: OptionType[] = [
    {
        value: 'tg',
        label: 'Telegram',
        icon: '../../../../src/shared/ui/icons/tg.png',
    },
    {
        value: 'whatsapp',
        label: 'WhatsApp',
        icon: '/src/shared/ui/icons/whatsapp.png',
    },
    {
        value: 'viber',
        label: 'Viber',
        icon: 'src/shared/ui/icons/viber.png',
    },
    {
        value: 'fb',
        label: 'Messenger',
        icon: 'src/shared/ui/icons/fb.png',
    },
];

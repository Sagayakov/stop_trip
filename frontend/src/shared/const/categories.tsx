import { BuySell } from '../ui/icons/category/BuySell';
import { Currency } from '../ui/icons/category/Currency';
import { Docs } from '../ui/icons/category/Docs';
import { Excursion } from '../ui/icons/category/Excursion';
import { Food } from '../ui/icons/category/Food';
import { Job } from '../ui/icons/category/Job';
import { Realty } from '../ui/icons/category/Realty';
import { Service } from '../ui/icons/category/Service';
import { Taxi } from '../ui/icons/category/Taxi';
import { Transport } from '../ui/icons/category/Transport';

export type Category = {
    description: string;
    icon: () => JSX.Element;
};

export type Categories =
    | 'property'
    | 'transport'
    | 'exchange_rate'
    | 'document'
    | 'food'
    | 'event'
    | 'market'
    | 'job'
    | 'taxi'
    | 'service'
    | 'excursion';

export const categories: Record<string, Category> = {
    property: { description: 'Недвижимость', icon: Realty },
    transport: { description: 'Транспорт', icon: Transport },
    exchange_rate: { description: 'Обмен валют', icon: Currency },
    document: { description: 'Документы', icon: Docs },
    food: { description: 'Еда', icon: Food },
    event: { description: 'Мероприятия', icon: Docs },
    market: { description: 'Покупка/продажа', icon: BuySell },
    job: { description: 'Работа', icon: Job },
    taxi: { description: 'Такси', icon: Taxi },
    service: { description: 'Услуги', icon: Service },
    excursion: { description: 'Экскурсии', icon: Excursion },
};

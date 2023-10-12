import { BuySell } from '../category/BuySell';
import { Currency } from '../category/Currency';
import { Docs } from '../category/Docs';
import { Excursion } from '../category/Excursion';
import { Food } from '../category/Food';
import { Job } from '../category/Job';
import { Realty } from '../category/Realty';
import { Service } from '../category/Service';
import { Taxi } from '../category/Taxi';
import { Transport } from '../category/Transport';

type Category = {
    description: string;
    icon: () => JSX.Element;
};

export const categories: Record<string, Category> = {
    realty: { description: 'Аренда недвижимости', icon: Realty },
    transport: { description: 'Аренда транспорта', icon: Transport },
    currency: { description: 'Валютные пары', icon: Currency },
    docs: { description: 'Документы', icon: Docs },
    food: { description: 'Домашняя еда', icon: Food },
    events: { description: 'Мероприятия', icon: Docs },
    market: { description: 'Покупка/продажа', icon: BuySell },
    job: { description: 'Работа', icon: Job },
    taxi: { description: 'Такси', icon: Taxi },
    services: { description: 'Услуги', icon: Service },
    tours: { description: 'Экскурсии', icon: Excursion },
};

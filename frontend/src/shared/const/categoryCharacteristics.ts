import { Categories } from './categories';

export const categoryCharacteristicsKeys: Record<
    Categories,
    Record<string, string>
> = {
    transport: {
        transport_engine_type: 'Тип двигателя',
        transport_drive_type: 'Привод',
        transport_engine_volume: 'Объём',
        transport_year_of_production: 'Год производства',
        transport_transmission_type: 'Тип коробки передач',
        transport_body_type: 'Тип кузова',
        transport_condition: 'Состояние',
        transport_passengers_quality: 'Количество пассажиров',
        transport_commission: 'Комиссия',
    },
    property: {
        property_building_max_floor: 'Количество этажей в доме',
        property_floor: 'Номер этажа',
        property_bathroom_count: 'Количество санузлов',
        property_bathroom_type: 'Тип санузла',
        property_area: 'Общая площадь',
        property_living_area: 'Жилая площадь',
        property_balcony: 'Балкон',
        property_has_furniture: 'Мебель',
        property_amenities: 'Удобства',
        property_house_type: 'Тип дома',
        property_has_parking: 'Есть парковка',
        property_rental_condition: 'Условия аренды',
        property_prepayment: 'Предоплата',
        property_sleeping_places: 'Количество спальных мест',
    },
    taxi: {
        taxi_unit: 'Единица измерения',
        taxi_type: 'Вид такси',
    },
    job: {
        job_type: 'Тип работы',
        job_duration: 'Продолжительность работы',
        job_payment_type: 'Тип оплаты',
        job_experience: 'С опытом',
    },
    event: {
        start_date: 'Дата начала',
        end_date: 'Дата окончания',
        is_online: 'Онлайн',
    },
    service: {
        service_home_visit: 'Выезд на дом',
    },
    exchange_rate: {
        proposed_currency: 'Предлагаемая валюта',
        exchange_for: 'Обмен на',
        exchange_rate: 'Курс',
    },
    document: {},
    food: {},
    market: {},
    excursion: {},
};

export const categoryCharacteristicsValues: Record<
    Categories,
    Record<string, Record<string, string>>
> = {
    transport: {
        transport_engine_type: {
            fuel: 'Бензин',
            diesel: 'Дизель',
            gas: 'Газ',
            electric: 'Электричество',
            hybrid: 'Гибрид',
        },
        transport_drive_type: {
            front_wheel: 'Передний',
            rear_wheel: 'Задний',
            all_wheel: 'Постоянный полный',
            four_wheel: 'Подключаемый полный',
        },
        transport_transmission_type: {
            mechanic: 'Механическая',
            automatic: 'Автоматическая',
            robot: 'Робот',
            cvt: 'Вариатор',
        },
        transport_body_type: {
            sedan: 'Седан',
            liftback: 'Лифтбэк',
            coupe: 'Купе',
            convertible: 'Кабриолет',
            hatchback: 'Хэтчбэк',
            SUV: 'Внедорожник',
            limousine: 'Лимузин',
            pickup: 'Пикап',
        },
        transport_condition: {
            new: 'Новый',
            used: 'Б/у',
            salvage: 'Аварийный',
            spare: 'На запчасти',
        },
    },
    property: {
        property_bathroom_type: {
            combined: 'Совмещённый',
            separate: 'Раздельный',
        },
        property_balcony: {
            yes: 'Есть',
            no: 'Нет',
            loggia: 'Лоджия',
        },
        property_house_type: {
            panel: 'Панельный',
            brick: 'Кирпичный',
            wooden: 'Деревянный',
            block: 'Блочный',
        },
        property_rental_condition: {
            family: 'Семье',
            alone: 'Для одного',
            girls: 'Девушке',
            office: 'Под офис',
            students: 'Студентам',
            not_companies: 'Не компаниям',
        },
        property_prepayment: {
            without: 'Без предоплаты',
            month: 'Месяц',
            two_months: 'Два месяца',
            three_months: 'Три месяца',
            half_a_year: 'Полгода',
        },
    },
    taxi: {
        taxi_unit: {
            km: 'км',
            hour: 'час',
            route: 'маршрут',
        },
        taxi_type: {
            economy: 'Эконом',
            comfort: 'Комфорт',
            business: 'Бизнес',
            station_wagon: 'Универсал',
            minivan: 'Минивэн',
        },
    },
    job: {
        job_type: {
            full_time: 'Полный день',
            part_time: 'Неполный день',
        },
        job_duration: {
            one_time_task: 'Разовое задание',
            temporary: 'Временная работа',
            permanent: 'Постоянная работа',
            other: 'Другое',
        },
        job_payment_type: {
            hourly_payment: 'Почасовая',
            daily_payment: 'Ежедневная',
            weekly_payment: 'Еженедельная',
            monthly_payment: 'Ежемесячная',
            other: 'Другое',
        },
    },
    event: {},
    service: {},
    exchange_rate: {},
    document: {},
    food: {},
    market: {},
    excursion: {},
};

export interface FormAddAnn {
    category?: string;
    title?: string;
    price?: number;
    description?: string;
    coordinates?: string;
    country?: string;
    region?: string;
    city?: string;
    slug?: string;
    //фото
    images?: File[];
    upload_images?: File[];
    delete_images?: number[];
    //youtube
    youtube?: string;
    //документы
    document_type?: string;
    document_duration?: string;
    //мероприятия
    start_date?: string;
    end_date?: string;
    is_online?: boolean;
    //валюта
    proposed_currency?: string;
    exchange_for?: string;
    exchange_rate?: number;
    //экскурсии
    excursion_food?: boolean;
    excursion_transfer?: boolean;
    //еда
    food_delivery?: boolean;
    food_establishment?: boolean;
    food_type?: string;
    //работа
    job_type?: string;
    job_duration?: string;
    job_payment_type?: string;
    job_experience?: boolean;
    //купля/продажа
    market_condition?: string;
    //услуги
    service_home_visit?: boolean;
    //такси
    taxi_unit?: string;
    taxi_type?: string;
    //недвижимость
    property_type_of_service?: string;
    property_type?: string;
    property_building_max_floor?: number;
    property_floor?: number;
    property_bathroom_count?: number;
    property_bathroom_type?: string;
    property_area?: number;
    property_living_area?: number;
    property_balcony?: string;
    property_has_furniture?: boolean;
    property_amenities?: string[];
    property_house_type?: string;
    property_has_parking?: boolean;
    property_rental_condition?: string;
    property_prepayment?: string;
    property_sleeping_places?: number;
    property_rooms_count?: number;
    property_commission?: number;
    property_city?: string[];
    property_district?: string[];
    //транспорт
    transport_type_of_service?: string;
    transport_type?: string;
    transport_category?: string;
    transport_brand?: string;
    transport_model?: string;
    transport_engine_type?: string;
    transport_drive_type?: string;
    transport_engine_volume?: number;
    transport_year_of_production?: number;
    transport_transmission_type?: string;
    transport_body_type?: string;
    transport_condition?: string;
    transport_passengers_quality?: number;
    transport_vin?: string;
    transport_commission?: number;
}

export interface SelectOption {
    value: string;
    label: string;
    // value: string | number | null | boolean;
    // label: string | number | null | boolean;
}
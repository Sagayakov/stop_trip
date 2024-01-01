import { categorySubTypesDictionary } from 'shared/const/categorySubTypesDictionary.ts';
import { LastAdvertsImages } from 'app/api/types/lastAdvertsTypes.ts';
import { Categories } from 'shared/const/categories.tsx';

export type ProductType = {
    property_commission: null;
    document_type: string;
    document_duration: string;
    market_condition: string;
    excursion_food: boolean;
    excursion_transfer: boolean;
    food_delivery: boolean;
    food_establishment: boolean;
    food_type: string;
    category: Categories;
    date_create: string;
    date_update: string;
    description: string;
    end_date: null | string;
    exchange_for: null | string;
    exchange_rate: null | string;
    id: number;
    images: LastAdvertsImages[];
    is_online: boolean;
    is_published: boolean;
    job_duration: null | string;
    job_experience: boolean;
    job_payment_type: null | string;
    job_type: null | keyof typeof categorySubTypesDictionary;
    owner: Owner;
    price: null | number;
    property_amenities: Amenity[];
    property_area: null | string;
    property_balcony: string;
    property_type: string;
    property_bathroom_count: null | number;
    property_bathroom_type: string;
    property_building_max_floor: null | number;
    country: string | null;
    property_city: { name: string } | null;
    city: { name: string } | null;
    coordinates: string;
    property_district: string | null;
    region: string | null;
    property_floor: null | number;
    property_has_furniture: boolean;
    property_has_parking: boolean;
    property_house_type: keyof typeof categorySubTypesDictionary;
    property_living_area: null | string;
    property_prepayment: string;
    property_rental_condition: string;
    property_rooms_count: null | number;
    property_sleeping_places: null | number;
    property_type_of_service: string;
    proposed_currency: null | string;
    service_home_visit: boolean;
    slug: string;
    start_date: null | string;
    taxi_type: null | keyof typeof categorySubTypesDictionary;
    taxi_unit: null | string;
    title: string;
    transport_body_type: null | string;
    transport_brand: null | string;
    transport_category: null | keyof typeof categorySubTypesDictionary;
    transport_condition: null | string;
    transport_drive_type: null | string;
    transport_engine_type: null | string;
    transport_engine_volume: null | number;
    transport_model: null | string;
    transport_passengers_quality: null | string;
    transport_transmission_type: null | string;
    transport_type: null | string;
    transport_type_of_service: null | string;
    transport_vin: null | number;
    transport_year_of_production: null | number;
    transport_commission: null | number;
};

type Owner = {
    date_joined: string;
    email: string;
    full_name: string;
    id: number;
    phone: string;
};

type Amenity = {
    name: string;
};

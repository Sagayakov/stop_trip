import { lazy } from 'react';

export const SettingCurrencyForm = lazy(
    () => import('widgets/settingForm/settingCurrency/SettingCurrencyForm')
);
export const SettingRealtyForm = lazy(
    () => import('widgets/settingForm/settingRealty/SettingRealtyForm')
);
export const SettingTransportForm = lazy(
    () => import('widgets/settingForm/settingTransport/SettingTransportForm')
);
export const SettingTaxiForm = lazy(
    () => import('widgets/settingForm/settingTaxi/SettingTaxiForm')
);
export const SettingServicesForm = lazy(
    () => import('widgets/settingForm/settingServices/SettingServicesForm')
);
export const SettingEventForm = lazy(
    () => import('widgets/settingForm/settingEvent/SettingEventForm')
);
export const SettingJobForm = lazy(
    () => import('widgets/settingForm/settingJob/SettingJobForm')
);
export const SettingExcursionForm = lazy(
    () => import('widgets/settingForm/settingExcursion/SettingExcursionForm')
);
export const SettingDocumentForm = lazy(
    () => import('widgets/settingForm/settingDocument/SettingDocumentForm')
);
export const SettingFoodForm = lazy(
    () => import('widgets/settingForm/settingFood/SettingFoodForm')
);
export const SettingMarketForm = lazy(
    () => import('widgets/settingForm/settingMarket/SettingMarketForm.tsx')
);

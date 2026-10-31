import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { fetchSellerPhone, PhoneLimitError, PhoneSource } from './fetchSellerPhone.ts';

/**
 * Загружает телефон продавца по нажатию и показывает понятные ошибки.
 * Источник — объявление (строка slug) или продавец ({ userId }).
 */
export const useSellerPhone = (source: string | { userId: number }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    const getPhone = useCallback(async (): Promise<string | null> => {
        setIsLoading(true);
        try {
            const phoneSource: PhoneSource =
                typeof source === 'string' ? { advertSlug: source } : source;
            const phone = await fetchSellerPhone(phoneSource);
            if (!phone) {
                toast.info(`${t('advert-page.no-phone')}`, { toastId: 'no phone toast' });
            }
            return phone;
        } catch (error) {
            const message =
                error instanceof PhoneLimitError
                    ? t('advert-page.phone-limit')
                    : t('main-page.toast-wrong');
            toast.error(`${message}`, { toastId: 'phone error toast' });
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [source, t]);

    return { getPhone, isLoading };
};

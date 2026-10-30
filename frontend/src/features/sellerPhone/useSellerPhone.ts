import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { fetchSellerPhone, PhoneLimitError } from './fetchSellerPhone.ts';

/** Загружает телефон продавца по нажатию и показывает понятные ошибки. */
export const useSellerPhone = (slug: string) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    const getPhone = useCallback(async (): Promise<string | null> => {
        setIsLoading(true);
        try {
            const phone = await fetchSellerPhone(slug);
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
    }, [slug, t]);

    return { getPhone, isLoading };
};

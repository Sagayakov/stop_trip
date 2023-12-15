import { useTranslation } from 'react-i18next';

export const AnnouncementSubmitButton = () => {
    const { t } = useTranslation();

    return (
        <div className="add-ann-form-button">
            <input type="submit" value={t('main-page.post-advert')} />
            <button className="goBack">{t('add-page.back')}</button>
        </div>
    );
};

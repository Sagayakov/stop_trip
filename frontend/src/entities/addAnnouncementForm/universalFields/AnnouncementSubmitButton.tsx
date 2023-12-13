import { useTranslation } from 'react-i18next';

export const AnnouncementSubmitButton = () => {
    const { t } = useTranslation();

    return (
        <div className="add-ann-form-button">
            <input type="submit" value={t('main-page.publish')} />
            <button className="goBack">Назад</button>
        </div>
    );
};

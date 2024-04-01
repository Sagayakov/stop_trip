import { ColorRing } from 'react-loader-spinner';
import './LoadingWithBackground.scss';
import { useTranslation } from 'react-i18next';

export const LoadingWithBackgroundUpload = () => {
    const { t } = useTranslation();

    return (
        <div className="loading-with-background">
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
            <p className="notification">{t('add-page.upload_notification')}</p>
        </div>
    );
};

import { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import './pageNotFound.scss';
import { LoadingWithBackground } from 'entities/loading/LoadingWithBackground.tsx';
const NotFoundNumbers = lazy(
    () => import('../../entities/notFoundNumbers/NotFoundNumbers')
);
const NotFoundCategories = lazy(
    () => import('../../features/notFoundCategories/NotFoundCategories')
);
import { useTranslation } from 'react-i18next';

export const PageNotFound = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="not-found-wrapper">
            <Suspense fallback={<LoadingWithBackground />}>
                <NotFoundNumbers />
                <div className="text-info">
                    <h1 className="info-header">
                        {t('page-not-found.no-page')}
                    </h1>
                    <p>{t('page-not-found.perhaps')}</p>
                </div>
                <button
                    className="button-to-main"
                    onClick={() => navigate('/')}
                >
                    {t('page-not-found.to-main')}
                </button>
                <NotFoundCategories />
            </Suspense>
        </div>
    );
};

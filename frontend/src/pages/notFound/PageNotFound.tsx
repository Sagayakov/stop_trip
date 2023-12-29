import { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './pageNotFound.module.scss';
import { LoadingWithBackground } from 'entities/loading/LoadingWithBackground.tsx';
const NotFoundNumbers = lazy(
    () => import('../../entities/notFoundNumbers/NotFoundNumbers')
);
const NotFoundCategories = lazy(
    () => import('../../features/notFoundCategories/NotFoundCategories')
);
import { useTranslation } from 'react-i18next';

const PageNotFound = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className={styles.not_found_wrapper}>
            <Suspense fallback={<LoadingWithBackground />}>
                <NotFoundNumbers />
                <div className={styles.text_info}>
                    <h1 className={styles.info_header}>
                        {t('page-not-found.no-page')}
                    </h1>
                    <p>{t('page-not-found.perhaps')}</p>
                </div>
                <button
                    className={styles.button_to_main}
                    onClick={() => navigate('/')}
                >
                    {t('page-not-found.to-main')}
                </button>
                <NotFoundCategories />
            </Suspense>
        </div>
    );
};

export default PageNotFound;
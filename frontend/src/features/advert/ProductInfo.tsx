import { PhotoSlider } from 'entity/photoSlider/PhotoSlider.tsx';
import { AdvertCharacteristics } from 'entity/advert/advertCharacteristics/AdvertCharacterictics.tsx';
import { AdvertLocation } from 'entity/location/AdvertLocation.tsx';
import styles from 'widgets/advert/libr/advert.module.scss';
import { ProductType } from 'pages/advertPage/libr/types.ts';
import { useTranslation } from 'react-i18next';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalComplain } from 'features/complainAboutAnnounsement';
import { ModalAddAdvert } from 'features/header/modal/modalAddAdvert/ModalAddAdvert.tsx';
import { useAppSelector } from 'app/store/hooks.ts';
import { useGetUserQuery } from 'app/api/fetchUser';

interface Props {
    data: ProductType;
}
export const ProductInfo = ({ data }: Props) => {
    const [showComplainModal, setShowComplainModal] = useState(false);
    const isAuth = useAppSelector((state) => state.setIsAuth.isAuth);
    const [needAuth, setNeedAuth] = useState(false);
    const { t } = useTranslation();
    const { isMobile } = useMatchMedia();
    const { data: userData } = useGetUserQuery('');

    const handleModalOpen = () => {
        !isAuth ? setNeedAuth(true) : setShowComplainModal(true);
    };

    const formattedDescription = data.description?.split('\n').map((line, index) => (
        <p key={index}>{line.trim()}</p>
    ));

    return (
        <section className={styles.product_info}>
            {!isMobile && <PhotoSlider />}
            <AdvertCharacteristics data={data} />
            {data.description && (
                <div className={styles.description}>
                    <div className={styles.description_header}>
                        {t('advert-page.description')}
                    </div>
                    <div>{formattedDescription}</div>
                </div>
            )}
            {data.coordinates && <AdvertLocation data={data} />}
            <button
                className={styles.complain_button}
                onClick={handleModalOpen}
                disabled={data.owner.id === userData?.id}
            >
                {t('add-page.complain')}
            </button>

            {showComplainModal &&
                createPortal(
                    <ModalComplain
                        setShowComplainModal={setShowComplainModal}
                    />,
                    document.body
                )}
            {needAuth && (
                <ModalAddAdvert
                    closeAddModal={() => setNeedAuth(false)}
                    text={t('add-page.need-auth-complain')}
                />
            )}
        </section>
    );
};

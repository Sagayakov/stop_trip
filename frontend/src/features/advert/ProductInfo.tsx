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

interface Props {
    data: ProductType;
}
export const ProductInfo = ({ data }: Props) => {
    const [showComplainModal, setShowComplainModal] = useState(false);
    const { t } = useTranslation();
    const { isMobile } = useMatchMedia();
    return (
        <section className={styles.product_info}>
            {!isMobile && <PhotoSlider />}
            <AdvertCharacteristics data={data} />
            {data.description && (
                <div className={styles.description}>
                    <div className={styles.description_header}>
                        {t('advert-page.description')}
                    </div>
                    <p>{data.description}</p>
                </div>
            )}
            {data.coordinates && <AdvertLocation data={data} />}
            <button onClick={() => setShowComplainModal(!showComplainModal)}>
                {t('add-page.complain')}
            </button>
            {showComplainModal &&
                createPortal(
                    <ModalComplain setShowComplainModal={setShowComplainModal} />,
                    document.body)
            }
        </section>
    );
};

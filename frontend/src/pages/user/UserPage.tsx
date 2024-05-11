import styles from './libr/userPage.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetAdvertsQuery } from 'app/api/fetchAdverts';
import { UserInfo } from 'entity/userInfo/UserInfo';
import { AdvertsTypes } from 'app/api/types/lastAdvertsTypes';
import { Cart } from 'entity/lastAdverts';
import { useGetSellerQuery } from 'app/api/fetchSeller';
import { AdvertMessengers } from 'features/advertMessengers';
import { useMatchMedia } from 'app/hooks/useMatchMedia';
import { useTranslation } from 'react-i18next';
import { CopyNumberMessage } from 'features/copyNumberMessage';
import { toast } from 'react-toastify';

const UserPage = () => {
    const { id } = useParams();
    const { data, refetch } = useGetAdvertsQuery(`?owner=${id}`);
    const { data: sellerData } = useGetSellerQuery(+id!);
    const navigate = useNavigate();
    const { isDesktop } = useMatchMedia();
    const { t } = useTranslation();

    const handleNavigateBack = () => navigate(-1);

    const handleClickShowNumber = () => {
        if (data) {
            const toastId = 'copy number toast';
            toast.success(<CopyNumberMessage phone={sellerData!.phone} />, {
                autoClose: false,
                toastId,
            });
        }
    };

    return (
        <div className={styles.user_page}>
            <span className={styles.arrow_back} onClick={handleNavigateBack}>
                <img src='/icons/arrow_back.svg' alt='Go back' />
            </span>
            {data && sellerData && (
                <div className={styles.user_page_content}>
                    <section className={styles.owner_section}>
                        <UserInfo user={sellerData} className='' refetch={refetch} />
                        {!isDesktop ? (
                            <Link
                                className={styles.call_button}
                                to={`tel:${sellerData.phone}`}
                            >
                                {t('advert-page.call')}
                            </Link>
                        ) : (
                            <button
                                className={styles.call_button}
                                onClick={handleClickShowNumber}
                            >
                                {t('advert-page.show-number')}
                            </button>
                        )}
                        {sellerData.user_messengers.length ? (
                        <AdvertMessengers
                            messengers={sellerData.user_messengers}
                        />
                    ) : null}
                    </section>
                    <section className={styles.user_page_products}>
                        {data.results.map((elem: AdvertsTypes, index) => (
                            <Cart
                                {...elem}
                                key={elem.id}
                                index={index}
                            />
                        ))}
                    </section>
                </div>
                )
            }
        </div>
    );
};

export default UserPage;

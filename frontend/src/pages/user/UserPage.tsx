import styles from './libr/userPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAdvertsQuery } from 'app/api/fetchAdverts';
import { UserInfo } from 'entity/userInfo/UserInfo';
import { AdvertsTypes } from 'app/api/types/lastAdvertsTypes';
import { Cart } from 'entity/lastAdverts';

const UserPage = () => {
    const { id } = useParams();
    const { data, refetch } = useGetAdvertsQuery(`?owner=${id}`);
    const navigate = useNavigate();

    const handleNavigateBack = () => navigate(-1);

    return (
        <div className={styles.user_page}>
            <span className={styles.arrow_back} onClick={handleNavigateBack}>
                <img src='/icons/arrow_back.svg' alt='Go back' />
            </span>
            {data && (
                <div className={styles.user_page_content}>
                    <section className={styles.owner_section}>
                        <UserInfo user={data.results[0].owner} className='' refetch={refetch} />
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

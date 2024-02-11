import { toast } from 'react-toastify';
import { useAppSelector } from 'app/store/hooks.ts';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import styles from 'entity/advert/advertOwner/libr/advertOwner.module.scss';
import { useChangeRatingMutation } from 'app/api/fetchRating';
import { ProductType } from 'pages/advertPage/libr/types';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryDefinition,
} from '@reduxjs/toolkit/dist/query';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';

type StarProps = {
    userId: number;
    id: number;
    prepareStar: number;
    setPrepareStar: React.Dispatch<React.SetStateAction<number>>;
    activeStar: number;
    setActiveStar: React.Dispatch<React.SetStateAction<number>>;
    refetch: () => QueryActionCreatorResult<
        QueryDefinition<
            string,
            BaseQueryFn<
                string | FetchArgs,
                unknown,
                FetchBaseQueryError,
                Record<string, never>,
                FetchBaseQueryMeta
            >,
            'Adverts' | 'MyAnnouncements',
            ProductType,
            'fetchAdverts'
        >
    >;
};

export const Star = ({
    userId,
    id,
    prepareStar,
    setPrepareStar,
    activeStar,
    setActiveStar,
    refetch,
}: StarProps) => {
    const { t } = useTranslation();
    const isAuth: boolean = useAppSelector((state) => state.setIsAuth.isAuth);
    const [changeRating] = useChangeRatingMutation();

    const getStarClass = () => {
        let starClass = '';
        if (prepareStar >= id) {
            starClass = styles.hover_star;
        } else if (activeStar >= id) {
            starClass = styles.active_star;
        } else {
            starClass = '';
        }

        return starClass;
    };

    const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (isAuth) {
            changeRating({ id: userId, body: { rating: id, comment: '' } })
                .unwrap()
                .then(() => {
                    toast.success(t('advert-page.grade-added'));
                    setActiveStar(id);
                    refetch();
                })
                .catch((error) => {
                    toast.error(
                        JSON.stringify(error.data.message).slice(1, -1) ||
                            t('my-settings.smth-wrong')
                    );
                });
        } else {
            toast.error(`${t('advert-page.grade-register')}`);
        }
    };

    return (
        <svg
            width="14"
            height="13"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClick}
            onMouseOver={() => setPrepareStar(id)}
            onMouseLeave={() => setPrepareStar(activeStar)}
            className={getStarClass()}
        >
            <path d="M6.11555 0.676338C6.49076 -0.0348089 7.50924 -0.0348073 7.88445 0.676339L9.21574 3.1996C9.36043 3.47385 9.62416 3.66546 9.92969 3.71832L12.7409 4.20472C13.5331 4.34181 13.8479 5.31044 13.2875 5.88704L11.2991 7.9329C11.083 8.15526 10.9822 8.46529 11.0264 8.77221L11.4325 11.5961C11.5469 12.392 10.723 12.9906 10.0014 12.6358L7.44125 11.377C7.16299 11.2401 6.83701 11.2401 6.55875 11.377L3.99858 12.6358C3.27703 12.9906 2.45306 12.392 2.56751 11.5961L2.97361 8.77221C3.01775 8.46529 2.91702 8.15526 2.70091 7.9329L0.71253 5.88704C0.152135 5.31044 0.466865 4.34181 1.25915 4.20472L4.07031 3.71832C4.37584 3.66546 4.63957 3.47385 4.78426 3.1996L6.11555 0.676338Z" />
        </svg>
    );
};

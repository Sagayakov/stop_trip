import styles from 'pages/myAnnouncements/libr/myAnnouncements.module.scss';
import { Pencil } from 'shared/ui/icons/icons-tools/Pencil.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDeleteAnnouncemetMutation } from 'app/api/fetchAdverts.ts';
import { useAppDispatch } from 'app/store/hooks.ts';
import { getAccessTokenWithRefresh } from 'shared/model/getAccessTokenWithRefresh.ts';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground.tsx';
import { toast } from 'react-toastify';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryDefinition,
} from '@reduxjs/toolkit/query';
import { MyAnnouncements, ChangePublished } from 'app/api/types/myAnnouncements.ts';
import { useEffect } from 'react';

interface Props extends MyAnnouncements{
    // slug: string;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    // is_published: boolean;
    refetch: () => QueryActionCreatorResult<
        QueryDefinition<
            string,
            BaseQueryFn<
                string | FetchArgs,
                unknown,
                FetchBaseQueryError,
                object,
                FetchBaseQueryMeta
            >,
            'Adverts' | 'MyAnnouncements',
            MyAnnouncements[],
            'fetchAdverts'
        >
    >;
}
export const ModalOption = (data: Props) => {
    const { slug, setShowModal, refetch, is_published, description, exchange_rate, category, images, price, title  } = data;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [deleteAnn, { isLoading, isSuccess, isError }] = useDeleteAnnouncemetMutation();
    const dispatch = useAppDispatch();
    const { refreshToken } = getTokensFromStorage();
    const announcementDelete = async () => {
        const result = confirm(t('myAnnouncements.confirm-delete'));
        if (result) {
            try{
                await getAccessTokenWithRefresh(dispatch, refreshToken); //сначала дожидаемся новый accessToken, затем шлем пост запрос
                const { accessToken } = getTokensFromStorage();
                await deleteAnn({ token: accessToken , slug: slug as string });
                refetch();
                setShowModal(false);
            }catch (error) {
                console.log(error);
                toast.error(`${t('errors.add-announcement-error')}`);
            }
        }else{
            setShowModal(false);
        }
    }
    const isPublishedChange = async() => {
        const body: ChangePublished = {
            category: category as string,
            title,
            price,
            description,
            images,
            slug: slug as string,
            exchange_rate,
            is_published: !is_published,
        }
        await getAccessTokenWithRefresh(dispatch, refreshToken);
        const { accessToken } = getTokensFromStorage();
        const response = await fetch(`https://stoptrip.com/api/advertisements/${slug}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`,
                "X-Csrftoken": `${accessToken}`,
            },
            body: JSON.stringify(body),
        })
        const data = await response.json();
        console.log(data)
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success(t('myAnnouncements.success-delete'));
        }
        if (isError) {
            toast.error(t('errors.add-announcement-error'));
        }
    }, [isSuccess, isError, t]);

    return (
        <>
            {isLoading && <LoadingWithBackground />}
            <div className={styles.modal_option}>
                <label className={styles.label_option}>
                    <input type="checkbox" checked={is_published} onChange={isPublishedChange} />
                    <span>{t('myAnnouncements.published')}</span>
                </label>
                <div
                    className={styles.edit}
                    onClick={() => navigate(`/advertisement-editing/${slug}`)}
                >
                    <Pencil color="#000000" />
                    {t('myAnnouncements.edit')}
                </div>
                <div
                    className={styles.delete}
                    onClick={announcementDelete}
                >
                    <span>❌</span>
                    {t('myAnnouncements.delete')}
                </div>
            </div>
        </>
    );
};

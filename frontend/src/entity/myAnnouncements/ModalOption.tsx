import styles from 'pages/myAnnouncements/libr/myAnnouncements.module.scss';
import { Pencil } from 'shared/ui/icons/icons-tools/Pencil.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/store/hooks.ts';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground.tsx';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryDefinition,
} from '@reduxjs/toolkit/query';
import { MyAnnouncements } from 'app/api/types/myAnnouncements.ts';
import { isPublishedChange } from 'features/myAnnouncements/libr/isPublishedChange.ts';
import { announcementDelete } from 'features/myAnnouncements/libr/announcementDelete.ts';
import { useDeleteAnnouncemetMutation } from 'app/api/authFetchAdverts.ts';

interface Props extends MyAnnouncements {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
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
            'authFetchAdverts'
        >
    >;
}
export const ModalOption = (data: Props) => {
    const { slug, setShowModal, refetch, is_published } = data;

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [
        deleteAnn,
        {
            isLoading: deleteLoading,
            isSuccess: isSuccessDelete,
            isError: isErrorDelete,
        },
    ] = useDeleteAnnouncemetMutation();
    const dispatch = useAppDispatch();
    const publishedLoading = useAppSelector(
        (state) => state.setLoading.loading
    );

    return (
        <>
            {(deleteLoading || publishedLoading) && <LoadingWithBackground />}
            <div className={styles.modal_option}>
                <label className={styles.label_option}>
                    <input
                        type="checkbox"
                        checked={is_published}
                        onChange={() =>
                            isPublishedChange({
                                slug: slug as string,
                                dispatch,
                                is_published,
                                refetch,
                                t,
                            })
                        }
                    />
                    <span>{t('myAnnouncements.published')}</span>
                </label>
                <div
                    className={is_published ? styles.edit : styles.no_edit}
                    onClick={() =>
                        is_published &&
                        navigate(`/advertisement-editing/${slug}`)
                    }
                >
                    <Pencil color={is_published ? '#000000' : '#bcbcbc'} />
                    {t('myAnnouncements.edit')}
                </div>
                <div
                    className={styles.delete}
                    onClick={() =>
                        announcementDelete({
                            setShowModal,
                            refetch,
                            t,
                            slug: slug as string,
                            deleteAnn,
                            isSuccessDelete,
                            isErrorDelete,
                        })
                    }
                >
                    <span>❌</span>
                    {t('myAnnouncements.delete')}
                </div>
            </div>
        </>
    );
};

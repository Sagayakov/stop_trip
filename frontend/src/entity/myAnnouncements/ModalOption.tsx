import styles from 'pages/myAnnouncements/libr/myAnnouncements.module.scss';
import { Pencil } from 'shared/ui/icons/icons-tools/Pencil.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDeleteAnnouncemetMutation } from 'app/api/fetchAdverts.ts';
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

interface Props extends MyAnnouncements{
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
            'fetchAdverts'
        >
    >;
}
export const ModalOption = (data: Props) => {
    const { slug, setShowModal, refetch, is_published } = data;

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [
        deleteAnn,
        { isLoading: deleteLoading, isSuccess: isSuccessDelete, isError: isErrorDelete }
    ] = useDeleteAnnouncemetMutation();
    const dispatch = useAppDispatch();
    const publishedLoading = useAppSelector((state) => state.setLoading.loading);

    return (
        <>
            {(deleteLoading || publishedLoading) && <LoadingWithBackground />}
            <div className={styles.modal_option}>
                <label className={styles.label_option}>
                    <input type="checkbox"
                           checked={is_published}
                           onChange={
                               () => isPublishedChange({slug: slug as string, is_published, refetch, dispatch, t})
                           }
                    />
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
                    onClick={
                        () => announcementDelete(
                            { setShowModal, refetch, dispatch, t, slug: slug as string, deleteAnn, isSuccessDelete, isErrorDelete }
                        )
                    }
                >
                    <span>❌</span>
                    {t('myAnnouncements.delete')}
                </div>
            </div>
        </>
    );
};

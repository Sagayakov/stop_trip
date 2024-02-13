import { getAccessTokenWithRefresh } from 'shared/model/getAccessTokenWithRefresh.ts';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { toast } from 'react-toastify';
import { TypesForHandlers } from 'features/myAnnouncements/libr/TypesForHandlers.ts';

export const announcementDelete = async (props: TypesForHandlers) => {
    const { t, refetch, dispatch, deleteAnn, slug, setShowModal, isSuccessDelete, isErrorDelete } = props;
    const { refreshToken } = getTokensFromStorage();

    const result = confirm(t('myAnnouncements.confirm-delete'));
    if (result) {
        try{
            await getAccessTokenWithRefresh(dispatch, refreshToken); //сначала дожидаемся новый accessToken, затем шлем пост запрос
            const { accessToken } = getTokensFromStorage();
            await deleteAnn!({ token: accessToken , slug: slug as string });
            await refetch();
            setShowModal!(false);
            if (isSuccessDelete === true) {
                toast.success(t('myAnnouncements.success-delete'));
            }
            if (isErrorDelete === true) {
                toast.error(t('errors.add-announcement-error'));
            }
        }catch (error) {
            console.log(error);
            toast.error(`${t('errors.add-announcement-error')}`);
        }
    }else{
        setShowModal!(false);
    }
}
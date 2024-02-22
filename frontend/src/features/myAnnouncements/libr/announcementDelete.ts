import { toast } from 'react-toastify';
import { TypesForHandlers } from 'features/myAnnouncements/libr/TypesForHandlers.ts';

export const announcementDelete = async (props: TypesForHandlers) => {
    const { t, refetch, deleteAnn, slug, setShowModal, isSuccessDelete, isErrorDelete } = props;

    const result = confirm(t('myAnnouncements.confirm-delete'));
    if (result) {
        try{
            await deleteAnn!(slug as string );
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
import { toast } from 'react-toastify';
import { TypesForHandlers } from 'features/myAnnouncements/libr/TypesForHandlers.ts';

export const announcementDelete = async (props: TypesForHandlers) => {
    const {
        t,
        refetch,
        deleteAnn,
        slug,
        setShowModal,
        isSuccessDelete,
        isErrorDelete,
    } = props;

    const result = confirm(t('myAnnouncements.confirm-delete'));
    if (result) {
        try {
            await deleteAnn!(slug as string);
            await refetch();
            setShowModal!(false);
            if (isSuccessDelete === true) {
                const toastId = 'delete advert success toast';
                toast.success(t('myAnnouncements.success-delete'), { toastId });
            }
            if (isErrorDelete === true) {
                const toastId = 'delete advert error toast';
                toast.error(t('errors.add-announcement-error'), { toastId });
            }
        } catch (error) {
            console.log(error);
            const toastId = 'delete advert catch error toast';
            toast.error(`${t('errors.add-announcement-error')}`, { toastId });
        }
    } else {
        setShowModal!(false);
    }
};

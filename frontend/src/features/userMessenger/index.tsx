import {
    useDeleteMessengerMutation,
    useModifyMessengerMutation,
} from 'app/api/fetchMessengers';
import { Result } from 'app/api/types/messengers';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Delete } from 'shared/ui/icons/icons-tools/Delete';
import { Pencil } from 'shared/ui/icons/icons-tools/Pencil';
import styles from 'widgets/settingMessengers/libr/settingMessengers.module.scss';

type UserMessengerProps = {
    messenger: Result;
};

export const UserMessenger = ({ messenger }: UserMessengerProps) => {
    const [modifyMessenger, updateResponse] = useModifyMessengerMutation();
    const [deleteMessenger, deleteResponse] = useDeleteMessengerMutation();
    const [newUserLink, setNewUserLink] = useState(messenger.link_to_user);
    const [editMode, setEditMode] = useState(false);
    const { t } = useTranslation();

    const handleEditMessenger = async (id: number) => {
        setEditMode(false);
        await modifyMessenger({ id, body: { link_to_user: newUserLink } })
            .unwrap()
            .then(() => {
                const toastId = 'patch messenger success toast';
                toast.success(t('my-settings.success'), { toastId });
            })
            .catch(() => {
                const toastId = 'patch messenger error toast';
                toast.error(
                    updateResponse?.data?.link_to_user ||
                        t('my-settings.smth-wrong'),
                    { toastId }
                );
            });
    };

    const handleDeleteMessenger = async (id: number) => {
        await deleteMessenger({ id })
            .unwrap()
            .then(() => {
                const toastId = 'delete messenger success toast';
                toast.success(t('my-settings.success'), { toastId });
            })
            .catch(() => {
                const toastId = 'delete messenger error toast';
                toast.error(
                    deleteResponse?.data || t('my-settings.smth-wrong'),
                    { toastId }
                );
            });
    };

    return (
        <div className={styles.user_messenger}>
            <img
                src={`../../../src/shared/ui/icons/icon${messenger.messenger.name}.png`}
                alt={messenger.messenger.name}
            />
            {messenger.messenger.link_to_messenger}
            <input
                type="text"
                value={newUserLink}
                onChange={(e) => setNewUserLink(e.target.value)}
                className={
                    editMode ? styles.edit_input : styles.edit_input_disabled
                }
                disabled={!editMode}
            />
            {editMode ? (
                <span
                    className={styles.finish_edit}
                    onClick={() => handleEditMessenger(messenger.id)}
                ></span>
            ) : (
                <span
                    className={styles.edit_user_messenger}
                    onClick={() => setEditMode(true)}
                >
                    <Pencil color="#000000" />
                </span>
            )}
            <span
                className={styles.delete_user_messenger}
                onClick={() => handleDeleteMessenger(messenger.id)}
            >
                <Delete />
            </span>
        </div>
    );
};

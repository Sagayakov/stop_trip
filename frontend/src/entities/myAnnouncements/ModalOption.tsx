import styles from 'pages/myAnnouncements/libr/myAnnouncements.module.scss';
import { Pencil } from 'shared/ui/icons/icons-tools/Pencil.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface Props{
    id: number
}
export const ModalOption = ({ id }: Props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className={styles.modal_option}>
            <label className={styles.label_option}>
                <input type="checkbox" />
                <span>{t('myAnnouncements.published')}</span>
            </label>
            <div
                className={styles.edit}
                onClick={() => navigate(`/advertisement-editing/${id}`)}
            >
                <Pencil color="#000000" />
                {t('myAnnouncements.edit')}
            </div>
        </div>
    );
};
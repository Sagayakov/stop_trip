import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: number | null | undefined;
    formState: FormState<FormAddAnn>;
}
export const AnnouncementTransportEngineCapacity = ({
    register,
    defaultValue,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.transport_engine_volume')}:</h3>
            <div className={styles.inputNumber_group}>
                <input
                    type="text"
                    pattern="^(?:(?:0|[1-9]\d*)(?:[.]\d+)?|[1-9]\d*\/[1-9]\d*)$"
                    autoComplete="off"
                    defaultValue={defaultValue || ''}
                    {...register('transport_engine_volume')}
                    min={data?.transport_engine_volume.min || '1'}
                    max={data?.transport_engine_volume.max || '2.7'}
                    placeholder={t('filters.volume')}
                />
            </div>
            <div className={styles.ann_field_err}>
                {/*{formState?.errors?.transport_engine_volume && 'Введите число в формате 2.0'}*/}
            </div>
        </div>
    );
};

import { FormState, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useEffect } from 'react';
//import { useLocation } from 'react-router-dom';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: boolean | undefined;
    formState: FormState<FormAddAnn>;
    setValue: UseFormSetValue<FormAddAnn>;
}
export const AnnouncementRealtyHasFurniture = ({
    register,
    defaultValue,
    formState,
    setValue,
}: Props) => {
    const { t } = useTranslation();
    //const location = useLocation().pathname.split('/')[1];
    //const isRequired = location !== 'advertisement-editing';

    useEffect(() => {
        if (defaultValue === undefined) {
            setValue('property_has_furniture', false);
        } else setValue('property_has_furniture', defaultValue);
    }, [defaultValue, setValue]);

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('filters.with-furniture')}
                {/* {isRequired && <span>*</span>} */}:
            </h3>
            <div className={styles.radio_group}>
                <label>
                    <input
                        type="checkbox"
                        {...register('property_has_furniture', {
                            /* required: {
                                value: isRequired,
                                message: t('add-page.required'),
                            }, */
                        })}
                        onChange={(event) =>
                            setValue(
                                'property_has_furniture',
                                event.target.checked
                            )
                        }
                        defaultChecked={defaultValue}
                        style={{ display: 'none' }}
                    />
                    <span>{t('filters.property_has_furniture')}</span>
                </label>
            </div>
            <div className={styles.ann_field_err}>
                {formState?.errors?.property_has_furniture?.message}
            </div>
        </div>
    );
};

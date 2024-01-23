import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: { name: string } | null;
    formState: FormState<FormAddAnn>;
}

const AnnouncementRegion = ({ control, setValue, formState }: Props) => {
    const { t } = useTranslation();
    const options = [{ value: 'goa', label: 'Гоа' }];

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('add-page.region')}
                <span>*</span>:
            </h3>
            <UniversalSelectDropdown<FormAddAnn>
                setValue={setValue}
                control={control}
                name="region"
                prefix="filterAnnouncementCategory"
                placeholder={t('add-page.region')}
                closeMenuOnSelect={true}
                isMulti={false}
                options={options}
                defaultValue={options[0]}
                isDisabled={true}//убрать, когда будет не только Гоа
                requiredFiled={true}
            />
            <div className={styles.ann_field_err}>{formState?.errors?.region?.message}</div>
        </div>
    );
};
export default AnnouncementRegion;

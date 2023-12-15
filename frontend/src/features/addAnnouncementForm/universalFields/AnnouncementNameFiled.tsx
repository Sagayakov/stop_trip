import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    formState: FormState<FormAddAnn>;
}

const AnnouncementNameField = ({ register, formState }: Props) => {
    const { t } = useTranslation();
    const { errors } = formState;

    return (
        <div className="ann-field">
            <h3>
                {t('add-page.advert-title')}
                <span>*</span>:
            </h3>
            <input
                type="text"
                minLength={1}
                maxLength={100}
                placeholder={t('add-page.title')}
                style={
                    errors?.title
                        ? {
                              border: '1px solid red',
                          }
                        : {}
                }
                {...register('title', { required: true })}
            />
            <div className="ann-field-err">
                {errors?.title && `${t('add-page.enter-title')}`}
            </div>
        </div>
    );
};

export default AnnouncementNameField;

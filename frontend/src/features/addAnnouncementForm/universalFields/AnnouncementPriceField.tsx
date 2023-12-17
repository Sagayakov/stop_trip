import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    formState: FormState<FormAddAnn>;
}

const AnnouncementPriceField = ({ register, formState }: Props) => {
    const { errors } = formState;
    const { t } = useTranslation();

    return (
        <div className="ann-field">
            <h3>
                {t('add-page.price')}
                <span>*</span>:
            </h3>
            <input
                type="text"
                id="ann-field-price"
                placeholder={t('add-page.price')}
                style={
                    errors?.price
                        ? {
                              border: '1px solid red',
                          }
                        : {}
                }
                {...register('price', { required: true })}
            />
            <div className="ann-field-err">
                {errors?.price && `${t('add-page.set-price')}`}
            </div>
        </div>
    );
};

export default AnnouncementPriceField;

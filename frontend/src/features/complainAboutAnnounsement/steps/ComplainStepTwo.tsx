import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { ComplainTypes } from 'features/complainAboutAnnounsement/libr/ComplainTypes.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<ComplainTypes>;
    watch: UseFormWatch<ComplainTypes>;
}

export const ComplainStepTwo = ({ register, watch }: Props) => {
    const count = watch('description')?.length;
    const { t } = useTranslation();
    return (
        <>
            <textarea
                {...register('description')}
                maxLength={500}
                placeholder={t('add-page.complain-description')}
            />
            <p>{count || 0}/500</p>
        </>
    )
}
import styles from './libr/modalComplain.module.scss';
import { SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ComplainStepOne } from 'features/complainAboutAnnounsement/steps/ComplainStepOne.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ComplainTypes } from 'features/complainAboutAnnounsement/libr/ComplainTypes.ts';
import { handleComplain } from 'features/complainAboutAnnounsement/libr/handleComplain.ts';
import { useAppDispatch } from 'app/store/hooks.ts';
import { ComplainStepTwo } from 'features/complainAboutAnnounsement/steps/ComplainStepTwo.tsx';
import { useLocation } from 'react-router-dom';
import { Close } from 'shared/ui/icons/icons-tools/Close.tsx';

interface Props{
    setShowComplainModal: React.Dispatch<SetStateAction<boolean>>;
}

export const ModalComplain = ({ setShowComplainModal }: Props) => {
    const slug = useLocation().pathname.split('/')[2]
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const dispatch = useAppDispatch();
    const { register, handleSubmit, watch, setValue } = useForm<ComplainTypes>();
    const reason = watch('reason');
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setShowComplainModal(false);
        }
    };
    useEffect(() => {
        setValue('advertisement', slug);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const onsubmit:  SubmitHandler<ComplainTypes> = async(data) => {
        await handleComplain({ dispatch, payload: data, t });
        setShowComplainModal(false);
    }

    return (
        <div
            className={styles.modal_background}
            onClick={() => setShowComplainModal(false)}
        >
            <form
                className={styles.modal_content}
                onClick={(event) => event.stopPropagation()}
                onSubmit={handleSubmit(onsubmit)}
            >
                <button type="button" className={styles.close_modal}>
                    <Close onclick={() => setShowComplainModal(false)} color="#ffffff" />
                </button>
                <h1>{t('add-page.complain-title')}</h1>
                {step === 1 && <ComplainStepOne register={register} />}
                {step === 2 && <ComplainStepTwo register={register} watch={watch} />}
                {step === 1 && reason && <button className={styles.step_one} onClick={() => setStep(2)}>
                    {t('add-page.next')}
                </button>}
                {step === 2 && <div className={styles.buttons_step_two}>
                    <button className={styles.back} onClick={() => setStep(1)}>{t('add-page.back')}</button>
                    <button type="submit">{`${t('add-page.send')}`}</button>
                </div>}
            </form>
        </div>
    );
}
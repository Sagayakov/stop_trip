import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { ComplainTypes } from 'features/complainAboutAnnounsement/libr/ComplainTypes.ts';

interface Props {
    register: UseFormRegister<ComplainTypes>;
    watch: UseFormWatch<ComplainTypes>;
}

export const ComplainStepTwo = ({ register, watch }: Props) => {
    const count = watch('description')?.length;
    return (
        <>
            <textarea {...register('description')} maxLength={500} />
            <p>{count || 0}/500</p>
        </>
    )
}
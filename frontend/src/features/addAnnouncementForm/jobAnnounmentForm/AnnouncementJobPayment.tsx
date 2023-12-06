import { UniversalSelectDropdown } from '../../../entities/universalDropdown/UniversalSelectDropdown';
import { Control, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { jobValues } from './libr/jobValues';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementJobPayment = ({ setValue, control }: Props) => {
    const paymentValues = jobValues.payment;

    return (
        <div className="ann-field">
            <h3>Тип оплаты:</h3>
            <UniversalSelectDropdown
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="job_payment_type"
                options={paymentValues}
                placeholder="Тип оплаты"
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};

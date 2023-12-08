import {
    AnnouncementDoc,
    AnnouncementEvent,
    AnnouncementExchange,
    AnnouncementExcursion,
    AnnouncementFood,
    AnnouncementJob,
    AnnouncementMarket,
    AnnouncementRealty,
    AnnouncementService,
    AnnouncementTaxi,
    AnnouncementTransport,
} from '../../features/addAnnouncementForm';
import { FormAddAnn } from '../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import {
    Control,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    watch: UseFormWatch<FormAddAnn>;
}

const OptionalFields = ({ register, setValue, control, watch }: Props) => {
    const category = watch('category');
    const getCategoryValue = (cat: string) => {
        if (category) {
            return category === cat;
        }
    };

    return (
        <div className={`optional-fields ${category && 'visible'}`}>
            {getCategoryValue('transport') && (
                <AnnouncementTransport
                    control={control}
                    register={register}
                    setValue={setValue}
                />
            )}
            {getCategoryValue('property') && (
                <AnnouncementRealty
                    control={control}
                    register={register}
                    setValue={setValue}
                />
            )}
            {getCategoryValue('document') && (
                <AnnouncementDoc register={register} />
            )}
            {getCategoryValue('event') && (
                <AnnouncementEvent register={register} />
            )}
            {getCategoryValue('food') && (
                <AnnouncementFood
                    register={register}
                    control={control}
                    setValue={setValue}
                />
            )}
            {getCategoryValue('job') && (
                <AnnouncementJob
                    control={control}
                    register={register}
                    setValue={setValue}
                />
            )}
            {getCategoryValue('excursion') && (
                <AnnouncementExcursion register={register} />
            )}
            {getCategoryValue('market') && (
                <AnnouncementMarket register={register} />
            )}
            {getCategoryValue('exchange_rate') && (
                <AnnouncementExchange
                    control={control}
                    register={register}
                    setValue={setValue}
                />
            )}
            {getCategoryValue('service') && (
                <AnnouncementService register={register} />
            )}
            {getCategoryValue('taxi') && (
                <AnnouncementTaxi
                    control={control}
                    setValue={setValue}
                    register={register}
                />
            )}
        </div>
    );
};

export default OptionalFields;
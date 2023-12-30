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
} from 'features/addAnnouncementForm';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import {
    Control,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'
import { ProductType } from 'pages/advertPage/libr/types.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    watch: UseFormWatch<FormAddAnn>;
    data?: ProductType;
}

const OptionalFields = ({ register, setValue, control, watch, data }: Props) => {
    const category = watch('category');
    const getCategoryValue = (cat: string) => {
        let result
        if (category) {
            result = category === cat ? true : false;
        }else if(data){
            result = data?.category === cat ? true : false
        }
        return result
    };

    return (
        <div className={`${styles.optional_fields} ${(category || data?.category) && `${styles.visible}`}`}>
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
                    data={data}
                />
            )}
        </div>
    );
};

export default OptionalFields;
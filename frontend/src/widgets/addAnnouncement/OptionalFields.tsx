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
            result = category === cat;
        }else if(data){
            result = data?.category === cat
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
                    data={data}
                />
            )}
            {getCategoryValue('property') && (
                <AnnouncementRealty
                    control={control}
                    register={register}
                    setValue={setValue}
                    data={data}//не сделано
                />
            )}
            {getCategoryValue('document') && (
                <AnnouncementDoc setValue={setValue} data={data} control={control} />
            )}
            {getCategoryValue('event') && (
                <AnnouncementEvent register={register} data={data} />
            )}
            {getCategoryValue('food') && (
                <AnnouncementFood
                    register={register}
                    control={control}
                    setValue={setValue}
                    data={data}
                />
            )}
            {getCategoryValue('job') && (
                <AnnouncementJob
                    control={control}
                    register={register}
                    setValue={setValue}
                    data={data}
                />
            )}
            {getCategoryValue('excursion') && (
                <AnnouncementExcursion register={register} data={data} />
            )}
            {getCategoryValue('market') && (
                <AnnouncementMarket register={register} data={data} />
            )}
            {getCategoryValue('exchange_rate') && (
                <AnnouncementExchange
                    control={control}
                    register={register}
                    setValue={setValue}
                    data={data}
                />
            )}
            {getCategoryValue('service') && (
                <AnnouncementService register={register} data={data} />
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
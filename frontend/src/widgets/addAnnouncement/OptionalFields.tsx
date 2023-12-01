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

export const OptionalFields = ({ register, setValue, control, watch }: Props) => {
    const category = watch('announcementCategory');
    const getCategoryValue = (cat: string) => {
        if (category) {
            return category === cat;
        }
    };

    return (
        <>
            {getCategoryValue('Транспорт') && (
                <AnnouncementTransport
                    control={control}
                    register={register}
                    setValue={setValue}
                />
            )}
            {getCategoryValue('Недвижимость') && (
                <AnnouncementRealty
                    control={control}
                    register={register}
                    setValue={setValue}
                />
            )}
            {getCategoryValue('Документы') && (
                <AnnouncementDoc register={register} />
            )}
            {getCategoryValue('Мероприятия') && (
                <AnnouncementEvent register={register} />
            )}
            {getCategoryValue('Домашняя еда') && (
                <AnnouncementFood
                    register={register}
                    control={control}
                    setValue={setValue}
                />
            )}
            {getCategoryValue('Работа') && (
                <AnnouncementJob
                    control={control}
                    register={register}
                    setValue={setValue}
                />
            )}
            {getCategoryValue('Экскурсии') && (
                <AnnouncementExcursion register={register} />
            )}
            {getCategoryValue('Покупка/продажа') && (
                <AnnouncementMarket register={register} />
            )}
            {getCategoryValue('Валютные пары') && (
                <AnnouncementExchange
                    control={control}
                    register={register}
                    setValue={setValue}
                />
            )}
            {getCategoryValue('Услуги') && (
                <AnnouncementService register={register} />
            )}
            {getCategoryValue('Такси') && (
                <AnnouncementTaxi control={control} setValue={setValue} register={register} />
            )}
        </>
    );
};

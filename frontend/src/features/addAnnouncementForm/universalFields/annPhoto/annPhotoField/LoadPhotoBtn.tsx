import { LoadPhotoIcon } from 'shared/ui/icons/loadPhoto';
import { RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../annPhoto.module.scss'

interface Props{
    inputRef: RefObject<HTMLInputElement>
    setSelectedImages: React.Dispatch<
        React.SetStateAction<Image[] | undefined>
    >;
}
interface Image {
    image: string;
}
export const LoadPhotoBtn = ({ inputRef, setSelectedImages }:Props) => {
    const { t } = useTranslation();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files).map((el) => ({
                image: el.name,
            }));
            setSelectedImages((prevValue) => {
                return prevValue ? [...prevValue, ...filesArray] : filesArray;
            });
        }
    };

    return (
        <div
            className={styles.loadphoto_btn}
            onClick={() => inputRef.current?.click()}
        >
            <LoadPhotoIcon />
            {t('add-page.choose-photo')}
            <input
                className={styles.loadphoto_btn_hidden}
                type="file"
                ref={inputRef}
                accept="image/*,.img,.png,.jpeg,.jpg"
                multiple={true}
                max={11}
                onChange={handleImageChange}
            />
        </div>
    );
};

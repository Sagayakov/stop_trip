import { useEffect, useRef } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import {
    LoadPhotoAlternative,
    LoadPhotoIcon,
    MiniLoadPhoto,
} from '../../../shared/ui/icons/loadPhoto';
import { useTranslation } from 'react-i18next';

interface Props {
    selectedImages: Image[] | undefined;
    setSelectedImages: React.Dispatch<
        React.SetStateAction<Image[] | undefined>
    >;
    setValue: UseFormSetValue<FormAddAnn>;
}
interface Image {
    image: string;
}

const AnnouncementPhotoField = ({
    selectedImages,
    setSelectedImages,
    setValue,
}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
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

    const removeImage = (index: number) => {
        if (selectedImages) {
            const newImages = [...selectedImages];
            newImages.splice(index, 1);
            setSelectedImages(newImages);
        }
    };

    const getFillColor = (num: number) => {
        if (selectedImages && selectedImages.length >= num) return '#1f6fde';
        return '#8F8F8F';
    };

    useEffect(() => {
        if (selectedImages) {
            setValue('images', selectedImages);
        }
    }, [selectedImages]);

    return (
        <div className="ann-field mobile-add-photo">
            <h3>{`${t('add-page.photo')}:`}</h3>
            <div className="loadphoto">
                <div className="loadphoto-btn-view">
                    <div
                        className="loadphoto-btn"
                        onClick={() => inputRef.current?.click()}
                    >
                        <LoadPhotoIcon />
                        {t('add-page.choose-photo')}
                        <input
                            className="loadphoto-btn-hidden"
                            type="file"
                            ref={inputRef}
                            accept="image/*,.img,.png,.jpeg,.jpg"
                            multiple={true}
                            max={11}
                            onChange={handleImageChange}
                        />
                    </div>
                    {selectedImages && selectedImages.length > 0 && (
                        <div className="loadphoto-btn-view-list">
                            {selectedImages &&
                                selectedImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className="loadphoto-btn-view-delete"
                                        onClick={() => removeImage(index)}
                                    >
                                        <p>{image.image}</p>
                                        <span>&#x2716;</span>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
                <div className="loadphoto-icons">
                    <LoadPhotoAlternative color={getFillColor(1)} />
                    <LoadPhotoAlternative color={getFillColor(2)} />
                    <LoadPhotoAlternative color={getFillColor(3)} />
                    <LoadPhotoAlternative color={getFillColor(4)} />
                    <LoadPhotoAlternative color={getFillColor(5)} />
                    <LoadPhotoAlternative color={getFillColor(6)} />
                    <LoadPhotoAlternative color={getFillColor(7)} />
                    <LoadPhotoAlternative color={getFillColor(8)} />
                    <LoadPhotoAlternative color={getFillColor(9)} />
                    <LoadPhotoAlternative color={getFillColor(10)} />
                </div>
                <div className="loadphoto-counter">
                    <div className="loadphoto-counter-wrapper">
                        <MiniLoadPhoto />
                        {t('add-page.uploaded')}{' '}
                        {(selectedImages && selectedImages.length) || 0}/10
                    </div>
                </div>
            </div>
            <div className="ann-field-err">
                {selectedImages &&
                    selectedImages.length > 10 &&
                    `${t('add-page.please-select')}`}
            </div>
        </div>
    );
};

export default AnnouncementPhotoField;

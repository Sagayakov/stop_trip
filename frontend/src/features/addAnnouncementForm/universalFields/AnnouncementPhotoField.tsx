import { useEffect, useRef } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import {
    LoadPhotoAlternative,
    LoadPhotoIcon,
    MiniLoadPhoto,
} from '../../../shared/ui/icons/loadPhoto';

interface Props {
    selectedImages: File[] | undefined;
    setSelectedImages: React.Dispatch<React.SetStateAction<File[] | undefined>>;
    setValue: UseFormSetValue<FormAddAnn>;
}

export const AnnouncementPhotoField = ({
    selectedImages,
    setSelectedImages,
    setValue,
}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
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
            setValue('announcementPhoto', selectedImages);
        }
    }, [selectedImages]);

    return (
        <div className="ann-field mobile-add-photo">
            <h3>
                Фото<span>*</span>:
            </h3>
            <div className="loadphoto">
                <div className="loadphoto-btn-view">
                    <div
                        className="loadphoto-btn"
                        onClick={() => inputRef.current?.click()}
                    >
                        <LoadPhotoIcon />
                        Выберите фотографии
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
                                        <p>{image.name}</p>
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
                        Загружено{' '}
                        {(selectedImages && selectedImages.length) || 0}/10
                    </div>
                </div>
            </div>
            <div className="ann-field-err">
                {(selectedImages && selectedImages.length > 10) && "Пожалуйста, выберите не более 10 фотографий"}
            </div>
        </div>
    );
};

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

    useEffect(() => {
        if (selectedImages) {
            setValue('announcementPhoto', selectedImages);
        }
    }, [selectedImages]);

    return (
        <div className="ann-field">
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
                            max={10}
                            onChange={handleImageChange}
                        />
                    </div>
                    {selectedImages && selectedImages.length > 0 && (
                        <>
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
                        </>
                    )}
                </div>
                <div className="loadphoto-icons">
                    <LoadPhotoAlternative />
                    <LoadPhotoAlternative />
                    <LoadPhotoAlternative />
                    <LoadPhotoAlternative />
                    <LoadPhotoAlternative />
                    <LoadPhotoAlternative />
                </div>
                <div className="loadphoto-counter">
                    <div className="loadphoto-counter-wrapper">
                        <MiniLoadPhoto />
                        Загружено{' '}
                        {(selectedImages && selectedImages.length) || 0}/10
                    </div>
                </div>
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};

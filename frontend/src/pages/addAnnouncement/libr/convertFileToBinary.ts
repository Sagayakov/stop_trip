//import exifr from 'exifr';
import { convertHeicToAny } from 'features/addAnnouncementForm/universalFields/annPhoto/annPhotoField/convertHeicToAny';

const fileToBase64String = async (
    file: File,
    isHEIC: boolean
): Promise<string> => {
    if (isHEIC) {
        //const exif = await exifr.parse(file);
        //const orientation = exif.Orientation;
        const convertedFile = await convertHeicToAny(file);

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                if (event.target?.result) {
                    /* const img = new Image();
                    img.onload = function () {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');

                        canvas.width = img.width;
                        canvas.height = img.height;
                        if (
                            /iPhone|iPad|iPod/i.test(navigator.userAgent) &&
                            orientation === 'Rotate 90 CW'
                        ) {
                            ctx?.translate(img.height, 0);
                            ctx?.rotate(Math.PI / 2);
                        }

                        ctx?.drawImage(img, 0, 0);

                        resolve(
                            canvas.toDataURL('image/jpeg', 0.1).split(',')[1]
                        );
                    };

                    img.src = event.target?.result as string; */

                    const base64String = (event.target.result as string).split(
                        ','
                    )[1];
                    resolve(base64String);
                } else {
                    reject(new Error('Ошибка чтения файла'));
                }
            };

            reader.onerror = function (error) {
                reject(error);
            };
            reader.readAsDataURL(convertedFile);
        });
    } else {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                if (event.target?.result) {
                    const base64String = (event.target.result as string).split(
                        ','
                    )[1];
                    resolve(base64String);
                } else {
                    reject(new Error('Ошибка чтения файла'));
                }
            };
            reader.onerror = function (error) {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    }
};

export const convertFilesToBase64Strings = async (files: File[] | FileList) => {
    const base64Strings: string[] = [];
    for (const file of files) {
        try {
            let base64String = '';
            if (
                file.name.toLowerCase().includes('.heic') ||
                file.name.toLowerCase().includes('.heif')
            ) {
                if (
                    file.name.includes('.HEIC') ||
                    file.name.includes('.HEIF')
                ) {
                    const fileWithLowerCaseExtension = new File(
                        [file],
                        file.name.toLowerCase(),
                        { type: file.type }
                    );
                    base64String = await fileToBase64String(
                        fileWithLowerCaseExtension,
                        true
                    );
                } else {
                    base64String = await fileToBase64String(file, false);
                }
            } else {
                base64String = await fileToBase64String(file, false);
            }
            base64Strings.push(base64String as string);
        } catch (error) {
            console.error('Ошибка при чтении файла:', error);
        }
    }
    return base64Strings;
};

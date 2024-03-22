import heic2any from 'heic2any';
import EXIF from 'exif-js';

const fileToBase64String = (file: File, isIos: boolean) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        if (isIos) {
            (
                EXIF.getData as unknown as (
                    url: File,
                    callback: () => void
                ) => void
            )(file, function () {
                const orientation = EXIF.getTag(this, 'Orientation');

                reader.onload = function (event) {
                    if (event.target?.result) {
                        const img = new Image();
                        img.onload = function () {
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');

                            if (ctx) {
                                switch (orientation) {
                                    case 2:
                                        ctx.transform(
                                            -1,
                                            0,
                                            0,
                                            1,
                                            img.width,
                                            0
                                        );
                                        break;
                                    case 3:
                                        ctx.transform(
                                            -1,
                                            0,
                                            0,
                                            -1,
                                            img.width,
                                            img.height
                                        );
                                        break;
                                    case 4:
                                        ctx.transform(
                                            1,
                                            0,
                                            0,
                                            -1,
                                            0,
                                            img.height
                                        );
                                        break;
                                    case 5:
                                        ctx.transform(0, 1, 1, 0, 0, 0);
                                        break;
                                    case 6:
                                        ctx.transform(
                                            0,
                                            1,
                                            -1,
                                            0,
                                            img.height,
                                            0
                                        );
                                        break;
                                    case 7:
                                        ctx.transform(
                                            0,
                                            -1,
                                            -1,
                                            0,
                                            img.height,
                                            img.width
                                        );
                                        break;
                                    case 8:
                                        ctx.transform(
                                            0,
                                            -1,
                                            1,
                                            0,
                                            0,
                                            img.width
                                        );
                                        break;
                                    default:
                                        ctx.transform(1, 0, 0, 1, 0, 0);
                                }
                            }

                            canvas.width = img.width;
                            canvas.height = img.height;
                            ctx?.drawImage(img, 0, 0);
                            resolve(
                                canvas
                                    .toDataURL('image/jpeg', 0.1)
                                    .split(',')[1]
                            );
                        };

                        img.src = event.target?.result as string;
                    } else {
                        reject(new Error('Ошибка чтения файла'));
                    }
                };
            });
        } else {
            reader.onload = async function (event) {
                if (event.target?.result) {
                    const result = event.target.result as string;
                    const base64String = result.split(',')[1];
                    resolve(base64String);
                } else {
                    reject(new Error('Ошибка чтения файла'));
                }
            };
        }

        reader.onerror = function (error) {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
};

export const convertFilesToBase64Strings = async (files: File[] | FileList) => {
    const base64Strings: string[] = [];
    for (const file of files) {
        try {
            if (
                file.name.toLowerCase().includes('.heic') ||
                file.name.toLowerCase().includes('.heif')
            ) {
                const blobURL = URL.createObjectURL(file);
                const blobRes = await fetch(blobURL);
                const blob = await blobRes.blob();
                const converted = await heic2any({
                    blob,
                    toType: 'image/jpeg',
                    quality: 0.5,
                });
                const convertedFile = new File(
                    [converted as Blob],
                    'image.jpeg',
                    {
                        type: 'image/jpeg',
                    }
                );
                URL.revokeObjectURL(blobURL);
                const base64String = await fileToBase64String(
                    convertedFile,
                    true
                );
                base64Strings.push(base64String as string);
            } else {
                const base64String = await fileToBase64String(file, false);
                base64Strings.push(base64String as string);
            }
        } catch (error) {
            console.error('Ошибка при чтении файла:', error);
        }
    }
    return base64Strings;
};

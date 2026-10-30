import { convertHeicToAny } from 'features/addAnnouncementForm/universalFields/annPhoto/annPhotoField/convertHeicToAny';

/** Лимиты фото — такие же проверяет сервер (backend/config/settings.py). */
export const MAX_IMAGES = 10;
export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 МБ
const MAX_SIDE = 1600;
const QUALITIES = [0.85, 0.7, 0.5];

const isHeic = (file: File) => /\.(heic|heif)$/i.test(file.name);

const loadImage = (file: Blob): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const objectUrl = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(img);
        };
        img.onerror = (error) => {
            URL.revokeObjectURL(objectUrl);
            reject(error);
        };
        img.src = objectUrl;
    });

const canvasToBlob = (canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> =>
    new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));

/**
 * Уменьшает фото до 1600 px по длинной стороне и сохраняет в JPEG.
 * Современные браузеры при отрисовке сами поворачивают фото по EXIF,
 * поэтому фото с iPhone после сжатия уже стоят ровно.
 */
const compressImage = async (file: File): Promise<File | null> => {
    const source = isHeic(file) ? await convertHeicToAny(file) : file;
    if (!source) return null;

    const img = await loadImage(source);
    const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    const ctx = canvas.getContext('2d');
    if (!ctx) return source.size <= MAX_IMAGE_SIZE ? source : null;
    ctx.fillStyle = '#ffffff'; // прозрачный PNG не станет чёрным
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    for (const quality of QUALITIES) {
        const blob = await canvasToBlob(canvas, quality);
        if (blob && blob.size <= MAX_IMAGE_SIZE) {
            const name = `${file.name.replace(/\.[^.]+$/, '')}.jpg`;
            return new File([blob], name, { type: 'image/jpeg' });
        }
    }
    return null;
};

export type PreparedImages = {
    files: File[];
    /** Сколько фото не влезло в лимит 10 штук. */
    skippedByCount: number;
    /** Сколько фото не удалось прочитать или сжать до 2 МБ. */
    failed: number;
};

/** Готовит выбранные фото к отправке: лимит количества, HEIC → JPEG, сжатие до 2 МБ. */
export const prepareImagesForUpload = async (
    files: File[],
    alreadySelected: number
): Promise<PreparedImages> => {
    const freeSlots = Math.max(0, MAX_IMAGES - alreadySelected);
    const accepted = files.slice(0, freeSlots);
    const result: PreparedImages = {
        files: [],
        skippedByCount: files.length - accepted.length,
        failed: 0,
    };

    for (const file of accepted) {
        try {
            const compressed = await compressImage(file);
            if (compressed) {
                result.files.push(compressed);
            } else {
                result.failed += 1;
            }
        } catch (error) {
            console.error('Не удалось обработать фото:', error);
            result.failed += 1;
        }
    }
    return result;
};

import { LoadPhotoAlternative } from 'shared/ui/icons/loadPhoto';
import styles from '../annPhoto.module.scss'

interface Props {
    selectedImages: Image[] | undefined;
}
interface Image {
    image: string;
}

export const LoadPhotoIcons = ({ selectedImages }: Props) => {
    const getFillColor = (num: number) => {
        if (selectedImages && selectedImages.length >= num) return '#1f6fde';
        return '#8F8F8F';
    };
    return (
        <>
            <div className={styles.loadphoto_icons}>
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
        </>
    );
};

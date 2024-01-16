import { LoadPhotoAlternative } from 'shared/ui/icons/loadPhoto';
import styles from '../annPhoto.module.scss'

interface Props {
    selectedImages: File | undefined;
}
// interface Image {
//     image: string;
// }

export const LoadPhotoIcons = ({ selectedImages }: Props) => {
    const getFillColor = () => {
    // const getFillColor = (num: number) => {
        if (selectedImages) return '#1f6fde';
        // if (selectedImages && selectedImages.length >= num) return '#1f6fde';
        return '#8F8F8F';
    };
    return (
        <>
            <div className={styles.loadphoto_icons}>
                <LoadPhotoAlternative color={getFillColor()} />
                <LoadPhotoAlternative color={getFillColor()} />
                <LoadPhotoAlternative color={getFillColor()} />
                <LoadPhotoAlternative color={getFillColor()} />
                <LoadPhotoAlternative color={getFillColor()} />
                <LoadPhotoAlternative color={getFillColor()} />
                <LoadPhotoAlternative color={getFillColor()} />
                <LoadPhotoAlternative color={getFillColor()} />
                <LoadPhotoAlternative color={getFillColor()} />
                <LoadPhotoAlternative color={getFillColor()} />
            </div>
        </>
    );
};

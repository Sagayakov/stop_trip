import styles from 'pages/myAnnouncements/libr/myAnnouncements.module.scss';
import { useState } from 'react';
import { LastAdvertsImages } from 'app/api/types/lastAdvertsTypes.ts';
import imgNotFound from 'entities/lastAdverts/ui/image-not-found.jpg'
import { AnnouncementOptions, ModalOption, MyAnnouncementDescription } from 'entities/myAnnouncements';
interface Props {
    id?: number;
    category?: string;
    title: string;
    price: number;
    description?: string;
    images: LastAdvertsImages[];
    date_create?: string;
}
export const MyAnnouncementCart = ({ images, price, title, date_create }: Props) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal && (
                <div
                    className={styles.modal_option_background}
                    onClick={() => setShowModal(false)}
                ></div>
            )}
            <div className={styles.announcement}>
                <AnnouncementOptions setShowModal={setShowModal} />
                {showModal && <ModalOption />}
                <img
                    alt="announcements img"
                    src={
                        images.length === 0
                            ? imgNotFound
                            : images[0].image
                    }
                />
                <MyAnnouncementDescription title={title} price={price} date_create={date_create} />
            </div>
        </>
    );
};

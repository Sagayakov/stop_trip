import styles from 'pages/myAnnouncements/libr/myAnnouncements.module.scss';
import { useState } from 'react';
import { MyAnnouncements } from 'app/api/types/myAnnouncements.ts';
import imgNotFound from 'entities/lastAdverts/ui/image-not-found.jpg';
import {
    AnnouncementOptions,
    ModalOption,
    MyAnnouncementDescription,
} from 'entities/myAnnouncements';
import { NavLink } from 'react-router-dom';

export const MyAnnouncementCart = ({
    images,
    price,
    title,
    date_create,
    slug,
    category,
}: MyAnnouncements) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal && (
                <div
                    className={styles.modal_option_background}
                    onClick={() => setShowModal(false)}
                ></div>
            )}
            <div
                className={styles.announcement}
                onClick={(event) => event.stopPropagation()}
            >
                <AnnouncementOptions setShowModal={setShowModal} />
                {showModal && <ModalOption slug={slug!} />}
                <NavLink to={`/${category}/${slug}/`}>
                    {images?.length !== 0 ? (
                        <img alt="announcements img" src={images[0].image} />
                    ) : (
                        <img alt="announcements img" src={imgNotFound} />
                    )}
                    <MyAnnouncementDescription
                        title={title}
                        price={price}
                        date_create={date_create}
                    />
                </NavLink>
            </div>
        </>
    );
};

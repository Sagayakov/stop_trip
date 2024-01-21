import styles from 'pages/myAnnouncements/libr/myAnnouncements.module.scss';
import { useState } from 'react';
import { MyAnnouncements } from 'app/api/types/myAnnouncements.ts';
import imgNotFound from 'entity/lastAdverts/ui/image-not-found.jpg';
import {
    AnnouncementOptions,
    ModalOption,
    MyAnnouncementDescription,
} from 'entity/myAnnouncements';
import { NavLink } from 'react-router-dom';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryDefinition,
} from '@reduxjs/toolkit/query';

interface Props extends MyAnnouncements {
    refetch: () => QueryActionCreatorResult<
        QueryDefinition<
            string,
            BaseQueryFn<
                string | FetchArgs,
                unknown,
                FetchBaseQueryError,
                object,
                FetchBaseQueryMeta
            >,
            'Adverts' | 'MyAnnouncements',
            MyAnnouncements[],
            'fetchAdverts'
        >
    >;
}

export const MyAnnouncementCart = (data: Props) => {
    const {
        images,
        price,
        title,
        date_create,
        slug,
        category,
        refetch,
    } = data;
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
                {showModal && (
                    <ModalOption {...data} setShowModal={setShowModal} refetch={refetch} />
                )}
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

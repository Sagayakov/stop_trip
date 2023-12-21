import { Like } from 'shared/ui/Like';
import { Rating } from 'shared/ui/Rating';
import { NavLink, useLocation } from 'react-router-dom';
import { useGetAdvertsQuery } from 'app/api/fetchAdverts.ts';
import { AdvertsTypes } from 'app/api/types/lastAdvertsTypes.ts';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { getDate } from 'shared/utils/getDate.ts';
import { LoadingWithBackground } from 'entities/loading/LoadingWithBackground.tsx';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'app/store/hooks.ts';
import { Pagination } from 'features/pagination';
import { useRef } from 'react';

const AnyCategory = () => {
    const category = location.pathname.split('/')[1];
    const queryParam = useLocation().search;
    const { data, isLoading } = useGetAdvertsQuery(queryParam);
    const { isMobile } = useMatchMedia();
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);
    const parentRef = useRef<HTMLElement>(null);

    if (!data?.results.length && !isLoading) {
        return (
            <p className="announcement-not-found">
                {t('category-page.no-adverts')}
            </p>
        );
    }

    const notFoundImg = [
        "../../../src/entities/lastAdverts/ui/image-not-found.jpg",
        "../../../src/entities/lastAdverts/ui/image-not-found.jpg",
        "../../../src/entities/lastAdverts/ui/image-not-found.jpg",
    ];

    return (
        <section className="announcement" ref={parentRef}>
            {isLoading && <LoadingWithBackground />}
            {data?.results.length &&
                data.results.map((el: AdvertsTypes) => {
                    const date = getDate(el.date_create);
                    const { dayToDisplay } = date;
                    let day = dayToDisplay;

                    if (dayToDisplay === 'Сегодня') {
                        day = lang === 'ru' ? 'Сегодня' : 'Today';
                    }
                    if (dayToDisplay === 'Вчера') {
                        day = lang === 'ru' ? 'Вчера' : 'Yesterday';
                    }
                    return (
                        <NavLink
                            className="card"
                            key={el.id}
                            to={`/${category}/${el.id}/`}
                        >
                            <span onClick={(event) => event.stopPropagation()}>
                                <Like id={el.id} />
                            </span>
                            <div className="image">
                                {isMobile ? (
                                    <>
                                        {!el.images[0] ? (
                                            notFoundImg.map((el, index) =>
                                                <img src={el} alt="Not found" key={index} />
                                            )
                                        ) : (
                                            el.images.map((item) => (
                                                <img src={item.image} key={item.image} alt="Not found" />
                                            ))
                                        )}
                                    </>
                                ) : (
                                    <img
                                        src={
                                            !el.images[0]
                                                ? '../../../src/entities/lastAdverts/ui/image-not-found.jpg'
                                                : el.images[0].image
                                        }
                                        alt="Not found"
                                    />
                                )}
                            </div>
                            <div className="description">
                                <h2>{el.title}</h2>
                                <p className="description-location">
                                    г. Тбилиси, ул. Зеленая, 10
                                </p>
                                <h3>
                                    {el.price ? `₹${el.price}` : 'Договорная'}
                                </h3>
                                <p className="card-description">
                                    {el.description}
                                </p>
                                <div className="author">
                                    {`${el.owner.full_name[0].toUpperCase()}${el.owner.full_name.slice(
                                        1
                                    )}`}
                                    <span className="rating-number">4.5</span>
                                    <Rating rating={4.5} />
                                </div>
                                <p className="time">
                                    {`
                                        ${day},
                                        ${date.hours}:${date.minutes}
                                    `}
                                </p>
                            </div>
                        </NavLink>
                    );
                })}{' '}
            <Pagination data={data} parentRef={parentRef} />
        </section>
    );
};

export default AnyCategory;

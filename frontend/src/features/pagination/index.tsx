import { RefObject, useEffect, useState } from 'react';
import { ArrowLeft14x7 } from 'shared/ui/icons/icons-tools/ArrowLeft14x7.tsx';
import { ArrowRight14x7 } from 'shared/ui/icons/icons-tools/ArrowRight14x7.tsx';
import styles from './libr/pagination.module.scss';
import { LastAdvertsTypes } from 'app/api/types/lastAdvertsTypes';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { setPageMain } from 'widgets/lastAdverts/model/pageReducer/pageMain';
import { useLocation, useSearchParams } from 'react-router-dom';
import { setPageCategory } from 'pages/categoryPage/model/pageReducer/pageCategory';
import { beginningParentScroll } from 'features/pagination/libr/beginningParentScroll';

interface Props {
    data: LastAdvertsTypes | undefined;
    parentRef: RefObject<HTMLElement> | RefObject<HTMLDivElement>;
}

export const Pagination = ({ data, parentRef }: Props) => {
    const pageMain = useAppSelector((state) => state.setPageMain.pageMain);
    const pageCategory = useAppSelector(
        (state) => state.setPageCategory.pageCategory
    );
    const [pages, setPages] = useState(0);
    const dispatch = useAppDispatch();
    const pathname = useLocation().pathname;
    const queryParam = useLocation().search;
    const [, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (data) {
            const totalPages = Math.ceil(data.count / 12);
            setPages(totalPages);
        }
    }, [data, pages]);

    const handleClickPrev = () => {
        if (pathname === '/') {
            if (pageMain > 1) {
                dispatch(setPageMain(pageMain - 1));
            }
        } else {
            if (pageCategory > 1) {
                dispatch(setPageCategory(pageCategory - 1));

                const notChanged = queryParam.slice(0, queryParam.length - 1);
                setSearchParams(`${notChanged}${pageCategory - 1}`);
            }
        }
        beginningParentScroll(parentRef);
    };

    const handleClickNext = () => {
        if (pathname === '/') {
            if (pageMain < pages) {
                dispatch(setPageMain(pageMain + 1));
            }
        } else {
            if (pageCategory < pages) {
                dispatch(setPageCategory(pageCategory + 1));

                const notChanged = queryParam.slice(0, queryParam.length - 1);
                setSearchParams(`${notChanged}${pageCategory + 1}`);
            }
        }
        beginningParentScroll(parentRef);
    };

    const handleClickNumber = (page: number) => {
        if (pathname === '/') {
            dispatch(setPageMain(page));
        } else {
            dispatch(setPageCategory(page));

            const notChanged = queryParam.slice(0, queryParam.length - 1);
            setSearchParams(`${notChanged}${page}`);
        }

        beginningParentScroll(parentRef);
    };

    const pageToChange = pathname === '/' ? pageMain : pageCategory;

    return (
        <div className={styles.pagination}>
            <ArrowLeft14x7
                color={data && data.previous ? '#1C1C1E' : '#BCBCBC'}
                style={{
                    marginRight: '12px',
                    cursor: data && data.previous ? 'pointer' : 'unset',
                }}
                handleClickPrev={handleClickPrev}
            />
            {pages <= 5 ? (
                new Array(pages)
                    .fill(1)
                    .map((el, i) => el + i)
                    .map((el) => {
                        return (
                            <span
                                className={
                                    pageToChange === el
                                        ? `${styles.page_number} ${styles.active}`
                                        : `${styles.page_number}`
                                }
                                key={el}
                                onClick={() => handleClickNumber(el)}
                            >
                                {el}
                            </span>
                        );
                    })
            ) : (
                <>
                    {pageToChange > 1 && (
                        <span
                            className={`${styles.page_number}`}
                            onClick={() => handleClickNumber(1)}
                        >
                            1
                        </span>
                    )}
                    {pageToChange > 3 && (
                        <span
                            className={styles.dots}
                            onClick={() => handleClickNumber(pageToChange - 1)}
                        >
                            ...
                        </span>
                    )}
                    {pageToChange - 1 > 1 && (
                        <span
                            className={`${styles.page_number}`}
                            onClick={() => handleClickNumber(pageToChange - 1)}
                        >
                            {pageToChange - 1}
                        </span>
                    )}
                    <span className={`${styles.page_number} ${styles.active}`}>
                        {pageToChange}
                    </span>
                    {pageToChange + 1 < pages && (
                        <span
                            className={`${styles.page_number}`}
                            onClick={() => handleClickNumber(pageToChange + 1)}
                        >
                            {pageToChange + 1}
                        </span>
                    )}
                    {pages - pageToChange > 2 && (
                        <span
                            className={styles.dots}
                            onClick={() => handleClickNumber(pageToChange + 1)}
                        >
                            ...
                        </span>
                    )}
                    {pageToChange !== pages && (
                        <span
                            className={`${styles.page_number}`}
                            onClick={() => handleClickNumber(pages)}
                        >
                            {pages}
                        </span>
                    )}
                </>
            )}
            <ArrowRight14x7
                color={data && data.next ? '#1C1C1E' : '#BCBCBC'}
                style={{
                    marginLeft: '12px',
                    cursor: data && data.next ? 'pointer' : 'unset',
                }}
                handleClickNext={handleClickNext}
            />
        </div>
    );
};

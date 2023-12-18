import { useEffect, useState } from 'react';
import { ArrowLeft14x7 } from 'shared/ui/icons/icons-tools/ArrowLeft14x7.tsx';
import { ArrowRight14x7 } from 'shared/ui/icons/icons-tools/ArrowRight14x7.tsx';
import './pagination.scss';
import { LastAdvertsTypes } from 'app/api/types/lastAdvertsTypes';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { setPageMain } from 'features/lastAdverts/model/pageReducer/pageMain';
import { useLocation } from 'react-router-dom';
import { setPageCategory } from 'pages/category/model/pageReducer/pageCategory';

export const Pagination = ({
    data,
}: {
    data: LastAdvertsTypes | undefined;
}) => {
    const pageMain = useAppSelector((state) => state.setPageMain.pageMain);
    const pageCategory = useAppSelector(
        (state) => state.setPageCategory.pageCategory
    );
    const [pages, setPages] = useState(0);
    const dispatch = useAppDispatch();
    const pathname = useLocation().pathname;

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
            }
        }
    };

    const handleClickNext = () => {
        if (pathname === '/') {
            if (pageMain < pages) {
                dispatch(setPageMain(pageMain + 1));
            }
        } else {
            if (pageCategory < pages) {
                dispatch(setPageCategory(pageCategory + 1));
            }
        }
    };

    const handleClickNumber = (page: number) =>
        pathname === '/'
            ? dispatch(setPageMain(page))
            : dispatch(setPageCategory(page));

    return (
        <div className="pagination">
            <ArrowLeft14x7
                color={data && data.previous ? '#1C1C1E' : '#BCBCBC'}
                style={{
                    marginRight: '12px',
                    cursor: data && data.previous ? 'pointer' : 'unset',
                }}
                handleClickPrev={handleClickPrev}
            />
            {new Array(pages)
                .fill(1)
                .map((el, i) => el + i)
                .map((el) => {
                    return (
                        <span
                            className={
                                pageMain === el
                                    ? 'page-number active'
                                    : 'page-number'
                            }
                            key={el}
                            onClick={() => handleClickNumber(el)}
                        >
                            {el}
                        </span>
                    );
                })}
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

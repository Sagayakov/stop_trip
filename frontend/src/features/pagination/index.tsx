import { useEffect, useState } from 'react';
import { ArrowLeft14x7 } from 'shared/ui/icons/icons-tools/ArrowLeft14x7.tsx';
import { ArrowRight14x7 } from 'shared/ui/icons/icons-tools/ArrowRight14x7.tsx';
import './pagination.scss';
import { LastAdvertsTypes } from 'app/api/types/lastAdvertsTypes';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { setPageMain } from 'features/lastAdverts/model/pageReducer/pageMain';

export const Pagination = ({
    data,
}: {
    data: LastAdvertsTypes | undefined;
}) => {
    const pageMain = useAppSelector((state) => state.setPageMain.pageMain);
    const [pages, setPages] = useState(0);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data) {
            const totalPages = Math.ceil(data?.count / 12);
            setPages(totalPages);
        }
    }, [data, pages]);

    const handleClickPrev = () => {
        if (pageMain > 1) {
            dispatch(setPageMain(pageMain - 1));
        }
    };

    const handleClickNext = () => {
        if (pageMain < pages) {
            dispatch(setPageMain(pageMain + 1));
        }
    };

    return (
        <div className="pagination">
            <ArrowLeft14x7
                color={data && data.previous ? '#1C1C1E' : '#BCBCBC'}
                style={{ marginRight: '12px', cursor: 'pointer' }}
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
                        >
                            {el}
                        </span>
                    );
                })}
            <ArrowRight14x7
                color={data && data.next ? '#1C1C1E' : '#BCBCBC'}
                style={{ marginLeft: '12px', cursor: 'pointer' }}
                handleClickNext={handleClickNext}
            />
        </div>
    );
};

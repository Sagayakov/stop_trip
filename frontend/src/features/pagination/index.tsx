import { useEffect, useState } from 'react';
import { ArrowLeft14x7 } from 'shared/ui/icons/icons-tools/ArrowLeft14x7.tsx';
import { ArrowRight14x7 } from 'shared/ui/icons/icons-tools/ArrowRight14x7.tsx';
import './pagination.scss';
import { LastAdvertsTypes } from 'app/api/types/lastAdvertsTypes';

export const Pagination = ({
    data,
}: {
    data: LastAdvertsTypes | undefined;
}) => {
    const [pages, setPages] = useState(0);

    useEffect(() => {
        if (data) {
            const totalPages = Math.ceil(data?.count / 12);
            setPages(totalPages);
        }
    }, [data, pages]);

    return (
        <div className="pagination">
            <ArrowLeft14x7
                color={data && data.previous ? '#1C1C1E' : '#BCBCBC'}
                style={{ marginRight: '12px', cursor: 'pointer' }}
            />
            {new Array(pages)
                .fill(1)
                .map((el, i) => el + i)
                .map((el) => {
                    return (
                        <span className="page-number" key={el}>
                            {el}
                        </span>
                    );
                })}
            <ArrowRight14x7
                color={data && data.next ? '#1C1C1E' : '#BCBCBC'}
                style={{ marginLeft: '12px', cursor: 'pointer' }}
            />
        </div>
    );
};

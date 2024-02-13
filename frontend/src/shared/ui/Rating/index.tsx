import { useState } from 'react';
import { Star } from '../icons/icons-tools/Star';
import { ProductType } from 'pages/advertPage/libr/types';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryDefinition,
} from '@reduxjs/toolkit/dist/query';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';

type RatingProps = {
    id: number;
    rating: number;
    myRating: number;
    refetch: () => QueryActionCreatorResult<
        QueryDefinition<
            { slug: string; isAuth: boolean },
            BaseQueryFn<
                string | FetchArgs,
                unknown,
                FetchBaseQueryError,
                Record<string, never>,
                FetchBaseQueryMeta
            >,
            'Adverts' | 'MyAnnouncements',
            ProductType,
            'fetchAdverts'
        >
    >;
};

export const Rating = ({ id, rating, myRating, refetch }: RatingProps) => {
    const [activeStar, setActiveStar] = useState(myRating);
    const [prepareStar, setPrepareStar] = useState(0);

    const starsAmount = 5;
    const starArray = new Array(starsAmount).fill(1).map((el, i) => el + i);

    return (
        <p aria-label={`Rating is ${rating} out of ${starsAmount}`}>
            {starArray.map((item, i) => {
                return (
                    <Star
                        key={item}
                        userId={id}
                        id={i + 1}
                        prepareStar={prepareStar}
                        setPrepareStar={setPrepareStar}
                        activeStar={activeStar}
                        setActiveStar={setActiveStar}
                        refetch={refetch}
                    />
                );
            })}
        </p>
    );
};

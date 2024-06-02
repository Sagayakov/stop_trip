import { Find } from 'shared/ui/icons/icons-tools/Find.tsx';
import { useTranslation } from 'react-i18next';
import styles from 'features/controls/controls.module.scss';
import { useMatchMedia } from 'app/hooks/useMatchMedia';
import { Tooltip } from 'react-tooltip';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export const Input = () => {
    const { t } = useTranslation();
    const { isDesktop } = useMatchMedia();
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();


    const handleSearch = (searchValue: string) => {
        if (!searchValue) {
            return;
        }

        if (searchValue.trim() !== '') {
            setSearchParams(prevParams => {
                const newParams = new URLSearchParams(prevParams);
                newParams.set('search', searchValue);
                return newParams;
            });

            const updatedSearchParams = new URLSearchParams(searchParams.toString());
            updatedSearchParams.set('search', searchValue);
            const searchQueryString = updatedSearchParams.toString();

            navigate(`/advertisement-search?${searchQueryString}`, { state: { query: searchValue } });
        }
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch(searchValue);
        }
    };

    useEffect(() => {
        if (location.state?.query) {
            setSearchValue(location.state.query);
        }
    }, [location.state]);

    useEffect(() => () => setSearchValue(''), []); // на размонтирование

    return (
        <div
            className={styles.input_wrapper}
            data-tooltip-id="search-tooltip"
        >
            <Find onClick={() => handleSearch(searchValue)} />
            <input
                name="search_input"
                placeholder={t('main-page.find')}
                autoComplete="off"
                value={searchValue}
                onChange={(event) => setSearchValue((event.target.value).toLowerCase())}
                onKeyDown={handleKeyDown}
            />
            {isDesktop && (
                <Tooltip
                    id="search-tooltip"
                    variant="warning"
                    place="bottom"
                    opacity={1}
                    style={{ zIndex: '5', fontFamily: 'Inter' }}
                />
            )}
        </div>
    );
};

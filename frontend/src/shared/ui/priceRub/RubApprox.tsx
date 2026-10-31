import { useGetRubRateQuery } from 'app/api/fetchAdverts.ts';
import { formatRubApprox } from 'shared/const/geo.ts';
import styles from './rubApprox.module.scss';

interface Props {
    /** Цена в донгах */
    vnd: number | string | null | undefined;
}

/** «(≈ 5 200 ₽)» рядом с ценой в донгах. Ничего не показывает, если курс не задан в админке. */
export const RubApprox = ({ vnd }: Props) => {
    const { data } = useGetRubRateQuery('');
    const rate = data?.vnd_per_rub;

    if (!rate || !vnd || Number(vnd) <= 0) return null;

    return <span className={styles.rub}>({formatRubApprox(vnd, rate)})</span>;
};

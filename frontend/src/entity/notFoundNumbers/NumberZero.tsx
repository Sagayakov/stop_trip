import styles from './notFoundNumbers.module.scss';

export const NumberZero = () => {
    const imagesCount = new Array(8).fill(1).map((el, i) => el + i);
    const blueBlockCount = new Array(4).fill(1).map((el, i) => el + i);

    return (
        <div className={styles.number_zero}>
            {imagesCount.map((el) =>
                <div
                    className={`${styles.image_block} ${styles[`image_block${el}`]}`}
                    key={el}
                    style={{backgroundImage: `url('../../../src/shared/ui/images/image${el}.png')`}}>
                </div>)
            }
            {blueBlockCount.map((el) =>
                <div className={`${styles.blue_block} ${styles[`blue_block${el}`]}`} key={el}></div>)
            }
        </div>
    );
};
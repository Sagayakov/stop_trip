import styles from './notFoundNumbers.module.scss';

export const NumberFour = () => {
    const imagesCount = new Array(5).fill(1).map((el, i) => el + i);
    const blueBlockCount = new Array(4).fill(1).map((el, i) => el + i);

    return (
        <div className={styles.number_four}>
            {imagesCount.map((el) => (
                <div
                    className={`${styles.image_block} ${
                        styles[`image_block${el}`]
                    }`}
                    key={el}
                    style={{ backgroundImage: `url('/images/image${el}.png')` }}
                ></div>
            ))}
            {blueBlockCount.map((el) => (
                <div
                    className={`${styles.blue_block} ${
                        styles[`blue_block${el}`]
                    }`}
                    key={el}
                ></div>
            ))}
        </div>
    );
};

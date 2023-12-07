export const NumberFour = () => {
    const imagesCount = new Array(5).fill(1).map((el, i) => el + i);
    const blueBlockCount = new Array(4).fill(1).map((el, i) => el + i);

    return (
        <div className="number-four">
            {imagesCount.map((el) =>
                <div
                    className={`image-block image-block${el}`}
                    key={el}
                    style={{backgroundImage: `url('../../../src/shared/ui/images/image${el}.png')`}}>
                </div>)
            }
            {blueBlockCount.map((el) =>
                <div className={`blue-block blue-block${el}`} key={el}></div>)
            }
        </div>
    );
};
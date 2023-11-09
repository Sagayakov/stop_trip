import './advertCharacteristics.scss';

export const AdvertCharacteristics = () => {
    return (
        <div className="description">
            <h2 className="characteristics-header">Характеристики</h2>
            <div className="characteristics-wrapper">
                <span className="characteristics-key">
                    <p>
                        Общая площадь
                        <span className="dashes"></span>
                    </p>
                    <p>
                        Жилая площадь
                        <span className="dashes"></span>
                    </p>
                    <p>
                        Площадь кухни
                        <span className="dashes"></span>
                    </p>
                    <p>
                        Количество комнат
                        <span className="dashes"></span>
                    </p>
                    <p>
                        Санузел
                        <span className="dashes"></span>
                    </p>
                    <p>
                        Балкон
                        <span className="dashes"></span>
                    </p>
                    <p>
                        Ремонт
                        <span className="dashes"></span>
                    </p>
                    <p>
                        Этаж
                        <span className="dashes"></span>
                    </p>
                    <p>
                        Окна выходят
                        <span className="dashes"></span>
                    </p>
                    <p>
                        Материал стен
                        <span className="dashes"></span>
                    </p>
                </span>
                <span className="characteristics-value">
                    <p></p>
                    <p>46</p>
                    <p>20</p>
                    <p>8</p>
                    <p>2</p>
                    <p>Раздельный</p>
                    <p>Лоджия</p>
                    <p>Косметический</p>
                    <p>2</p>
                    <p>Во двор</p>
                    <p>Кирпич</p>
                </span>
            </div>
        </div>
    );
};

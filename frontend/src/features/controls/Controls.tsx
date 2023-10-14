import { useEffect, useState } from 'react';
import {
    AllCategories,
    Input,
    ModalWindow,
    SelectGeo,
} from '../../entities/controls';
import './controls.scss';

export const Controls = () => {
    const [showModal, setShowModal] = useState(false);
    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="controls">
            <div className="controls-wrapper">
                {width > 767 && (
                    <AllCategories
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />
                )}
                <Input />
                <SelectGeo />
                <ModalWindow
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            </div>
        </div>
    );
};

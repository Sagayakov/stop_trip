import { useState } from 'react';
import {
    AllCategories,
    Input,
    ModalWindow,
    SelectGeo,
} from '../../entities/controls';
import './controls.scss';
import { useMatchMedia } from '../../app/hooks/useMatchMedia';

const Controls = () => {
    const [showModal, setShowModal] = useState(false);
    const { isMobile } = useMatchMedia()

    return (
        <div className="controls">
            <div className="controls-wrapper">
                {!isMobile && (
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

export default Controls;
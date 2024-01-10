import { useState } from 'react';
import {
    AllCategories,
    Input,
    ModalWindow,
    SelectGeo,
} from 'entities/controls';
import styles from './controls.module.scss';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';

const Controls = () => {
    const [showModal, setShowModal] = useState(false);
    const { isMobile } = useMatchMedia();

    return (
        <div className={styles.controls}>
            <div className={styles.controls_wrapper}>
                {!isMobile && (
                    <AllCategories
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />
                )}
                {!isMobile && (
                    <>
                        <Input />
                        <SelectGeo />
                    </>
                )}
                <ModalWindow
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            </div>
        </div>
    );
};

export default Controls;

import { useRef } from 'react';
import { MapIcon } from '../../../shared/ui/icons/icons-tools/MapIcon';
import { useMatchMedia } from '../../../app/hooks/useMatchMedia';

export const SelectGeo = () => {
    const selectRef = useRef<null | HTMLSelectElement>(null);
    const { isMobile } = useMatchMedia()

    return (
        <div className="select-wrapper">
            {!isMobile ? <MapIcon color="#1F6FDE" /> : <p>В городе</p>}
            <select ref={selectRef}>
                <option value="Гоа">Гоа</option>
                <option value="Гоа">Гоа</option>
                <option value="Гоа">Гоа</option>
                <option value="Гоа">Гоа</option>
                <option value="Гоа">Гоа</option>
            </select>
        </div>
    );
};

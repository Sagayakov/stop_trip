import { useEffect, useRef, useState } from 'react';
import { MapIcon } from '../../../shared/ui/icons/icons-tools/MapIcon';

export const SelectGeo = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const selectRef = useRef<null | HTMLSelectElement>(null);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="select-wrapper">
            {width >= 767 ? <MapIcon color="#1F6FDE" /> : <p>В городе</p>}
            <select ref={selectRef}>
                <option value="Гоа">Тбилиси</option>
                <option value="Гоа">Гоа</option>
                <option value="Гоа">Гоа</option>
                <option value="Гоа">Гоа</option>
                <option value="Гоа">Гоа</option>
            </select>
        </div>
    );
};

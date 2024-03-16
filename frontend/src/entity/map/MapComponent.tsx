import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import 'ol/ol.css';
import { useGeographic } from 'ol/proj.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature, MapBrowserEvent } from 'ol';
import { Point } from 'ol/geom';
import ScaleLineControl from 'ol/control/ScaleLine';
import { Zoom } from 'ol/control';
import { Coordinate } from 'ol/coordinate';
import stylesAddAnnouncement from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import stylesAnnouncementPage from 'entity/location/advertLocation.module.scss';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes';
import { UseFormSetValue } from 'react-hook-form';

type MapProps = {
    propertyLocation: number[];
    isSelected?: boolean;
    setMarkerPosition?: (
        value: React.SetStateAction<string | undefined>
    ) => void;
    setValue?: UseFormSetValue<FormAddAnn>;
};

export const MapComponent = ({
    propertyLocation,
    isSelected,
    setMarkerPosition,
    setValue,
}: MapProps) => {
    useGeographic();

    const mapTargetElement = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<Map>();

    const mapRef = useRef<Map>();
    mapRef.current = map;
    const [selectedCoord, setSelectedCoord] = useState<Coordinate>();
    const [zoom, setZoom] = useState<number | undefined>(10);

    const scaleLineControl = new ScaleLineControl();
    const zoomControl = new Zoom({});

    const handleMapClick = (event: MapBrowserEvent<UIEvent>) => {
        const clickedCoord = (mapRef!.current! as Map).getCoordinateFromPixel(
            event.pixel
        );
        setSelectedCoord(clickedCoord);

        setValue &&
            setValue('coordinates', `${clickedCoord[1]}, ${clickedCoord[0]}`);
    };

    useEffect(() => {
        const map = new Map({
            layers: [
                new TileLayer({ source: new OSM() }),
                new VectorLayer({
                    source: new VectorSource({
                        features: [
                            new Feature(
                                new Point(
                                    isSelected && selectedCoord
                                        ? [selectedCoord[0], selectedCoord[1]]
                                        : propertyLocation
                                )
                            ),
                        ],
                    }),
                    style: {
                        'circle-radius': 10,
                        'circle-fill-color': '#1f6fde',
                    },
                }),
            ],
            controls: [scaleLineControl, zoomControl],
            view: new View({
                center: selectedCoord || propertyLocation,
                zoom: zoom,
                minZoom: 0,
                maxZoom: 28,
            }),
        });

        isSelected && map.on('click', handleMapClick);

        map.setTarget(mapTargetElement.current || '');
        setMap(map);
        setMarkerPosition &&
            selectedCoord &&
            setMarkerPosition(`${selectedCoord[1]},  ${selectedCoord[0]}`);

        return () => map.setTarget('');
    }, [propertyLocation, selectedCoord, isSelected]);

    const handleWheel = () => {
        if (map) {
            const actualZoom = map.getView().getZoom();
            setZoom(actualZoom);
        }
    };

    return (
        <div
            ref={mapTargetElement}
            className={`${stylesAddAnnouncement.map} ${stylesAnnouncementPage.map}`}
            onWheel={handleWheel}
        ></div>
    );
};

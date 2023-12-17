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

type MapProps = {
    propertyLocation: number[];
    isSelected?: boolean;
    setMarkerPosition?: (value: React.SetStateAction<string | undefined>) => void;
};

export const MapComponent = ({ propertyLocation, isSelected, setMarkerPosition }: MapProps) => {
    useGeographic();

    const mapTargetElement = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<Map>();

    const mapRef = useRef<Map>();
    mapRef.current = map;
    const [ selectedCoord , setSelectedCoord ] = useState<Coordinate>();
    const [ zoom , setZoom ] = useState<number | undefined>(10);

    const scaleLineControl = new ScaleLineControl();
    const zoomControl = new Zoom({});

    const handleMapClick = (event: MapBrowserEvent<UIEvent>) => {
        const clickedCoord = (mapRef!.current! as Map).getCoordinateFromPixel(event.pixel);
        setSelectedCoord( clickedCoord );
    };

    useEffect(() => {
        const map = new Map({
            layers: [
                new TileLayer({ source: new OSM() }),
                new VectorLayer({
                    source: new VectorSource({
                        features: [
                            new Feature(new Point(isSelected && selectedCoord
                                ? [selectedCoord[0], selectedCoord[1]]
                                : propertyLocation
                            ))
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
                center: isSelected && selectedCoord
                    ? [selectedCoord[0], selectedCoord[1]]
                    : propertyLocation,
                zoom: zoom,
                minZoom: 0,
                maxZoom: 28,
            }),
        });

        isSelected && map.on('click', handleMapClick);

        map.setTarget(mapTargetElement.current || "");
        setMap(map);

        setMarkerPosition && selectedCoord &&
            setMarkerPosition(String(selectedCoord[0]) + ", " + selectedCoord[1]);

        return () => map.setTarget("");
    }, [propertyLocation, selectedCoord]);

    const handleWheel = () => {
        if (map) {
            const actualZoom = map.getView().getZoom();
            setZoom(actualZoom);
        }
    }

    return (
        <div
            ref={mapTargetElement}
            className="map"
            onWheel={handleWheel}>
        </div>
    );
};
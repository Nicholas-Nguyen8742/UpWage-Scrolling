import Map, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
  ScaleControl,
  FullscreenControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMemo, useState } from "react";
import customMarker from '../../assets/customMarker.png';

export default function MapContainer({ locations }) {
  const [popupInfo, setPopupInfo] = useState(null);
  
/*Referenced below in return as {markers}*/
  const markers = useMemo(
    () =>
      locations.map((location) => (
        <Marker
          key={location.id}
          longitude={location.longitude}
          latitude={location.latitude}
          style={{
            backgroundImage: `url(${customMarker})`,
            backgroundSize: 'cover',
            width: '50px',
            height: '50px',
            cursor: 'pointer'
          }}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(location);
          }}
        >
        <svg/>
        </Marker>
      )),
    [locations]
  );

  return (
    <>
      <Map
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
        }}
        style={{ width: "100vw", height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoiYml6YXJybyIsImEiOiJjbDJpbGt2YW8wcDA4M2ltc24waWwwc3loIn0.eDej6DQjJv21gwde7qBPUQ"
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {markers}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              <p>
                {popupInfo.city}, {popupInfo.state}
              </p>
              <p>{popupInfo.specialty}</p>
            </div>
          </Popup>
        )}
      </Map>
    </>
  );
}

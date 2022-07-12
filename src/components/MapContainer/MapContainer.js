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
/*Wrapped in useMemo hook for performance optimization so Map doesn't rerender*/
/*More Info: https://visgl.github.io/react-map-gl/docs/get-started/tips-and-tricks#performance-with-many-markers*/
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
            width: '3rem',
            height: '3rem',
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
        {/*Following four controls can be excluded, GeoLocate tool useful for UX*/}
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {/*Referenced above anonymous function*/}
        {markers}

        {/*PopUp Display*/}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
          {/*Popup <div> and contents can be styled depenent on Figma mockup*/}
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

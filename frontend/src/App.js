import React, {useState, useEffect} from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import InstagramEmbed from 'react-instagram-embed';
import mapStyleLight from './mapStyleLight';
import mapStyleDark from './mapStyleDark';
//Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

const libraries = ["places"];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = {
  lat: 39.7459467,
  lng:-75.5465889,
};
const options = {
  styles: mapStyleLight,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [selected, setSelected] = React.useState(null);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const [data, setData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      fetch('/items')
      .then(res => res.json())
      .then(list => setData(list.info)); //working, component shows this
    };
 
    fetchData();
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <h1>InstaTour</h1>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {data.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: marker.icon, //in the location suggestion form, use a dropdown that pushes the string for which icon
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <InstagramEmbed
                url={selected.insta}
                maxWidth={320}
                hideCaption={true}
                containerTagName='div'
              />
              <h2>
                {selected.title}
              </h2>
              <h4>
                Address: 
              </h4>
              <href></href>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}


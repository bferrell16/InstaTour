import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import InstagramEmbed from "react-instagram-embed";
import mapStyleLight from "../mapStyleLight";
//import mapStyleDark from '../mapStyleDark';
//Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 39.7459467,
  lng: -75.5465889,
};
const options = {
  styles: mapStyleLight,
  disableDefaultUI: true,
  gestureHandling: "greedy",
  zoomControl: true,
};

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [selected, setSelected] = React.useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panMap = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(13);
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      fetch("/items/")
        .then((res) => res.json())
        .then((list) => setData(list.info)); //working, component shows this
    };

    fetchData();
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <h1>InstaSpots</h1>

      <Search panMap={panMap} />
      <Locate panMap={panMap} />
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={13}
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
          <Modal show={selected} onHide={() => setSelected(null)}>
            <Modal.Header closeButton>
              <Modal.Title>{selected.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InstagramEmbed
                url={selected.insta}
                maxWidth={475}
                hideCaption={true}
                containerTagName="div"
              />
            </Modal.Body>
            <Modal.Footer>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`}
                target="_blank"
                class="mr-auto"
              >
                Directions
              </a>
            </Modal.Footer>
          </Modal>
        ) : null}
      </GoogleMap>
      <button
        className="btn-white suggest"
        onClick={() => {
          window.location.assign("/suggest");
        }}
      >
        Suggest a New Location
      </button>
      <a className="insta" href="https://www.instagram.com/brandonferrell16/">
        <img src="./instagram.svg" alt="My Instagram" />
      </a>
    </div>
  );
}

function Locate({ panMap }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            console.log(pos);
            panMap({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="./compass.svg" alt="Locate Me" />
    </button>
  );
}

function Search({ panMap }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 39.7459467, lng: () => -75.5465889 },
      radius: 100 * 1000,
    },
  });

  return (
    <div className="search">
      <Combobox
        onSelect={async (address) => {
          setValue("", false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panMap({ lat, lng });
          } catch {
            console.log("Search Error");
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          disabled={!ready}
          placeholder="Enter a Location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

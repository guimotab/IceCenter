"use client"
import { IAddress } from '@/interface/iAddress';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
interface GoogleMapsProps {
  address: IAddress
}
const GoogleMaps = ({ address }: GoogleMapsProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCDFa_2A-YENs-9evzihyQB8ELJGpYsavA"
  })
  const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 8,
    center: { lat: -34.397, lng: 150.644 },
    mapTypeControl: false,
  });
  const marker = new google.maps.Marker({
    map,
  });
  const geocoder = new google.maps.Geocoder();
  function geocode(request: google.maps.GeocoderRequest) {
    geocoder
      .geocode(request)
      .then((result) => {
        const { results } = result;

        map.setCenter(results[0].geometry.location);
        marker.setPosition(results[0].geometry.location);
        marker.setMap(map);
        return results;
      })
      .catch((e) => {
        alert("Geocode was not successful for the following reason: " + e);
      });
  }
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={{ lat: -8.745444, lng: -63.870379 }}
      zoom={15}
    >
    </GoogleMap>
  ) : <></>
}

export default GoogleMaps
"use client"
import { Input } from '@/components/ui/input';
import { IAddress } from '@/interface/IAddress';
import { GoogleMap, Marker, StandaloneSearchBox } from '@react-google-maps/api'
import { useState } from 'react';
interface GoogleMapsProps {
  address: IAddress
  startingPosition: {
    lat: number;
    lng: number;
  }
}
const GoogleMaps = ({ startingPosition, address }: GoogleMapsProps) => {

  const [valueInput, setValueInput] = useState(`${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.uf}, Brasil`)
  const [map, setMap] = useState<google.maps.Map>()
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>()
  const [position, setPosition] = useState(startingPosition)

  const onLoadMap = (map: google.maps.Map) => {
    setMap(map)
  }

  const onLoad = async (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref)
  }
  const onPlacesChanged = () => {
    const places = searchBox?.getPlaces()
    if (places) {
      if (places[0]) {
        const place = places![0]
        const location = {
          lat: place?.geometry?.location?.lat() || 0,
          lng: place?.geometry?.location?.lng() || 0
        }
        map?.panTo(location)
        setPosition(location)
        map?.setZoom(17)
      }
    }
  }

  return (
    <GoogleMap
      onLoad={onLoadMap}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={position}
      zoom={17}
    >

      <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
        <Input id='input'
          value={valueInput}
          onChange={event => setValueInput(event.target.value)}
          placeholder='Digite um endereço...'
          className='w-full max-w-[26rem] h-12 absolute left-[27rem] -ml-32 mt-2 bg-white' />
      </StandaloneSearchBox>
      <Marker position={position} />

    </GoogleMap>
  )
}

export default GoogleMaps
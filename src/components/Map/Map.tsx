import React from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import './Map.css';
import '../../utils/fix-map-icon';

export const Map = () => {
  return (
      <div className='map'>
          <MapContainer center={[52.3653806,4.8183825]} zoom={10}>
              <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[52.3653806,4.8183825]}>
                  <Popup>
                      <h2>Środek mapy</h2>
                      <p>tu wyśrodkowano</p>
                  </Popup>
              </Marker>
          </MapContainer>
      </div>
  )
};
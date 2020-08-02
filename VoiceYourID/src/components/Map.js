import React, { Component } from "react";
// import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import "./Map.css";
import { Map, Marker, Popup, TileLayer, Circle } from "react-leaflet";
import { Icon } from "leaflet";

class MyMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 18.975,
      lng: 72.8258,
      zoom: 17,
    };
  }

  invalidateMap() {
    if (this.refs.map) {
      this.refs.map.leafletElement.invalidateSize();
    }
  }
  componentDidMount() {
    window.setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({ lat: position.coords.latitude });
          this.setState({ lng: position.coords.longitude });
        });
      }
    }, 1000);
  }
  resetlocation = () => {
    console.log("Reset");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({ lat: position.coords.latitude });
        this.setState({ lng: position.coords.longitude });
      });
      const pos = [this.state.lat, this.state.lng];
      this.refs.map.leafletElement.setView(pos, 17);
    }
  };
  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map
        center={position}
        zoom={this.state.zoom}
        ref="map"
        onDragEnd={this.invalidateMap()}
        zoomControl={false}
      >
        {/* <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" /> */}
        {/* <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'" /> */}

        <TileLayer url="https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token=c7EMOeQLOJ3ySaaA3nh9aPq2p5vbBUtOOwXWT2gMBEcBRgrXlsX5rh4842bWnKjm" />
        {/* <TileLayer url="https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=c7EMOeQLOJ3ySaaA3nh9aPq2p5vbBUtOOwXWT2gMBEcBRgrXlsX5rh4842bWnKjm"></TileLayer> */}
        <Marker position={position}>
          <Popup>
            <span>
              A pretty CSS3 popup. <br /> Easily customizable.
            </span>
          </Popup>
        </Marker>
        <Circle
          // center={{ lat: 19.064477, lng: 72.835857 }}
          center={{ lat: 19.0737303, lng: 72.8614216 }}
          fillColor="red"
          color="red"
          radius={30}
        ></Circle>
        <Circle
          // center={{ lat: 19.064477, lng: 72.835857 }}
          center={{ lat: 19.114973, lng: 72.839685 }}
          fillColor="red"
          color="red"
          radius={30}
        ></Circle>

        <button
          class="btn-floating pulse teal darken-4 relocate"
          onClick={this.resetlocation}
        >
          <i class="material-icons refresher circle"> autorenew</i>
        </button>
      </Map>
    );
  }
}

export default MyMap;

// class Map extends Component {
//   state = {
//     latitude: 0,
//     longitude: 0,
//   };
//   componentDidMount() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         this.setState({ latitude: position.coords.latitude });
//         this.setState({ longitude: position.coords.longitude });
//       });
//     }
//   }

//   render() {
//     const defaultMapOptions = {
//       disableDefaultUI: true,
//     };
//     const GoogleMapExample = withGoogleMap((props) => (
//       <GoogleMap
//         defaultCenter={{ lat: this.state.latitude, lng: this.state.longitude }}
//         defaultZoom={13}
//         defaultOptions={defaultMapOptions}
//       >
//         <Marker
//           position={{ lat: this.state.latitude, lng: this.state.longitude }}
//         />
//       </GoogleMap>
//     ));
//     return (
//       <div>
//         <GoogleMapExample
//           containerElement={<div style={{ height: `50vh`, width: "100%" }} />}
//           mapElement={<div style={{ height: `100%` }} />}
//         />
//       </div>
//     );
//   }
// }
// export default Map;

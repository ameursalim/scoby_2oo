import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicmFwaDEyMzQiLCJhIjoiY2tnNmxkcnNnMGcwMjJxbW9yb2kyZ2dvYiJ9.4vyIkPMCJCf2FwJOQ3wQ2Q",
});

export default class Mapbox extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    apiHandler.getItems().then((data) => {
      this.setState({ items: data });
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
          >
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
          </Layer>
        </Map>
        ;
      </div>
    );
  }
}

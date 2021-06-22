import React from "react";
import { render, screen } from "@testing-library/react";
import WrappedMap from "./MapComponent";
import Marker from "react-google-maps/lib/components/Marker";

test("map has markers", () => {
  render(
    <WrappedMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`}
      loadingElement={<div style={{ height: "100%" }} />}
      containerElement={<div style={{ height: "100%" }} />}
      mapElement={<div style={{ height: "100%" }} />}
    />
  );
  const marker = screen.getByRole("Marker");
  expect(marker).toBeInTheDocument();
});

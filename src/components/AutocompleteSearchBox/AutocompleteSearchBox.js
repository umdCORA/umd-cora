import React, { useEffect, useRef } from "react";
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import './AutocompleteSearchBox.css';

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(onQueryChange, autoCompleteRef) {
  const southwest = { lat: 37.8713, lng: -79.4938 };
  const northeast = { lat: 39.742, lng: -75.045 };
  const newBounds = new window.google.maps.LatLngBounds(southwest, northeast);
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    {
      types: [], 
      componentRestrictions: { country: "us" }
    }
  );
  autoComplete.setBounds(newBounds);
  autoComplete.setOptions({ strictBounds: true });
  autoComplete.setFields(["address_components", "formatted_address", "geometry"]);
  autoComplete.addListener("place_changed", () =>
    handleQueryChange(onQueryChange)
  );
}

function handleQueryChange(onQueryChange, queryInput = null) {
  // Weird way of handling both typing query and selecting a suggestion
  if (queryInput !== null) {
    onQueryChange(queryInput);
  } else {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    onQueryChange(query);
  }
}

async function handleSearch(onSearch) {
  const addressObject = autoComplete.getPlace();
  if (addressObject) {
    const query = addressObject.formatted_address;
    if (query && addressObject.geometry) {
      onSearch(query, addressObject.geometry.location.lat(), addressObject.geometry.location.lng(), true);
      return;
    }
  }
  onSearch(null, null, null, false);
}

function AutocompleteSearchBox({query, onQueryChange, onSearch}) {
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => handleScriptLoad(onQueryChange, autoCompleteRef)
    );
  }, [onQueryChange]);

  return (
    <div className="search-location-input">
      <input
        ref={autoCompleteRef}
        onChange={event => handleQueryChange(onQueryChange, event.target.value)}
        placeholder="Find resources in Prince Frederick, Calvert County, MD 20678, USA"
        type="text"
        value={query}
      />
      <Button onClick={() => handleSearch(onSearch)}><SearchIcon></SearchIcon></Button>
    </div>
  );
}

export default AutocompleteSearchBox;

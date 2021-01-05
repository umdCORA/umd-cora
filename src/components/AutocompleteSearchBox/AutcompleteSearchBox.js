import React, { useEffect, useRef } from "react";
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

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    {
      types: ["(regions)"], 
      componentRestrictions: { country: "us" }
    }
  );
  autoComplete.setFields(["address_components", "formatted_address", "geometry"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  if (query && addressObject.geometry) {
    updateQuery(query, addressObject.geometry.location.lat(), addressObject.geometry.location.lng());
  }
}

function AutocompleteSearchBox({query, onQueryChange, onPlaceSelect}) {
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => handleScriptLoad(onPlaceSelect, autoCompleteRef)
    );
  }, [onPlaceSelect]);

  return (
    <div className="search-location-input">
      <input
        ref={autoCompleteRef}
        onChange={event => onQueryChange(event.target.value)}
        placeholder="Find resources in Prince Frederick, Calvert County, MD 20678, USA"
        value={query}
      />
    </div>
  );
}

export default AutocompleteSearchBox;

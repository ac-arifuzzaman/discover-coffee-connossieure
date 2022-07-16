import { useState } from "react";

const useTracLocation = () => {
  const [locationErrorMassage, setLocationErrorMassage] = useState("");
  const [latLong, setLatLong] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLatLong(`${latitude}, ${longitude}`);
    setLocationErrorMassage("");
    setIsFindingLocation(false);
  };

  const error = () => {
    setIsFindingLocation(false);
    setLocationErrorMassage("Unable to retrive your location");
  };

  const handleTracLocation = () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMassage("Geolocation is not supported by your browser");
    } else {
      // status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  return {
    latLong,
    locationErrorMassage,
    handleTracLocation,
    isFindingLocation,
  };
};

export default useTracLocation;

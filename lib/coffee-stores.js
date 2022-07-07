import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});
// console.log(unsplash);

const getListOfCoffeeStorePhoto = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee store",
    page: 1,
    perPage: 30,
  });
  // console.log({ photos });
  const unsplashResult = photos.response.results;

  return unsplashResult.map((result) => result.urls["small"]);
};

const getUrlForCoffeeStore = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};
const FetchCoffeeStore = async () => {
  const photos = await getListOfCoffeeStorePhoto();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStore("23.812976481321666%2C90.41486012295333", "coffee", 6),
    options
  );
  const data = await response.json();
  // .then((response) => response.json())
  // .then((response) => console.log(response))
  // .catch((err) => console.error(err));
  return data.results.map((result, idx) => {
    return {
      ...result,
      imgUrl: photos.length > 0 ? photos[idx] : "",
    };
  });
};

export default FetchCoffeeStore;

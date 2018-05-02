const API = 'https://api.flickr.com/services/rest/';
const APIKey = '5bf1311525022cec7b4c3371d88ae3b6';
const picSearch = 'flickr.photos.search&format=json&nojsoncallback=1';
let request = API+'?&api_key='+APIKey;
export const searchPicByPosition = ( position ) => {
  let url = `${request}&method=${picSearch}&lat=${position.lat}&lon=${position.lng}&accuracy=11`;

  return(fetch(url)
    .then(response => {
      return (response.json());
    })
    .catch(error => {
      console.log(error);
    })
  )};

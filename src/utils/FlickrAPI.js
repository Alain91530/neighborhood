const API = 'https://api.flickr.com/services/rest/';
const APIKey = '5bf1311525022cec7b4c3371d88ae3b6';
const picSearch = 'flickr.photos.search&format=json&nojsoncallback=1';
const request = API+'?&api_key='+APIKey;

export const searchPicByPosition = ( point ) => {
  let text = point.title.slice(0,point.title.indexOf(' '));
  (text==='hotel') ? text = '&text=monument' : text = '&text='+text;
  const url = `${request}&method=${picSearch}&lat=${point.position.lat}&lon=${point.position.lng}${text}`;
  return(fetch(url)
    .then (response =>response.json())
    .catch(error => {console.log(error);})
  );};

export const getPics = ( allPhotos ) => {
  allPhotos = allPhotos.filter(
    photo => (photo.ispublic)&!(photo.isfamily)&!(photo.isfriend)&(photo.title.length)
  );
  allPhotos = allPhotos.slice(0, Math.min(10,allPhotos.length));
  allPhotos = allPhotos.map(
    photo=> getBlob(
      `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
    ));
  return allPhotos;
};

const getBlob= (url) =>
  fetch(`${url}`)
    .then (response => response.blob())
    .then(myBlob => URL.createObjectURL(myBlob));


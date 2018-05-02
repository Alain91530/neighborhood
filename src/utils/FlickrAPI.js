const API = 'https://api.flickr.com/services/rest/';
const APIKey = '5bf1311525022cec7b4c3371d88ae3b6';
const picSearch = 'flickr.photos.search&format=json&nojsoncallback=1';
const tags ='&accuracy=16&tags=tour,pont,monument,egilse,fort'
let request = API+'?&api_key='+APIKey;

export const searchPicByPosition = ( position ) => {
  let url = `${request}&method=${picSearch}&lat=${position.lat}&lon=${position.lng}${tags}`;
  return(fetch(url)
    .then(response => {
      return (response.json());
    })
    .catch(error => {
      console.log(error);
    })
  );};

export const getPic = ( allPhotos ) => {
  let url='https://farm';
  allPhotos = allPhotos.filter(
    photo => (photo.ispublic)&!(photo.isfamily)&!(photo.isfriend)&(photo.title.length)
  );
  if (allPhotos.length) {
    const photo=allPhotos[0];
    url = url+`${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
  }
  else {
    url ='icons/no_pic.jpg'
  }
  console.log(url);
  return url;

};

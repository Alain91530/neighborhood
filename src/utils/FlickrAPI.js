const API = 'https://api.flickr.com/services/rest/';
const APIKey = '5bf1311525022cec7b4c3371d88ae3b6';
const picSearch = 'flickr.photos.search&format=json&nojsoncallback=1';
const request = API+'?&api_key='+APIKey;

export const searchPicByPosition = ( point ) => {
  const text= '&text='+point.title.slice(0,point.title.indexOf(' '));
  console.log(text)
  const url = `${request}&method=${picSearch}&lat=${point.position.lat}&lon=${point.position.lng}${text}&sort=interestingness_desc`;
  return(fetch(url)
    .then(response => {
      return (response.json());
    })
    .catch(error => {
      console.log(error);
    })
  );};

export const getPic = ( allPhotos ) => {
  let firstUrls = []
  let url='https://farm';
  allPhotos = allPhotos.filter(
    photo => (photo.ispublic)&!(photo.isfamily)&!(photo.isfriend)&(photo.title.length)
  );
  console.log(allPhotos.length)
  if (allPhotos.length) {
    for (let i = 0; i<allPhotos.length; i++) {
      const photo=allPhotos[i];
      url = url+`${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
      firstUrls.push(url);
    }}
  else {
    firstUrls.push('icons/no_pic.jpg');
  }
  console.log(firstUrls);
  return firstUrls;

};

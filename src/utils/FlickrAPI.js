const API = 'https://api.flickr.com/services/rest/';
const APIKey = '5bf1311525022cec7b4c3371d88ae3b6';
const picSearch = 'flickr.photos.search&format=json&nojsoncallback=1';
const request = API+'?&api_key='+APIKey;

export const searchPicByPosition = ( point ) => {
  let text = point.title.slice(0,point.title.indexOf(' '));
  (text==='hotel') ? text = '&text=monument' : text = '&text='+text;
  console.log(text)
  const url = `${request}&method=${picSearch}&lat=${point.position.lat}&lon=${point.position.lng}${text}`;
  return(fetch(url)
    .then(response => {
      return (response.json());
    })
    .catch(error => {
      console.log(error);
    })
  );};

export const getPic = ( allPhotos ) => {
  let firstImgs = [];
  allPhotos = allPhotos.filter(
    photo => (photo.ispublic)&!(photo.isfamily)&!(photo.isfriend)&(photo.title.length)
  );
  let imgUrl;
  let img;

  if (allPhotos.length) {
    for (let i = 0; i<allPhotos.length; i++) {
      imgUrl = 'https://farm';
      const photo = allPhotos[i];
      imgUrl = imgUrl+`${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
      img = {key: photo.id, url: imgUrl};
      firstImgs.push(img);
    }}
  else {
    firstImgs.push({key: 0, url: 'icons/no_pic.jpg'});
  }
  return firstImgs;

};

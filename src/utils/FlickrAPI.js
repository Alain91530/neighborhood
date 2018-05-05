const API = 'https://api.flickr.com/services/rest/';
const APIKey = '5bf1311525022cec7b4c3371d88ae3b6';
const picSearch = 'flickr.photos.search&format=json&nojsoncallback=1';
const request = API+'?&api_key='+APIKey;

export const searchPicByPosition = ( point ) => {
  let text = point.title.slice(0,point.title.indexOf(' '));
  (text==='hotel') ? text = '&text=monument' : text = '&text='+text;
  console.log(text);
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
    photo=> getBlob(`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg` ));
  return allPhotos;
}
 /* let imgUrl;
  let img;
  let test;

  if (allPhotos.length) {
    for (let i = 0; i<Math.min(10,allPhotos.length); i++) {
      imgUrl = 'https://farm';
      const photo = allPhotos[i];
      imgUrl = imgUrl+`${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
      img = {key: photo.id, url: imgUrl};
      test = getBlob(imgUrl).then(resp=>{img.url = resp; console.log(img.url)});
      img.url=test;
      firstImgs.push(img);

    }
console.log(test);
  }
  else {
    firstImgs.push({key: 0, url: 'icons/no_pic.jpg'});
  }
  return firstImgs;

};*/

const getBlob= (url) =>
  fetch(`${url}`)
    .then (response => response.blob())
    .then(myBlob => URL.createObjectURL(myBlob));


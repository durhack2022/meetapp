function getCentroid(userCoordinates){
    let sumLat = 0;
    let sumLng = 0;
    
    for (let coordinate of userCoordinates){
      sumLat += coordinate.lat;
      sumLng += coordinate.lng;
    }
    
    let avgLat = sumLat / userCoordinates.length;
    let avgLng = sumLng / userCoordinates.length;
    return { lat: avgLat, lng: avgLng };
}

const encodePoints = points => {
  const COMMA = "%2C";
  const PIPE = "%7C";
  
  let res = "";

  for (let p of points) {
    if (res === "") {
      res += p.lat + COMMA + p.lng;
    } else {
      res += PIPE + p.lat + COMMA + p.lng
    }
  }

  return res;
};

export { getCentroid, encodePoints };
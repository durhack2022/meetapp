function getCentroid(userCoordinates){
    let sumLat = 0;
    let sumLng = 0;
    
    for (let coordinate in userCoordinates){
      sumLat += coordinate.lat;
      sumLng += coordinate.lng;
    }
    
    let avgLat = sumLat / userCoordinates.length;
    let avgLng = sumLng / userCoordinates.length;
    return { lat: avgLat, lng: avgLng };
}

export { getCentroid };
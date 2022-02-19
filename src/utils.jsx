function GetCentroid(userCoordinates){

    let sumLat=0;
    let sumLong=0;
    for (let coordinate in userCoordinates){
      sumLat+=coordinate[0];
      sumLong+=coordinate[1];
    }
    let avgLat=sumLat/(userCoordinates.length);
    let avgLong=sumLong/(userCoordinates.length);
    return (avgLat,avgLong);
}
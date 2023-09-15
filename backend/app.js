const express = require('express');
const app = express();
const port = 3080;

var cors = require('cors');

app.use(cors());

const path = require("path");
const fetch=require("node-fetch");
//const API_KEY="AIzaSyCBkw_uhBVIOIqek8TbGZXex8pszTc8Qnk";
const API_KEY="AIzaSyBHydWSWKqNfjto6AytrqLePU3yFeZAD08";
app.use(express.json());
app.use(express.urlencoded());

const SEARCH_RADIUS=5000;   //radius of search area around the centroid
const HOW_MANY=5;   //how many results to aggregate

async function GetNearbyPlaces(type,lat,lng,radius){
    let url= `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=${radius}&type=${type}&key=${API_KEY}`
    let google_resp=await fetch(url);
    let body=await google_resp.json();

    return await body
}


function filterPlaces(body,howMany) {  //exclude unnecessary attributes from the json response
    let response=[];
    let count=0
    for (let result of body.results){
            if (result.business_status==="OPERATIONAL"){
                count+=1;
                response.push({
                    name:result.name,
                    lat:result.geometry.location.lat,
                    lng:result.geometry.location.lng,
                    rating:result.rating,
                    user_ratings_total:result.user_ratings_total,
                    place_id:result.place_id
                })
            }
            if (count===howMany){
                break;
            }
    }
    return response;
}

let originsList=[[54.7783543,-1.577],[54.7771651,-1.5547943],[54.7736351,-1.5919927]]//[TA,DB]   //mock
let destinationsList=[[54.7745788915615, -1.5756803066541583],[54.77523793773805, -1.575823132909281]]   //mock


async function GetTravelTimes(originsList,destinationsList,mode){

    let tempList=[];
    for (let origin of originsList){
        let temp = origin.join("%2C");
        tempList.push(temp);
    }
    let formattedOrigins=tempList.join("%7C");

    tempList=[];
    for (let destination of destinationsList){
        let temp = destination.join("%2C");
        tempList.push(temp);
    }
    let formattedDestinations=tempList.join("%7C");

    let url= `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${formattedOrigins}&destinations=${formattedDestinations}&key=${API_KEY}&mode=${mode}`;
    let google_resp=await fetch(url);
    let body=await google_resp.json();
    return body.rows
}

async function GetDistancesToPlaces(type,lat,lng,originList,mode){

  
    let body=await GetNearbyPlaces(type,lat,lng,SEARCH_RADIUS);
    console.log(body)
    if (body.length===0){
        return null
    }
    let jsonPlaces=filterPlaces(body,HOW_MANY);

    let placesCoordinates=[];
    for (let jsonPlace of jsonPlaces){
        placesCoordinates.push([parseFloat(jsonPlace.lat),parseFloat(jsonPlace.lng)]);
    }
    let lst = await GetTravelTimes(originList,placesCoordinates,mode)
    
    let results=[]
    let count=0
    for (let origin of lst){
        let result=[]
        for (let place of origin.elements){
            result.push({
                name:jsonPlaces[count].name,
                distance:place.distance.value,
                duration:place.duration.value
            })
            count=(count+1)%jsonPlaces.length
        }
        results.push(result)
    }
    return results;

}

async function GetOptimal(type,centroidLat,centroidLng,mode){
    
    let body=await GetNearbyPlaces(type,centroidLat,centroidLng,SEARCH_RADIUS);
    if (!body){
        return null
    }
    let jsonPlaces=filterPlaces(body,HOW_MANY);

    body=await GetDistancesToPlaces(type,centroidLat,centroidLng,originsList,mode);
    console.log()
    let sumDistance=[]
    let sumDuration=[]
    for (let origin of body[0]){
        sumDistance.push({
            name:origin.name,
            sum:0
        })
        sumDuration.push({
            name:origin.name,
            sum:0
        })
    }
    for (let origin of body ){
        for (let i=0;i<body[0].length;i++){
            sumDistance[i].sum+=parseInt(origin[i].distance)
            sumDuration[i].sum+=parseInt(origin[i].duration)
        }
    }

    let sortedByDistance=sumDistance.sort((a,b) =>  a.sum-b.sum);
    let sortedByDuration=sumDuration.sort((a,b) =>  a.sum-b.sum);
    
    for (let result of sortedByDistance){
        let temp=jsonPlaces.find((object)=>(object.name===result.name))
        result.rating=temp.rating;
        result.user_ratings_total=temp.user_ratings_total
        result.lat=temp.lat;
        result.lng=temp.lng
        result.place_id=temp.place_id
        result.page_url=`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${temp.place_id}`

    }
    for (let result of sortedByDuration){
        let temp=jsonPlaces.find((object)=>(object.name===result.name))
        result.rating=temp.rating;
        result.user_ratings_total=temp.user_ratings_total
        result.lat=temp.lat;
        result.lng=temp.lng;
        result.place_id=temp.place_id
    }

    return [sortedByDistance,sortedByDuration]

}


app.get('/getOptimalPlaces', async(req,res)=>{
    let type=req.query.type;
    let lat=req.query.lat;
    let lng=req.query.lng;
    let originsListFormatted=req.query.originsList;
    let mode=req.query.mode;
    let originsList=[];
    for (let origin of originsListFormatted.split("|")){
        let lat=parseFloat(origin.split(",")[0])
        let lng=parseFloat(origin.split(",")[1])
        originsList.push([lat,lng])
    }
    let body=await GetOptimal(type,lat,lng,originsList,mode);
    if (!body){
        res.send("No results")
    }
    res.send(body);
    
})

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
  })

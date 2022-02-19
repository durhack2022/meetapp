const express = require('express');
const app = express();
const port = 3080;

var cors = require('cors');

//sam and jenni, this is something I have included to allow access to the API when hosted on a different domain to the front end
app.use(cors());

const path = require("path");
const fetch=require("node-fetch");
const API_KEY="AIzaSyCBkw_uhBVIOIqek8TbGZXex8pszTc8Qnk";

app.use(express.json());
app.use(express.urlencoded());

async function GetNearbyPlaces(type,lat,long,radius){
    let url= `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${long}&radius=${radius}&type=${type}&key=${API_KEY}`
    let google_resp=await fetch(url);
    let body=await google_resp.json();
    return await body
}


app.get('/nearbyPlaces', async(req,res)=>{
    let type=req.query.type;
    let lat=req.query.lat;
    let long=req.query.long;
    let radius=1500;
    let body=await GetNearbyPlaces(type,lat,long,radius);
    res.send(body);
})

async function GetTravelTime(originList,destinationsList,mode){
    let tempList=[];
    for (let origin in originList){
        let temp = origin.join("%2C");
        tempList.push(temp);
    }
    let formattedOrigins=tempList.join("%7C");

    tempList=[];
    for (let destination in destinationsList){
        let temp = destination.join("%2C");
        tempList.push(temp);
    }
    let formattedDestinations=tempList.join("%7C");

    let url= `'https://maps.googleapis.com/maps/api/distancematrix/json?origins=${formattedOrigins}&destinations=&key=${API_KEY}&mode=${mode}`;
    let google_resp=await fetch(url);
    let body=await google_resp.json();
}



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

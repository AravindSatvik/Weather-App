const request=require('request');

const geocode=(location,state,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(location)+'.json?access_token=ENTER_THE_API_KEY&limit=3';
    var check=false;
    var latitude=0;
    var longitude=0;
    request({url,json:true},(error,{body})=>{
        if (error){
            callback('Unable to connect to the coordinates service!',undefined);
        }
        else if (body.message){
            callback("Please enter a valid location!",undefined);
        }
        else{
            body.features.every((loc)=>{
                loc.context.every((cont)=>{
                    if (cont.text.toLowerCase()==state){
                        longitude=loc.center[0];
                        latitude=loc.center[1];
                        callback(undefined,{
                            latitude:latitude,
                            longitude:longitude
                        });
                        check=true;
                        return false;
                    }
                    return true;
                })
                if (check){
                    return false;
                }
                return true;
            })
            if (latitude==0 && longitude==0){
                callback('Location Not Found',undefined);
            }
        }
    })
}


//export functions
module.exports=geocode;

const request=require('request');

const forecast=(error,data,callback)=>{
    if (data===undefined && error!=undefined){
        callback(error,undefined);
    }
    else{
        const url='http://api.weatherstack.com/current?access_key=ENTER_THE_API_KEY&query='+data.latitude+','+data.longitude;
        request({url,json: true},(error,{body})=>{
            if (error){
                callback("Unable to connect to weather service!",undefined);
            }
            else if (body.error){
                callback("Unable to find location!",undefined);
            }
            else{
                callback(undefined,body.current);
            }
        })
    }
}


//export functions
module.exports=forecast;

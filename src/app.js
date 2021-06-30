//import packages
const path=require('path');
const express=require('express');
const hbs=require('hbs');  //for partials

//import utils js files
const geocode=require('./utils/geocode.js');
const forecast=require('./utils/forecast.js');

//paths
const publicpath=path.join(__dirname,'../public');
const viewspath=path.join(__dirname,'../templates/views');
const partialspath=path.join(__dirname,'../templates/partials');

//server set up
const app=express();
app.set('view engine','hbs');  //set up handlebars engine
app.set('views',viewspath);
hbs.registerPartials(partialspath)  //registerpartials takes the path where partials live in.

//set up static directory to serve (if we are using any file from public folder, we need to use the below line)
app.use(express.static(publicpath));

//define routes
app.get('',(req,res)=>{
    res.render('index');
})

app.get('/weather',({query},res)=>{
    if (!query.city && !query.state){
        return res.send({
            status: 'Please give an address!'
        })
    }
    geocode(query.city,query.state.toLowerCase(),(firsterror,data)=>{
        forecast(firsterror,data,(error,response)=>{
            if (error){
                return res.send({
                    status: error
                })
            }
            res.send(response);
        })
    })
})

app.get('*',(req,res)=>{
    res.send({
        status: '404 error'
    })
})

//To make the server up and running
app.listen(3000,()=>{
    console.log("server is up on port 3000!")
})
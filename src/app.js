const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath= path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials")

const geocoding= require("./utils/geoCode")
const forecast= require("./utils/forecast")

app.set("view engine", "hbs");
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "duaa",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Duaa",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
   helpText: "This is helpful text",
   title: "Help",
   name:'duaa'
  });
});


app.get("/weather", (req, res) => {
  if(!req.query.address){
   return res.send({error: "please provide an address"})
  }

  geocoding(req.query.address, (error, {latitude, longitude, location}={})=> {
    if(error) {
      return res.send(error)
    }

    forecast(latitude, longitude, (err, forecastData) =>{
      if(err) return res.send(err)

    res.send({
    forecast: forecastData ,
    location,
    address: req.query.address
  });
    })

})
});

app.get("/product", (req, res) => {
 if(! req.query.search){
  return res.send({error: "please provide search term"})
 }

 res.send({
   product:[]
 })
   
})
app.get("/help/*", (req, res) => {
    res.render('404',{
        title: "404",
        name: 'duaa',
        errorMsg:"help article not found"
    })
})

app.get("/*", (req, res) => {
    res.render('404', {
        title: "404",
        name: 'duaa',
        errorMsg: 'page not found'
    })
})

app.listen(8000, () => {
  console.log("listening on port 8000");
});


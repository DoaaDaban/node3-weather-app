const request= require('request')

const geocoding =(address, callback) => {

    const urlGeo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoia2FtZWxhbWFybmVoIiwiYSI6ImNsMWtvOGdkdjAyY2EzYm8zdHpncGR1a3gifQ.BYGahq4YuHHD4-CWwOBfbQ&limit=1'
    request ({url: urlGeo, json: true}, (err, {body}) => {
        if(err){
            callback("unable to connect to server", undefined)
        }else if(body.features.length === 0) {
            callback("unable to find location", undefined)
        }else{
            const longitude= body.features[0].center[0]
            const latitude= body.features[0].center[1]
            const location= body.features[0].place_name

            callback(undefined, {latitude, longitude, location}) 
        }
    })


}

module.exports = geocoding
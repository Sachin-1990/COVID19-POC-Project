var express = require('express');
var router = express.Router();
var request = require("request")

/* GET home page. */
router.get('/', function (req, res, next) {

  // API endpoint to which the http request will be made 
  const url = "https://api.covid19india.org/data.json";

  // The data have lot of extra properties ; We are filtering it 
  var data = [];
  // HTTP request 
  request(url, (error, response, body) => {

    // Error - Any possible error when request is made. 

    // Response - HTTP response status codes indicate whether a specific HTTP request has been successfully completed 

    // body - response data 

    // 200 - successful response 
    if (!error && response.statusCode == 200) {

      // The response data will be in string 
      // Convert it to Object. 
      body = JSON.parse(body);
      console.log("Response Body is -"+ body);

      for (let i = 0; i < body.statewise.length; i++) {
        data.push({
          "State": body.statewise[i].state,

          "Confirmed": body.statewise[i].confirmed,

          "Active": body.statewise[i].active,

          "Recovered": body.statewise[i].recovered,

          "Death": body.statewise[i].deaths
        });
      }
      console.log("Filtered Data count is -" + data.length);
      // for (i=0; i < data.length; i++) {
      //   console.log(data[i]);
      //   console.log(data[i].State);
      // }    
    }
  })

  res.render('index', { title: 'COVID19 POC Project' , data: data });  
  
});

module.exports = router;

var express = require('express');
var router = express.Router();
// var request = require("request");
var axios = require("axios");
var data = [];

/* GET home page. */
router.get('/', function (req, res, next) {

  // API endpoint to which the http request will be made 
  const url = "https://api.covid19india.org/data.json";  
  getURLResponse_andredirect(res,url,'index');

});
async function getURLResponse_andredirect(res,url,route_page) {  
  try {
    data=[];
    var response="";
    response = await axios.get(url);
    // console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    // console.log(response.headers);
    // console.log(response.config);

    if (response.status == 200) {
      body = JSON.parse(JSON.stringify(response.data));
      console.log("Response Body is -" + body);

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
    }
    res.render(route_page, { title: 'COVID19 POC Project', data: data });
  } catch (error) {
    console.error(error);
  }
}

module.exports = router;

var express = require('express');
var router = express.Router();
// var request = require("request");
var axios = require("axios");

/* GET home page. */
router.get('/', function (req, res, next) {

  // API endpoint to which the http request will be made 
  const url = "https://api.covid19india.org/data.json";

  getURLResponse_andredirect(res, url, 'index');

});
router.post('/filtereddata', function (req, res, body) {

  console.log("Inside post block of filtereddata");
  console.log("body-" + body);

  var parentObject = new Object();
  parentObject.country = req.body.country;
  parentObject.from_date = req.body.from_date;
  parentObject.to_date = req.body.to_date;

  console.log("Country Selected is -" + parentObject.country);
  console.log("From Date  Selected is -" + parentObject.from_date);
  console.log("To Date Selected is -" + parentObject.to_date);

  const url = 'https://covidapi.info/api/v1/country/'+ parentObject.country + '/timeseries/' + parentObject.from_date + '/' + parentObject.to_date

  getURLResponse_andredirect(res, url, 'filtereddata');

});
async function getURLResponse_andredirect(res, url, route_page) {
  console.log("Passed URL is -" + url);
  try {
    var data = [];
    var country_data = [];
    const response = await axios.get(url);
    // console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    // console.log(response.headers);
    // console.log(response.config);

    if (response.status == 200) {
      body = JSON.parse(JSON.stringify(response.data));
      console.log("Response Body is -" + body);

      if (route_page == 'index') {
        console.log("Inside if route_page is index !!");
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

        const country_url = "https://covid19.mathdro.id/api/countries"

        country_data = await getCountryList(country_url);
        console.log("Count of Countries is -" + country_data.length);

        res.render(route_page, { title: 'COVID19 POC Project', data: data, country: country_data });
      }
      else if (route_page == 'filtereddata') {
        console.log("Inside else if route_page is filtereddata !!");
        for (let i = 0; i < body.result.length; i++) {
          console.log("response body is- " + body[i]);
          data.push({

            "Date": body.result[i].date,
            "Confirmed": body.result[i].confirmed,
            "Recovered": body.result[i].recovered,
            "Death": body.result[i].deaths

          });
        }
        console.log("Filtered Data count is -" + data.length);
        res.render(route_page, { title: 'COVID19 POC Project', data: data });
      }
      else {
        console.log("Wrong Choice !!");
      }

    }


  } catch (error) {
    console.error(error);
  }
}
async function getCountryList(url) {
  console.log("Passed URL is -" + url);
  try {
    var data = [];
    const response = await axios.get(url);
    // console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    // console.log(response.headers);
    // console.log(response.config);

    if (response.status == 200) {
      body = JSON.parse(JSON.stringify(response.data));
      console.log("Response Body is -" + body);
      for (let i = 0; i < body.countries.length; i++) {
        data.push({

          "Country_Code": body.countries[i].iso3,
          "Country_Code_2chars": body.countries[i].iso2,
          "Country_Name": body.countries[i].name,

        });
      }
      console.log("Filtered Country Data count is -" + data.length);
      // for(i=0; i<data.length; i++){
      //   console.log("Country Code - Name is :"+ data[i].Country_Code + '-' + data[i].Country_Name);
      // }
    }
  }
  catch (error) {
    console.error(error);
  }
  return data;
}

module.exports = router;

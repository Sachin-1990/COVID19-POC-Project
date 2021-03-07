# COVID19-POC-Project

# Introduction
This project is created for POC purpose to track COVID19 Cases in India (Statewise).
It also has a feature to track the Global Countrywise Count for a given Date Range

# Overview
The Project Uses 2 API's
1) How do I get the Statewise Cases for India?
    
   You could use the [`https://api.covid19india.org/data.json`](https://api.covid19india.org/data.json) endpoint

2) How do I get the data for a country in a date-range?

    Ex: To get the data for India between 1st and 7th March 2021, you could use [`/api/v1/country/IND/timeseries/2021-03-01/2021-03-07`](https://covidapi.info/api/v1/country/IND/timeseries/2021-03-01/2021-03-07)

# Authentication
There's no authentication required.

# Local Setup

### Clone the repo locally
`git clone https://github.com/Sachin-1990/COVID19-POC-Project.git`

### Setup a NODE Environment

### Starting application
```
cd path/to/cloned/project

npm install
npm run devstart
```

### Checking application
```
http://localhost:3000/
```

const axios = require('axios');

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

/* ---- (Dashboard) ---- */
// const axios = require("axios");

function getTotalCase(req, res) {
    axios.get('https://api.covidtracking.com//v2/us/daily/2021-01-02/simple.json')
        .then(function (response){
            console.log(response.data);
            const obj = JSON.parse(JSON.stringify(response.data));
            console.log(obj.data.cases.total);
            const totalCases = obj.data.cases.total;
            console.log(totalCases);
            res.json(totalCases);
        });
};



// The exported functions, which can be accessed in index.js.
module.exports = {
  getTotalCase: getTotalCase,
}
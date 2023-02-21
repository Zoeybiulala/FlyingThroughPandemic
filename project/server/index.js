const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");

const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// var totalCases;
// axios.get('https://api.covidtracking.com//v2/us/daily/2021-01-02/simple.json')
// 	.then(function (response){
// 		console.log(response.data);
// 		const obj = JSON.parse(JSON.stringify(response.data));
// 		console.log(obj.data.cases.total);
// 		totalCases = obj.data.cases.total;
// 	});





/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/* ---- (Dashboard) ---- */
app.get('/total', routes.getTotalCase);


app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});
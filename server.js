const express=require('express'),
	  bodyParser=require('body-parser'),
	  path=require('path');

const app = express(),
	  PORT = process.env.PORT || 8080;


// Body Parser stuff
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// including static dir stuff
app.use(express.static(path.join(__dirname, 'app')));

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);


app.listen(PORT);
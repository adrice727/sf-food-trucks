#sf food trucks

This is a single-page application centered around an interactive map of San Francsico that displays the locations of food trucks around the city.  You can view a live version at [http://sf-trucks.herokuapp.com/](http://sf-trucks.herokuapp.com/).

I opted for a purely front-end solution as the entire [dataset](https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat?) is relatively small, simple, and only
requires a single api call to obtain. A Node.js/Express server is used only to server
the static content.

### Technologies used:

* jQuery
* underscore.js
* NPM
* Bower
* Node.js/Express
* Jasmine/Jasmine-jQuery
* Google Maps JavaScript API 

I initially started building the application with Backbone, but eventually decided that using a framework for something so simple would be overkill. A single file is used to initialize the map and handle click events, and another to manage the data related to the food trucks.


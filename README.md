#sf food trucks

A web application centered around an interactive map of San Francsico that displays the locations of food trucks around the city.  Users can click on map markers to get more information about each truck.  You can view a live version at [http://sf-trucks.herokuapp.com/](http://sf-trucks.herokuapp.com/).

I opted for a front-end solution as the entire [dataset](https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat?) required for the application is relatively small, simple, and can be obtained with a single api call.

### Technologies used:

* jQuery
* underscore.js
* NPM
* Bower
* Node.js/Express
* Jasmine/Jasmine-jQuery
* Google Maps JavaScript API 

I initially started building the application with Backbone, but decided that using a framework for something so simple would be overkill.  Instead, I'm using a single module to initialize the map and another module to manage the data related to the food trucks.  jQuery is used to handle events and update the view.  A Node.js/Express server is used only to serve
the application files.

I opted to use Jasmine for a testing framework since there is an add-on library (Jasmine-jQuery) that makes it easy to test DOM events.  However, I've been short on time and haven't actually written any tests.

The code for this and some of my other projects can be found on [github](https://github.com/adrice727) and my resume can be seen [here](http://goo.gl/0tClVH).

~~ Aaron Rice ~~

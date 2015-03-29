#sf food trucks

This is a single-page application centered around an interactive map of San Francsico that displays the locations of food trucks around the city.  You can view a live version [here](www.google.com).

I opted for a purely front-end solution as the entire [dataset](https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat?) is relatively small, simple, and only
requires a single api call to obtain.

### Technologies used:

* jQuery
* underscore.js
* Google Maps JavaScript API 

I initially started building the application with Backbone, but eventually decided that using a framework for something so simple would be overkill. Instead, I opted to use a single module to initialize the map and handle click events, and another to manage the data related to the food trucks. 


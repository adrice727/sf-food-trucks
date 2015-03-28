$(function(){

  var map, currentLocationMarker = {};
  
  // Define map options
  var mapOptions = {
    minZoom:16,
    zoom: 16,
    maxZoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false
  };

  // Get current location or default to Market/Embarcadero
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      curLat = position.coords.latitude;
      curLong = position.coords.longitude;
      mapOptions.center = new google.maps.LatLng(curLat, curLong);
      initializeMap();
    });
  } else {
    mapOptions.center = new google.maps.LatLng(37.79496, -122.394358);
    initializeMap();
  }

  function initializeMap(){
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    currentLocationMarker = new google.maps.Marker({
      position: mapOptions.center,
      map: map,
      title: 'My Location'
    });
    currentLocationMarker.setMap(map);
    addTruckMarkersToMap();
  }

  var truckMarkers = [];
  var truckImage = 'img/food-truck.png';

  var foodTruckService = new FoodTruckService();
  foodTruckService.initialize().then(function(){
    var trucks = foodTruckService.allTrucks();
    _.each(trucks, function(truck){
      createTruckMarker(truck.objectid, truck.applicant, truck.location);
    })
  })

  function createTruckMarker(id, name, location){
    if ( !!location ) {
      var markerLatLng = new google.maps.LatLng(location.latitude, location.longitude);
      var marker = new google.maps.Marker({
        position: markerLatLng,
        map: map,
        title: name,
        icon: truckImage
      });
      truckMarkers.push(marker);
    }
  }

  function addTruckMarkersToMap(){
    _.each(truckMarkers, function(marker){
      marker.setMap(map);
    })
  }
});




      



      // var markers = [];
      // var map = new google.maps.Map(document.getElementById('map-canvas'), {
      //   mapTypeId: google.maps.MapTypeId.ROADMAP
      // });
      
      // var defaultBounds = new google.maps.LatLngBounds(
      //     new google.maps.LatLng(-33.8902, 151.1759),
      //     new google.maps.LatLng(-33.8474, 151.2631));
      // map.fitBounds(defaultBounds);
      
      // // Create the search box and link it to the UI element.
      // var input = /** @type {HTMLInputElement} */(
      //     document.getElementById('pac-input'));
      // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      
      // var searchBox = new google.maps.places.SearchBox(
      //   /** @type {HTMLInputElement} */(input));
      
      // // Listen for the event fired when the user selects an item from the
      // // pick list. Retrieve the matching places for that item.
      // google.maps.event.addListener(searchBox, 'places_changed', function() {
      //   var places = searchBox.getPlaces();
      
      //   if (places.length == 0) {
      //     return;
      //   }
      //   for (var i = 0, marker; marker = markers[i]; i++) {
      //     marker.setMap(null);
      //   }
      
      //   // For each place, get the icon, place name, and location.
      //   markers = [];
      //   var bounds = new google.maps.LatLngBounds();
      //   for (var i = 0, place; place = places[i]; i++) {
      //     var image = {
      //       url: place.icon,
      //       size: new google.maps.Size(71, 71),
      //       origin: new google.maps.Point(0, 0),
      //       anchor: new google.maps.Point(17, 34),
      //       scaledSize: new google.maps.Size(25, 25)
      //     };
      
      //     // Create a marker for each place.
      //     var marker = new google.maps.Marker({
      //       map: map,
      //       icon: image,
      //       title: place.name,
      //       position: place.geometry.location
      //     });
      
      //     markers.push(marker);
      
      //     bounds.extend(place.geometry.location);
      //   }
      
      //   map.fitBounds(bounds);
      // });
      
      // // Bias the SearchBox results towards places that are within the bounds of the
      // // current map's viewport.
      // google.maps.event.addListener(map, 'bounds_changed', function() {
      //   var bounds = map.getBounds();
      //   searchBox.setBounds(bounds);
      // });

      // google.maps.event.addDomListener(window, 'load', initialize);
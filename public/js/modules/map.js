/*
 * Map Setup and Initialization
 */
var Map = (function(){

  var gMap = function(){};

  gMap.prototype.initialize = function(){
      // Get current location or default to Market/Embarcadero
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        curLat = position.coords.latitude;
        curLong = position.coords.longitude;
        mapOptions.center = new google.maps.LatLng(curLat, curLong);
        buildMap();
      },
      function(){
        setDefaultLocation();
      });
    } else {
      setDefaultLocation();
    }
  }

  var map, currentLocationMarker = {};
  
  // Define map options
  var mapOptions = {
    minZoom:16,
    zoom: 18,
    maxZoom: 19,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false
  };

  function setDefaultLocation(){
    mapOptions.center = new google.maps.LatLng(37.79496, -122.394358);
    buildMap();
  }

  function buildMap(){
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    currentLocationMarker = new google.maps.Marker({
      position: mapOptions.center,
      map: map,
      title: 'My Location'
    });
    $('.map-container').spin(false);
    addSearchBox();
    currentLocationMarker.setMap(map);
    addTruckMarkersToMap();
  }

  function addSearchBox(){
    var input = document.getElementById('pac-input');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var searchBox = new google.maps.places.SearchBox((input));

    google.maps.event.addListener(searchBox, 'places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      } else {
        var location = places[0].geometry.location;
        var center = new google.maps.LatLng(location.k, location.D);
        currentLocationMarker.setPosition(center)
        map.panTo(center);
        map.setZoom(mapOptions.zoom);
      }

    });

    $('#pac-input').removeClass('hidden');
  }

  /*** Add truck markers and set event listeners ***/

  var truckMarkers = [];
  /*
   * Google Maps API doesn't allow you to add custom properties to markers.
   * A workaround for not having to use google maps info windows to display data
   * is to map each marker to it's corresponding truck id by using each
   * individual location (lat/lang) as a unique key.
   */
  var truckMarkerDataMap = {};
  var truckImage = 'img/food-truck-icon.png';

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
      truckMarkerDataMap[marker.position.toString()] = id;
    }
  }

  function addTruckMarkersToMap(){
    _.each(truckMarkers, function(marker){
      google.maps.event.addListener(marker, "click", function(truck) {
        var key = truck.latLng.toString();
        foodTruckService.displayTruckInfo(truckMarkerDataMap[key]);
      });
      marker.setMap(map);
    })
  }

  return gMap;
})();
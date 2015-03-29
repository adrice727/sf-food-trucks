$(function(){

  /*** Map Setup and Initialization ***/

  $('.map-container').spin('large');

  var map, currentLocationMarker = {};
  
  // Define map options
  var mapOptions = {
    minZoom:16,
    zoom: 17,
    maxZoom: 19,
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
    $('.map-container').spin(false);
    currentLocationMarker.setMap(map);
    addTruckMarkersToMap();
  }

  /*** Add truck markers and set event listeners ***/

  var truckMarkers = [];
  /*
   Workaround for having to use google maps info windows to display data
   * is to map each marker to it's corresponding truck id by using each
   * location as a unique key.
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
});
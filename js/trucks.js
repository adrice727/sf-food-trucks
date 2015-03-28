

var FoodTruckService = (function(){

  var foodTrucks = {};
  var service = function(){};

  //fetch data from the api
  service.prototype.initialize = function(){
    var deferred = $.Deferred();
    $.get('https://data.sfgov.org/resource/rqzj-sfat.json').then(
      function(data){
        _.each(data, function(truck){
          foodTrucks[truck.objectid] = truck;
        })
        deferred.resolve();
      },
      function(error){
        console.log('ruh roh', error);
        deferred.reject();
      })

    return deferred.promise();
  }

  service.prototype.allTrucks = function(){
    return foodTrucks;
  }

  service.prototype.getTruckInfo = function(id) {
    return foodTrucks[id];
  }

  return service;

})();


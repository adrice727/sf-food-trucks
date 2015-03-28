

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

  function clearPreviousInfo(){
    $('.truck-details').children('span').each(function(){
      $(this).html('');
    })
    $('.truck-items ul').empty();
  }

  service.prototype.displayTruckInfo = function(id) {
    var truckInfo = foodTrucks[id];
    clearPreviousInfo();
    $('.no-truck-selected').addClass('hidden');
    $('.truck-name').text(truckInfo.applicant);
    $('.truck-address span').text(truckInfo.address);
    var items = truckInfo.fooditems.split(':');
    $('.truck-cuisine span').text(items[0]);
    _.each(items.slice(1), function(item) {
      var listItem = '<li>' + item + '</li>';
      $('.truck-items ul').append(listItem);
    })
    $('.truck-details').removeClass('hidden');
  }

  service.prototype.getTruckInfo = function(id) {
    return foodTrucks[id];
  }

  // name -> applicant
  // address -> address
  // FoodItems -> FoodItems


  return service;

})();


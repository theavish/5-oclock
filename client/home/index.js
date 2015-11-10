var myApp = angular.module('5oc', []);



var randomIndex = function (array) {
  return array[Math.floor((Math.random()*array.length))];
};

myApp.controller('LocalController', ['$scope', '$http', function($scope, $http) {
    //build fiveoc object
    $scope.fiveoc = {
      local:{},
      forn:{}
    };

  //finds five oclock in the world
  _.each(offPlaces, function(value, key, list) {
    if ( getLocalTimeByOffset(key).includes('PM') ) {



      if ( getLocalTimeByOffset(key).match(/[5-6]:[0-5][0-9]:[0-5][0-9] PM/g) ) {
        var places = [];
        var times = [];
        places.push(randomIndex(value));
        times.push(getLocalTimeByOffset(key));
        $scope.fiveoc.forn.loc = randomIndex(places);
        $scope.fiveoc.forn.time = randomIndex(times).match(/[0-9]:[0-9][0-9]/g)[0];
      }
    }
  });
// function to calculate local time
// in a different city
// given the city's UTC offset
function getLocalTimeByOffset(offset) {
    // create Date object for current location
    var d = new Date();
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*offset));
    // return time as a string
    return nd.toLocaleString();
  }

  navigator.geolocation.getCurrentPosition(function(pos) {
    var localD = new Date();
    //set local lat to latitude from location
    $scope.fiveoc.local.lat = pos.coords.latitude;

    //set local long to longitude from location
    $scope.fiveoc.local.long = pos.coords.longitude;

    //set local time to timestamp from new Date object
    $scope.fiveoc.local.time = (localD.getHours() > 12 ? localD.getHours() - 12 : localD.getHours()) + ':' + (localD.getMinutes() > 9 ? localD.getMinutes() : '0' + localD.getMinutes());

    //set local loc to city from lat/long via google geocode
    $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + $scope.fiveoc.local.lat + "," + $scope.fiveoc.local.long + "&key=AIzaSyC5OMnpklycsXCq4WzoasPJ11lQ4279ZIg")
    .success(function(response) {
      $scope.fiveoc.local.loc = response.results[response.results.length - 2].formatted_address;
    });

    //re-renders the view
    $scope.$apply();

  });
}]);

$(window).ready(function() {
  $('.forn-location').on('click', function() {
    window.location.assign('https://www.google.com/maps/place/' + $(this).text() + '/');
  });
});


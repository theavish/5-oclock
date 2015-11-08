var myApp = angular.module('5oc', []);

myApp.controller('LocalController', ['$scope', '$http', function($scope, $http) {
  navigator.geolocation.getCurrentPosition(function(pos) {
    console.log(pos)

    //build fiveoc object
    $scope.fiveoc = {
      local:{},
      forn:{}
    };
    
    //set local lat to latitude from location
    $scope.fiveoc.local.lat = pos.coords.latitude;
    
    //set local long to longitude from location
    $scope.fiveoc.local.long = pos.coords.longitude;
    
    //set local time to timestamp from location
    $scope.fiveoc.local.time = new Date().toTimeString(pos.coords.timestamp);

    //set local loc to city from lat/long via google geocode
    $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + $scope.fiveoc.local.lat + "," + $scope.fiveoc.local.long + "&key=AIzaSyC5OMnpklycsXCq4WzoasPJ11lQ4279ZIg")
    .success(function(response) { 
      console.log(response);
      $scope.fiveoc.local.loc = response.results[response.results.length - 3].formatted_address;
    });

    //find 5oclock
    var timeZones = {
      m12: '-1200',
      m11: '-1100',
      m10: '-1000',
      m930: '-0930',
      m09: '-0900',
      m08: '-0800',
      m07: '-0700',
      m06: '-0600',
      m05: '-0500',
      m430: '-0430',
      m04: '-0400',
      m330: '-0330',
      m03: '-0300',
      m02: '-0200',
      m01: '-0100',
      zero: '0000',
      p01: '+0100',
      p02: '+0200',
      p03: '+0300',
      p330: '+0330',
      p04: '+0400',
      p430: '+0430',
      p05: '+0500',
      p530: '+0530',
      p545: '+0545',
      p06: '+0600',
      p630: '+0630',
      p07: '+0700',
      p08: '+0800',
      p830: '+0830',
      p845: '+0845',
      p09: '+0900',
      p930: '+0930',
      p10: '+1000',
      p1030: '+1030',
      p11: '+1100',
      p12: '+1200',
      p1245: '+1245',
      p13: '+1300',
      p14: '+1400'
    };

  //checks local time for timezone
  _.each(timeZones, function(value, key, list) {
    if ( $scope.fiveoc.local.time.toString().includes(timeZones[key]) ) {
      console.log(key);
    }
  });


    //re-renders the view
    $scope.$apply();

  });
}]);

var myApp = angular.module('5oc', []);

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

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
    
    //set local time to timestamp from new Date object
    $scope.fiveoc.local.time = new Date().toTimeString();

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

    var offPlaces = {
      '-12': ['Baker Island', 'Howland Island'],
      '-11': ['American Samoa', 'Hawaii', 'Jarvis Island', 'Kingman Reef', 'Midway Atoll', 'Palmyra Atoll', 'Niue'],
      '-10': ['French Polynesia', 'Cook Islands', 'Aleutian Islands', 'Necker Island', 'Johnston Atoll'],
      '-9.5': ['Marquesas Islands'],
      '-9': ['Gambier Islands', 'Alaska'],
      '-8': ['British Columbia', 'Yukon', 'Clipperton Island', 'Baja California', 'Pitcairn Islands', 'California', 'Idaho', 'Nevada', 'Oregon', 'Washington'],
      '-7': ['Alberta', 'Nunavut', 'Lloydminster', 'Baja California Sur', 'Chihuahua', 'Nayarit', 'Sinaloa', 'Sonora', 'Arizona', 'Colorado', 'Montana', 'Nebraska', 'New Mexico', 'North Dakota', 'South Dakota', 'Texas', 'Utah', 'Wyoming'],
      '-6': ['Belize', 'Manitoba', 'Ontario', 'Saskatchewan', 'Costa Rica', 'Galapagos Islands', 'El Salvador', 'Guatemala', 'Honduras', 'Nicaragua', 'Alabama', 'Arkansas', 'Florida', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Oklahoma', 'Tennessee', 'Wisconsin'],
      '-5': ['Bahamas', 'Acre', 'Amazonas', 'Quebec', 'Colombia', 'Easter Island', 'Cuba', 'Ecuador', 'Haiti', 'Jamaica', 'Quintana Roo', 'Panama', 'Peru', 'Cayman Islands', 'Delaware', 'Washington DC', 'Georgia', 'Maryland', 'Connecticut', 'Massachusetts', 'Maine', 'New Hampshire', 'Rhode Island', 'Vermont', 'New Jersey', 'New York', 'North Carolina', 'Ohio', 'Pennsylvania', 'South Carolina', 'Virginia', 'West Virginia', 'Navassa Island'],
      '-4.5': ['Venezuela'],
      '-4': ['Antigua and Barbuda', 'Barbados', 'Bolivia', 'Brazil', 'New Brunswick', 'Newfoundland', 'Labrador', 'Nova Scotia', 'Prince Edward Island', 'Pituffik', 'Dominica', 'Dominican Republic', 'Guadeloupe', 'Martinique', 'Saint Barthelemy', 'Saint-Martin', 'Grenada', 'Guyana', 'Aruba', 'Bonaire', 'Saba', 'Sint Eustatius', 'Curacao', 'Sint Maarten', 'Paraguay', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Trinidad and Tobago', 'Anguilla', 'Bermuda', 'British Virgin Islands', 'Montserrat', 'Turks and Caicos Islands', 'Puerto Rico', 'US Virgin Islands'],
      '-3': ['Argentina', 'Brazil', 'Chile', 'Greenland', 'French Guiana', 'Saint-Pierre and Miquelon', 'Suriname', 'Falkland Islands', 'Uruguay'],
      '-2': ['Fernando de Noronha', 'South Georgia and the South Sandwich Islands'],
      '-1': ['Cape Verde', 'Ittoqqortoormiit', 'Azores Islands'],
      '0': ['Burkina Faso', 'Cote d\'lvoire', 'Faroe Islands', 'Danmarkshavn', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Iceland', 'Ireland', 'Liberia', 'Mali', 'Mauritania', 'Morocco', 'Portugal', 'Sahrawi Republic', 'Sao Tome and Principe', 'Canary Islands', 'Senegal', 'Sierra Leone', 'Togo', 'United Kingdom'],
      '+1': ['Albania', 'Algeria', 'Andorra', 'Angola', 'Austria', 'Belgium', 'Benin', 'Bosnia and Herzegovina', 'Cameroon', 'Central African Republic', 'Chad', 'Congo-Brazzaville', 'Democratic Republic of the Congo', 'Croatia', 'Czech Republic', 'Denmark', 'Equatorial Guinea', 'France', 'Gabon', 'Germany', 'Hungary', 'Italy', 'Kosovo', 'Liechtenstein', 'Luxembourg', 'Macedonia', 'Malta', 'Monaco', 'Montenegro', 'Namibia', 'Netherlands', 'Niger', 'Nigeria', 'Norway', 'Poland', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Tunisia', 'Gibraltar', 'Vatican City'],
      '+2': ['Botswana', 'Bulgaria', 'Burundi', 'Cyprus', 'Democratic Republic of the Congo', 'Egypt', 'Estonia', 'Finland', 'Greece', 'Israel', 'Jordan', 'Latvia', 'Lebanon', 'Lesotho', 'Lithuania', 'Libya', 'Malawi', 'Moldova', 'Mozambique', 'Palestine', 'Romania', 'Kaliningrad Oblast', 'Rwanda', 'South Africa', 'Swaziland', 'Syria', 'Turkey', 'Ukraine', 'Akrotiri and Dhekelia', 'Zambia', 'Zimbabwe'],
      '+3': ['Bahrain', 'Belarus', 'Comoros', 'Djibouti', 'Eritrea', 'Ethiopia', 'Bassas da India', 'Europa Island', 'Juan de Nova Island', 'Mayotte', 'Abkhazia and South Ossetia', 'Iraq', 'Kenya', 'Kuwait', 'Madagascar', 'Qatar', 'Northern Russia', 'Saudi Arabia', 'Somalia', 'Southern Sudan', 'Sudan', 'Tanzania', 'Uganda', 'Ukraine', 'Yemen'],
      '+3.5': ['Iran'],
      '+4': ['Armenia', 'Azerbaijan', 'Crozet Islands', 'Glorioso Islands', 'Tromelin Island', 'Reunion', 'Georgia', 'Mauritius', 'Oman', 'Seychelles', 'United Arab Emirates'],
      '+4.5': ['Afghanistan'],
      '+5': ['Heard Island', 'McDonald Islands', 'Ile Amsterdam', 'Ile Saint-Paul', 'Kerguelen Islands', 'Kazakhstan', 'Maldives', 'Pakistan', 'Tajikistan', 'Turkmenistan', 'Uzbekistan'],
      '+5.5': ['India', 'Sri Lanka'],
      '+5.75': ['Nepal'],
      '+6': ['Bangladesh', 'Bhutan', 'Kazakhstan', 'Kyrgyzstan', 'British Indian Ocean Territory'],
      '+6.5': ['Cocos Islands', 'Myanmar'],
      '+7': ['Christmas Island', 'Cambodia', 'Indonesia', 'Laos', 'Mongolia', 'Thailand', 'Vietnam'],
      '+8': ['Western Australia', 'Brunei', 'China', 'Indonesia', 'Malaysia', 'Mongolia', 'Philippines', 'Singapore', 'Taiwan'],
      '+8.5': ['Democratic People\'s Republic of Korea'],
      '+8.75': ['Eucla'],
      '+9': ['Indonesia', 'Japan', 'South Korea', 'Palau', 'Timor-Leste'],
      '+9.5': ['Northern Territory of Australia', 'South Australia'],
      '+10': ['New South Wales', 'Queensland', 'Tasmania', 'Victoria', 'Federated States of Micronesia', 'Papua New Guinea', 'Guam', 'Northen Mariana Islands'],
      '+10.5': ['Lord Howe Island'],
      '+11': ['Norfold Island', 'Federated States of Micronesia', 'New Caledonia', 'Autonomous Region of Bougainville', 'Solomon Islands', 'Vanuatu'],
      '+12': ['Wallis and Futuna', 'Fiji', 'Gilbert Islands', 'Marshall Islands', 'Nauru', 'New Zealand', 'Tuvalu', 'Wake Island'],
      '+12.75': ['Chatham Islands'],
      '+13': ['Phoenix Islands', 'Tokelau', 'Samoa', 'Tonga'],
      '+14': ['Line Islands']
    };

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
  //finds five oclock in the world
  _.each(offPlaces, function(value, key, list) {
    if ( getLocalTimeByOffset(key).includes('PM') ) {
      console.log(getLocalTimeByOffset(key), value);
    }
  });

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

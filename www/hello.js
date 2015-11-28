//require("com.pylonproducts.wifiwizard");

var page = tabris.create("Page", {
  title: "Hello, World!",
  topLevel: true
});

var button1 = tabris.create("Button", {
  text: "Native Widgets 1",
  layoutData: {centerX: 0, top: 10}
}).appendTo(page);

var button2 = tabris.create("Button", {
  text: "Native Widgets 2",
  layoutData: {centerX: 0, top: 100}
}).appendTo(page);

var label = tabris.create("TextView", {
  font: "24px",
  layoutData: {centerX: 0, top: [button2, 50]}
}).appendTo(page);


button1.on("select", function() {
//  WifiWizard.getCurrentSSID(ssidHandler, fail);

//  if (navigator.geolocation)
  if (cordova.plugins.locationServices.geolocation)
  { 
//    navigator.geolocation.getCurrentPosition(onSuccess, onError,
    cordova.plugins.locationServices.geolocation.getCurrentPosition(
       onSuccess, onError,
       { maximumAge: 500, timeout: 5000, enableHighAccuracy: true });
  }
  else
  {
    label.set("text", "UNDEFINED cordova.plugins.locationServices.geolocation");
  }
//  label.set("text", "Totally Rock!");
});

button2.on("select", function() {
//  WifiWizard.getScanResults(listHandler, fail);
  WifiWizard.getScanResults({numLevels: false}, listHandler, fail);
//  label.set("text", "Totally Rock!");
});

page.open();

function ssidHandler(s) {
  label.set("text", "Current SSID : " + s);
}

function fail(e) {
  label.set("text", "ERROR : " + e);
}


Math.log10 = Math.log10 || function(x) {
  return Math.log(x) / Math.LN10;
};


function listHandler(s) {
  var networks = "";
  
  for (var i = 0; i < s.length; i++)
  {
    var exp = 0.0;
    var res = 0.0;
    
    exp = ( 27.55 - (20 * Math.log10(s[i].frequency)) + Math.abs(s[i].level) ) / 20;
    res = Math.pow(10.0, exp);
    networks += "SSID = " + s[i].SSID
                  + "\r\n   level        = " + s[i].level
                    + "      (" + res + " m)"
                  + "\r\n   BSSID        = " + s[i].BSSID
                  + "\r\n   frequency    = " + s[i].frequency
                  + "\r\n   capabilities = " + s[i].capabilities
                  + "\r\n   timestamp    = " + s[i].timestamp
                  + "\r\n";
  }
  
//  label.set("text", "Scan Result : " + s.length + " element(s)\r\n" + JSON.stringify(s));
  label.set("text", "Scan Result : " + s.length + " element(s)\r\n" + networks);
}

//=== GEOLOCATION ===//
function onSuccess(position) {
  var geopos = "";

  geopos = 'Latitude: '          + position.coords.latitude          + '\n' +
           'Longitude: '         + position.coords.longitude         + '\n' +
           'Altitude: '          + position.coords.altitude          + '\n' +
           'Accuracy: '          + position.coords.accuracy          + '\n' +
           'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
           'Heading: '           + position.coords.heading           + '\n' +
           'Speed: '             + position.coords.speed             + '\n' +
           'Timestamp: '         + position.timestamp                + '\n';

  label.set("text", geopos);
};

function onError(error) {
  var geopos = "";

  geopos = 'code: '    + error.code    + '\n' +
           'message: ' + error.message + '\n';

  label.set("text", geopos);
}

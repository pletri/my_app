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
  WifiWizard.getCurrentSSID(ssidHandler, fail);
//  label.set("text", "Totally Rock!");
});

button2.on("select", function() {
  WifiWizard.getScanResults(listHandler, fail);
//  label.set("text", "Totally Rock!");
});

page.open();

function ssidHandler(s) {
  label.set("text", "Current SSID : " + s);
}

function fail(e) {
  label.set("text", "ERROR : " + e);
}

function listHandler(s) {
  label.set("text", "Scan Result : " + JSON.stringify(s));
}
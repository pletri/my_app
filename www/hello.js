require("com.pylonproducts.wifiwizard");

var page = tabris.create("Page", {
  title: "Hello, World!",
  topLevel: true
});

var button = tabris.create("Button", {
  text: "Native Widgets",
  layoutData: {centerX: 0, top: 100}
}).appendTo(page);

var label = tabris.create("TextView", {
  font: "24px",
  layoutData: {centerX: 0, top: [button, 50]}
}).appendTo(page);

button.on("select", function() {
  WifiWizard.getCurrentSSID(ssidHandler, fail);
//  label.set("text", "Totally Rock!");
});

page.open();

function ssidHandler(s) {
  labet.set("Current SSID : " + s);
}

function fail(e) {
  label.set("ERROR : " + e);
}
var mic

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b)
}

function sendColor(color) {
  var http = new XMLHttpRequest();
  var url = "http://toilet.csh.rit.edu/set";
  var params = "color=" + color;
  http.open("POST", url, true);

  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.send(params);
}

function preload() {
  frameRate(10)
}

function setup() {
  createCanvas(200, 300)
  mic = new p5.AudioIn();
  mic.start()
}

function draw() {
  background(255)
  var vol = mic.getLevel()
  fill(127)
  stroke(0)

  ellipse(width/2, height/2, 10+vol*200, 10+vol*200)
  var hex = rgbToHex(Math.round(vol * 255), Math.round(vol * 255), Math.round(vol * 255))
  sendColor(hex)
}

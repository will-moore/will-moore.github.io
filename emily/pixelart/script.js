
var penColor = "black";

function setPixelColor(pixel) {
  pixel.style.backgroundColor = penColor;
}

function setPenColor(pen) {
  penColor = pen.style.backgroundColor;
  document.getElementById('name').innerHTML = penColor;
  document.getElementById('penColor').style.backgroundColor = penColor;
}
console.log('Loading...');

let table;
let canvasWidth = 500;
let canvasHeight = 500;
let circleWidth = 60;
let circleColor = (100, 100, 100);
let textSize = 12;
let textColor = 'white';
let textDisplacementX = 20;
let textDisplacementY = 5;

// https://p5js.org/reference/#/p5/loadTable
function preload() {
  table = loadTable('future_cities_data_truncated.csv', 'csv', 'header');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  colorMode(HSB, 100);
}

function draw() {
  background('black');

  for (let i = 0; i < table.getRowCount(); i++) {
    let longitude = parseFloat(table.get(i, 'Longitude'));
    let latitude = parseFloat(table.get(i, 'Latitude'));
    let meanTemp = parseFloat(table.get(i, 'Annual_Mean_Temperature'));
    let cityName = table.get(i, 'current_city');

    let positionX = mapLongitudeX(longitude);
    let positionY = mapLatitudeY(latitude);
    let circleSize = mapTempSize(meanTemp, circleWidth);

    drawCircles(circleColor, positionX, positionY, circleSize);
    drawLabel(textColor, cityName, positionX, textDisplacementX, positionY, textDisplacementY);

  //console.log(positionX);
  }
}

function drawCircles(color, x, y, size) {
  fill(color);
  //noStroke();
  circle(x, y, size);
}

function mapLongitudeX(x) {
  let output = map(x, -90, 120, -320, canvasWidth+140);
  return output;
}

function mapLatitudeY(y) {
  let output = map(y, 0, 70, canvasHeight+400, -100);
  return output;
}

function mapTempSize(temp, size) {
  let output = map(temp, 0, 30, 0, size);
  return output;
    }

function drawLabel(color,t, x, xd, y, yd) {
  fill(color);
  let label = `${t}`;
  text(label, x + xd, y + yd);
}
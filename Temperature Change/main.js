async function readJson(path) {
  const response = await fetch(path);
  const data = await response.json();
  return data;
}

async function init() {
  // json file generated with https://csvjson.com/csv2json
  const data = await readJson('future_cities_data.json');
  let sourceData = data.map((d) => {
    return {
      cityName: d['current_city'],
      annualMeanTemperature: d['Annual_Mean_Temperature'],
      annualMeanTemperatureFuture: d['future_Annual_Mean_Temperature'],
    };
  });

  console.log('sourceData: ', sourceData);

  const Xdisplacement = 155;
  const circlesXcoordinate = 100;
  const circlesYcoordinate = 100;
  const dataValueScaling = 4;

  // Create canvas
  const svg = d3 // Variable linking to D3 library
    .select('#d3') // Selects ID from html file
    .append('svg') // Creates svg
    .attr("width", 1400) // Width of svg
    .attr("height", 400); // Height of svg

  // enters data into function
  const circlesAnnual = svg.selectAll('circlesAnnual').data(sourceData).enter();
  const circlesFuture = svg.selectAll('circlesFuture').data(sourceData).enter();
  const textLabel = svg.selectAll('textLabel').data(sourceData).enter();

  // Creates circles for future annual mean temperature
  circlesAnnual
    .append('circle')
    .attr('cx', (value, index) => {
      return index * Xdisplacement + circlesXcoordinate;
    })
    .attr('cy', circlesYcoordinate)
    .attr('r', (value, index) => {
      return value.annualMeanTemperatureFuture * dataValueScaling;
    })
    .attr('id', 'colorSecondary');

  // Creates circles for annual mean temperature
  circlesFuture
    .append('circle')
    .attr('cx', (value, index) => {
      return index * Xdisplacement + circlesXcoordinate;
    })
    .attr('cy', circlesYcoordinate)
    .attr('r', (value, index) => {
      return value.annualMeanTemperature * dataValueScaling;
    })
    .attr('id', 'colorMain');

  // Create text labels
  textLabel
    .append('text')
    .attr('x', (value, index) => {
      return index * Xdisplacement + 55;
    })
    .attr('y', 200)
    .attr('id', 'textColorMain')
    .text((value, index) => {
      return value.cityName;
    })

}

init();
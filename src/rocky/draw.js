var layers = [
  require('./clearScreen'),
  require('./drawBlocks'),
  require('./drawAnalogue'),
];

function draw(event) {
  var ctx = event.context;
  var d = new Date();

  layers.forEach(function(layer) {
    layer(ctx, d);
  });
}

module.exports = draw;
var MsInInterval = {
  second: 1000,
  minute: 1000 * 60,
  hour:   1000 * 60 * 60,
};

var config = {
  getUpHour: 7,
  goToBedHour: 23,
  totalBlocks: 100,
};

var getUpTimeInMs = config.getUpHour * MsInInterval.hour;
var goToBedTimeInMs = config.goToBedHour * MsInInterval.hour;
var totalAwakeTimeInMs = goToBedTimeInMs - getUpTimeInMs;
var totalBlocksPerDay = config.totalBlocks;
var msInBlock = totalAwakeTimeInMs / totalBlocksPerDay;

function drawBlocks(ctx, d) {
  var numberOfBlocks = calculateBlocks(d);
  drawNBlocks(ctx, numberOfBlocks);
  drawBlockCount(ctx, numberOfBlocks);
}

function calculateBlocks(d) {
  var msSinceGetUp = getMsSinceMidnight(d) - getUpTimeInMs;
  var rawBlockCount = msSinceGetUp / msInBlock;
  return Math.min(totalBlocksPerDay, Math.max(0, rawBlockCount));
}

function drawNBlocks(ctx, blocks) {
  var dimensions = getPixelDimensions(ctx);
  
  var used = Math.floor(blocks);
  for (var block=1; block<=used; block++) {
    drawBlock(block, ctx, dimensions, false);
  }
  
  if (blocks > used) {
    drawBlock(used+1, ctx, dimensions, true);
  }
}

function drawBlock(block, ctx, dimensions, isCurrentBlock) {
  var blocksPerSide = 10;
  var blockMargin = 1;
  var activeCellBorderWidth = 2;
  
  // (Switch to zero based)
  var col = (block - 1) % blocksPerSide;
  var row = Math.floor((block - 1) / blocksPerSide);

  var x = col * dimensions.width / blocksPerSide;
  var y = row * dimensions.height / blocksPerSide;
  var w = (dimensions.width / blocksPerSide) - blockMargin;
  var h = (dimensions.height / blocksPerSide) - blockMargin;

  ctx.fillStyle = 'blue';
  ctx.fillRect(x,y,w,h);
  
  if (isCurrentBlock) {
    // Hollow out the current block to make it an outline
    ctx.fillStyle = 'black';
    ctx.fillRect(
      x+activeCellBorderWidth,
      y+activeCellBorderWidth,
      w-(2*activeCellBorderWidth),
      h-(2*activeCellBorderWidth)
    );
  }
}

function drawBlockCount(ctx, blocks) {
  var dimensions = getPixelDimensions(ctx);
 
  var x = dimensions.width / 2;
  var y = dimensions.height * 3 / 4;
  
  var used = Math.floor(blocks);
  
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f1fdff';
  ctx.font = '21px Roboto';
  ctx.fillText(used + ' / 100', x,y);
}

function getMsSinceMidnight(d) {
  var e = new Date(d);
  return d - e.setHours(0,0,0,0);
}

function getPixelDimensions(ctx) {
  return {
    width: ctx.canvas.unobstructedWidth,
    height: ctx.canvas.unobstructedHeight,
  };
}

module.exports = drawBlocks;
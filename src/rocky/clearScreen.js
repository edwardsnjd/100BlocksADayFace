function clearScreen(ctx) {  
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
}

module.exports = clearScreen;
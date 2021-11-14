function play() {
  raceGame("#game_canvas", 800, 600, 20, 0.05)
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function raceGame(elid, width, height, speed, strength) {
  var canvas = document.querySelector(elid),
    ctx = canvas.getContext("2d"),
    pos = 0,
    blocks = [];
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = "#FF7F00";
  var game = setInterval(function() {
    if (Math.random() < strength) blocks.push([Math.random() * (width - 10), -10]);
    ctx.clearRect(0, 0, width, height);
    ctx.fillRect(pos, height - 50, 10, 40);
    for (var i = 0; i < blocks.length; i++) {
      ctx.fillRect(blocks[i][0], blocks[i][1], 10, 10);
      if (blocks[i][1] > height - 60 && blocks[i][1] < height - 10 && Math.abs(pos - blocks[i][0]) < 10) {
        clearInterval(game);
        alert("Game over. You have " + Math.floor(1000 * strength) + " points.");
      }
      if (blocks[i][1] > height - 5) {
        blocks.splice(i, 1);
        i--;
      } else {
        blocks[i][1] += 5;
      }
    }
    strength += 0.001;
  }, speed);
  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    pos = mousePos.x;
  }, false);
}

play_but.addEventListener("click", play);
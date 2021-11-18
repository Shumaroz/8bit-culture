function play() {
  pongGame("#game_canvas2", 600, 450, 0.65)
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function pongGame(elid, width, height, speed) {
  var canvas = document.querySelector(elid),
    ctx = canvas.getContext("2d"),
    pl_pos = height / 2 - 25,
    ai_pos = pl_pos,
    x = 11,
    y = pl_pos + 25,
    angle = 0,
    score = 0;
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = "#FF7F00";
  angle = Math.random() / 2;
  if (Math.random() > 0.5)
    angle *= -1;
  // Бесконечный вызов функцции с интервалом speed
  ctx.font = "30px ArialBlack";
  var game = setInterval(function() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillRect(0, pl_pos, 10, 50);
    ctx.fillRect(width - 10, ai_pos, 10, 50);
    ctx.fillRect(x, y, 10, 10);
    ctx.fillText(score, width / 2, 30);
    if ((x <= 10 && y >= pl_pos && y <= pl_pos + 50) || (x >= width - 20 && y >= ai_pos && y <= ai_pos + 50)) {
      score++;
      if (score <= 30)
      	speed *= -1.05;
      else
	speed *= -1;
      angle = Math.random() * speed / 2;
      if (Math.random() > 0.5)
        angle *= -1;
    }
    if (y <= 0 || y >= height - 10) {
      angle *= -1;
    }
    if (Math.random() < 0.5 && !(y >= ai_pos + 10 && y <= ai_pos + 40)) {
      if (y <= ai_pos + 25)
        ai_pos--;
      else
        ai_pos++;
    }
    if (x < -10 || x > width) {
      clearInterval(game);
    }
    x += speed;
    y += angle;
  }, speed);
  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    pl_pos = mousePos.y - 25;
  }, false);
}

play_but2.addEventListener("click", play);
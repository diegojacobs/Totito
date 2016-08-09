var turn = 1;
var board = [ [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0] ];

var game = document.getElementById('game');
var html = '<div class="board" id="board">';
html += '<div class="section s1x1" id="1x1"></div>';
html += '<div class="section s1x2" id="1x2"></div>';
html += '<div class="section s1x3" id="1x3"></div>';
html += '<div class="section s2x1" id="2x1"></div>';
html += '<div class="section s2x2" id="2x2"></div>';
html += '<div class="section s2x3" id="2x3"></div>';
html += '<div class="section s3x1" id="3x1"></div>';
html += '<div class="section s3x2" id="3x2"></div>';
html += '<div class="section s3x3" id="3x3"></div>';
html += '</div>';
html += '<div class="turn" id="turn"></div>';
html += '<div class="winner-section" id="winner-section">';
html += '<h1 id="winner"></h1>';
html += '<button onclick="restart()">Reset</button>';
html += '';
game.innerHTML = html;

for (var column = 1; column <= 3; column++) {
  for (var row = 1; row <= 3; row++) {
    document.getElementById('' + column + 'x' + row).onclick = on_click;
  }
}

function on_click() {
  var state = {id: this.id, player: turn};
  render(state);
}


function render(state){

  var row = state.id.split('x')[0] - 1;
  var column = state.id.split('x')[1] - 1;


  if (board[row][column] !== 0) {
    return;
  }

  board[row][column] = turn;

  turn = marcar_jugada(state.id, state.player)
  var resultado = verificar_jugada(row, column);

  if (!resultado) {
    return;
  }

  finalizar_juego(resultado);

  var result = document.getElementById('winner-section');
  var grid = document.getElementById('board');
  grid.style.display = 'none';
  result.style.display = 'block';
}
function evaluar_empate() {
  for (var fila = 0; fila <= 2; fila++) {
    for (var columna = 0; columna <= 2; columna++) {
      if (board[fila][columna] === 0) {
        return false;
      }
    }
  }

  return true;
}

function verificar_jugada(column, row) {
  if (evaluar_empate()){
    return -1;
  }

  if (board[column][0] === board[column][1] && board[column][1] === board[column][2]) {
    return board[column][row];
  }

  if (board[0][row] === board[1][row] && board[1][row] === board[2][row]) {
    return board[column][row];
  }

  var center = board[1][1];

  if (center !== 0) {

    if (board[0][0] === center && center === board[2][2]) {
      return board[column][row];
    }

    if (board[0][2] === center && center === board[2][0]) {
      return board[column][row];
    }
  }

  return null;
}

function marcar_jugada(board_element_id, turn) {
  var board_element = document.getElementById(board_element_id);

  if (turn === 1) {
    board_element.style.color = 'blue';
    board_element.innerHTML = 'x';
    turno_jugador = 2;
  } else {
    board_element.style.color = 'red';
    board_element.innerHTML = 'o';
    turno_jugador = 1;
  }

  return turno_jugador;
}

function finalizar_juego(resultado) {
  var fin_juego = document.getElementById("winner");
  fin_juego.innerHTML = "Tie";

  if (resultado !== -1) {
    fin_juego.innerHTML = "Winner:  Player " + resultado;
  }

  return resultado;
}

function restart() {
    location.reload();
}
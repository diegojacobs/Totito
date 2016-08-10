var state = {
  turn: 1,
  board: [ [0, 0, 0],
           [0, 0, 0],
           [0, 0, 0] ]
};

var game = document.getElementById('game');

game.innerHTML = render(state);

for (var column = 1; column <= 3; column++) {
  for (var row = 1; row <= 3; row++) {
    document.getElementById('' + column + 'x' + row).onclick = onClick;
  }
}

document.getElementById('restart').onclick = restart;

function render(state){
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
  html += '<button id="restart" onclick="restart()">Reset</button>';
  html += '';
  return html;
}
function onClick() {
  evaluate(this.id, state.turn);
}

function evaluate(section, turn){

  var row = section.split('x')[0] - 1;
  var column = section.split('x')[1] - 1;


  if (state.board[row][column] !== 0) {
    return;
  }

  state.board[row][column] = state.turn;

  state.turn = printPlay(section, state.turn)
  var result = check(row, column);

  if (!result) {
    return;
  }

  endGame(result);

  var winner = document.getElementById('winner-section');
  var board = document.getElementById('board');
  board.style.display = 'none';
  winner.style.display = 'block';
}

function isTie() {
  for (var row = 0; row <= 2; row++) {
    for (var column = 0; column <= 2; column++) {
      if (state.board[row][column] === 0) {
        return false;
      }
    }
  }
  return true;
}

function check(column, row) {
  if (isTie()){
    return -1;
  }

  if (state.board[column][0] === state.board[column][1] && state.board[column][1] === state.board[column][2]) {
    return state.board[column][row];
  }

  if (state.board[0][row] === state.board[1][row] && state.board[1][row] === state.board[2][row]) {
    return state.board[column][row];
  }

  var center = state.board[1][1];

  if (center !== 0) {

    if (state.board[0][0] === center && center === state.board[2][2]) {
      return state.board[column][row];
    }

    if (state.board[0][2] === center && center === state.board[2][0]) {
      return state.board[column][row];
    }
  }

  return null;
}

function printPlay(board_element_id, turn) {
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

function endGame(resultado) {
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
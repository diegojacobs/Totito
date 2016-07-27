/*

state = 0: red
state = 1: yellow
state = 2: green

*/

// Modelo / estado
var state = 0;

var viewport = document.getElementById("viewport");
var changeTrigger = document.getElementById("change");

changeTrigger.addEventListener("click", function(){
  if(state === 0){
    state = 2;
  }
  else if(state === 1){
    state = 0;
  }
  else{
    state = 1;
  }

  viewport.innerHTML = render(state);
});


function render(state){
  var html = "";

  html += '<div class="traffic-light">';

  if(state === 0){
    html += '<div class="red light"></div>';
  }
  else{
    html += '<div class="red light off"></div>';
  }

  if(state === 1){
    html += '<div class="yellow light"></div>';
  }
  else{
    html += '<div class="yellow light off"></div>';
  }

  if(state === 2){
    html += '<div class="green light"></div>';
  }
  else{
    html += '<div class="green light off"></div>';
  }

  html += '</div>';

  return html;
}

viewport.innerHTML = render(state);
knight = document.getElementById('g1')
pawn = document.getElementById('f2')
bishop = document.getElementById('c1')

const knightMoves = ['f3'];
const pawnMoves = ['f3', 'f4'];
const bishopMoves = ['g4'];

const moves = new Map();
moves.set(knight, knightMoves);
moves.set(pawn, pawnMoves);
moves.set(bishop, bishopMoves);

dot = document.createElement('td');
img = new Image();
img.src = "img/red_dot.jpg";
dot.appendChild(img);

blank = document.createElement('td');

knight.addEventListener('click', knightMove, true);
pawn.addEventListener('click', pawnMove, true);

// pawn.addEventListener('click', pawnMove, true);
// dot.addEventListener('click', pawnGoto, true);

function knightMove(){
  dots[0] = show_dot(knight, 'f3');
}
function pawnMove(){
  dots[0] = show_dot(pawn, 'f3');
  dots[1] = show_dot(pawn, 'f4');
}

function move(piece, dot){
  piece_copy = piece.cloneNode(true);
  piece_copy.className = dot.className;
  piece_copy.id = dot.id;
  dot.replaceWith(piece_copy);
  blank.className = piece.className;
  piece.replaceWith(blank);
}

function show_dot(piece, location){
  dot_copy = dot.cloneNode(true);
  dest = document.getElementById(location);
  dot_copy.className = dest.className;
  dot_copy.id = dest.id;
  dot_copy.addEventListener('click', function(){move(piece, this)});
  dest.replaceWith(dot_copy);
  return dot_copy;
}

function stop(){

}
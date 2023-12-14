knight = document.getElementById('g1')
pawn = document.getElementById('f2')
bishop = document.getElementById('c1')

dot = document.createElement('td');
img = new Image();
img.src = "img/red_dot.jpg";
dot.appendChild(img);

blank = document.createElement('td');

knight.addEventListener('click', knightMove, true);
dot.addEventListener('click', knightGoto, true);

function knightMove(){
  console.log("clicked");
  dest = document.getElementById('f3');                 //Support for later change to map implementation (i.e., possible destinations stored and retrieved from map queries)
  dot.className = dest.className;
  dot.id = dest.id;
  dest.replaceWith(dot);  
}

function knightGoto(){
  knight_copy = knight.cloneNode(true);
  knight_copy.className = dot.className;
  knight_copy.id = dot.id;
  dot.replaceWith(knight_copy);
  blank.className = knight.className;
  knight.replaceWith(blank);
}
/*knight = document.getElementById('g1')
pawn = document.getElementById('f2')
bishop = document.getElementById('c1')

dot = document.createElement('td');
img = new Image();
img.src = "img/red_dot.jpg";
dot.appendChild(img);

blank = document.createElement('td');

knight.addEventListener('click', knightMove);
dot.addEventListener('click', knightGoto);

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
*/

/*document.addEventListener('click', checkValidMove);

function checkValidMove(piece, dest){
  if(piece.id == dest.id){
    return false;
  }
  if(piece.className == dest.className){
    return false;
  }
  return true;
}
*/

let selectedPieceName = null;
let pieceColor = null;
let pieceSquare = null;
let selectedSquare = null;

document.addEventListener('mousedown', startDrag);
document.addEventListener('mouseup', endDrag);

function startDrag(event) {
  event.preventDefault();
  selectedSquare = event.target;
  console.log(selectedSquare);
  if (selectedSquare.nodeName === 'IMG') {
    selectedPieceName = selectedSquare.id;
    pieceColor = selectedSquare.className;
    console.log('Selected piece is:', selectedPieceName);
    console.log('Selected piece color is:', pieceColor);
    // Get the square element that contains the selected piece
    pieceSquare = selectedSquare.parentNode.id;
    console.log('Selected piece is on square:', pieceSquare);
  }
}

function endDrag(event) {
  console.log('endDrag called, event.target:', event.target);
  let destPiece = null;
  let destSquare = null;
  if(event.target.nodeName == 'IMG'){
    destPiece = event.target;
    destSquare = event.target.parentNode.id;
    console.log('Destination piece is:', destPiece);
    console.log('Destination square is:', destSquare)
    if(checkValidMove(destPiece,destSquare)){
      event.target.parentNode.replaceChild(selectedSquare,event.target);
    }
  }
  else {
    destSquare = event.target.id;
    console.log('Destination square is:', destSquare);
    if (checkValidMove(destPiece, destSquare)) {
      event.target.appendChild(selectedSquare);
    }
  }
  

}

function checkValidMove(destPiece,destSquare){
  let validSquares=[];

  // Check if piece is moving to same square
  if (pieceSquare === destSquare) {
    return false;
  }

  // Check if piece is same color as destination piece
  if (destPiece && pieceColor === destPiece.className) {
    return false;
  }

  // Check if there is a piece on the destination square
  if(destPiece!==null){
    
    switch(selectedPieceName){  
      case "knight":
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + 2) + String.fromCharCode(pieceSquare.charCodeAt(1) + 1));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + 2) + String.fromCharCode(pieceSquare.charCodeAt(1) - 1));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - 2) + String.fromCharCode(pieceSquare.charCodeAt(1) + 1));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - 2) + String.fromCharCode(pieceSquare.charCodeAt(1) - 1));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + 1) + String.fromCharCode(pieceSquare.charCodeAt(1) + 2));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + 1) + String.fromCharCode(pieceSquare.charCodeAt(1) - 2));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - 1) + String.fromCharCode(pieceSquare.charCodeAt(1) + 2));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - 1) + String.fromCharCode(pieceSquare.charCodeAt(1) - 2));
        console.log(validSquares);
        if(validSquares.includes(destSquare)){
          return true;
        }
        break;
      case "pawn":
        if(pieceColor==="black"){
          if(destSquare===String.fromCharCode(pieceSquare.charCodeAt(0) - 1) + String.fromCharCode(pieceSquare.charCodeAt(1) - 1)||destSquare===String.fromCharCode(pieceSquare.charCodeAt(0) + 1) + String.fromCharCode(pieceSquare.charCodeAt(1) - 1)){
            return true;
          }
        }
        else{
          if(destSquare===String.fromCharCode(pieceSquare.charCodeAt(0) - 1) + String.fromCharCode(pieceSquare.charCodeAt(1) + 1)||destSquare===String.fromCharCode(pieceSquare.charCodeAt(0) + 1) + String.fromCharCode(pieceSquare.charCodeAt(1) + 1)){
            return true;
          }
        }
        break;
      case "bishop":

      case "rook":

      case "queen":

      case "king":

      default:
        return false;
    }
  }
  else{
    switch(selectedPieceName){  
      case "knight":
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + 2) + String.fromCharCode(pieceSquare.charCodeAt(1) + 1));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + 2) + String.fromCharCode(pieceSquare.charCodeAt(1) - 1));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - 2) + String.fromCharCode(pieceSquare.charCodeAt(1) + 1));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - 2) + String.fromCharCode(pieceSquare.charCodeAt(1) - 1));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + 1) + String.fromCharCode(pieceSquare.charCodeAt(1) + 2));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + 1) + String.fromCharCode(pieceSquare.charCodeAt(1) - 2));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - 1) + String.fromCharCode(pieceSquare.charCodeAt(1) + 2));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - 1) + String.fromCharCode(pieceSquare.charCodeAt(1) - 2));
        console.log(validSquares);
        if(validSquares.includes(destSquare)){
          return true;
        }
        break;
      case "pawn":
        if(pieceColor==="black"){
          if(pieceSquare.charAt(1)==='7'){
            validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0)) + String.fromCharCode(pieceSquare.charCodeAt(1) - 2));
          }
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0)) + String.fromCharCode(pieceSquare.charCodeAt(1) - 1));
        }
        else{
          if(pieceSquare.charAt(1)==='2'){
            validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0)) + String.fromCharCode(pieceSquare.charCodeAt(1) + 2));
          }
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0)) + String.fromCharCode(pieceSquare.charCodeAt(1) + 1));
        }
        if(validSquares.includes(destSquare)){
          return true;
        }
        break;
      case "bishop":

      case "rook":

      case "queen":

      case "king":

      default:
        return false;

    }
  }
}

/*function interceptingPiece(startSquare, endSquare){
  if(startSquare.charAt(0)===endSquare.charAt(0)){
    for(let i=startSquare.charAt(1);i<endSquare.charAt(1);i++){
      if(document.getElementById(startSquare.charAt(0)+i).firstChild!==null){
        return true;
      }
    }
  }
}*/
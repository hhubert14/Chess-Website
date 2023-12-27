let selectedPieceName = null;
let pieceColor = null;
let pieceSquare = null;
let selectedSquare = null;
let validMoves = [];

const movable = ['g1', 'f2', 'c1']

showMovable();
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
    movable.forEach((square) =>{
        if(square !== pieceSquare){
            unhighlight(square);
        }
    });
    getValidMoves(selectedPieceName);
    validMoves.forEach((loc) => {
        highlight(loc);
    })
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
    console.log('Destination square is:', destSquare);
    if(checkValidMove(destPiece,destSquare)){
      event.target.parentNode.replaceChild(selectedSquare,event.target);
    }
  }
  else if(event.target.firstChild===null) {
    destSquare = event.target.id;
    console.log('Destination square is:', destSquare);
    if (checkValidMove(destPiece, destSquare)) {
      event.target.appendChild(selectedSquare);
    }
  }
  validMoves.forEach((loc) => unhighlight(loc));
  unhighlight(pieceSquare);
  validMoves = [];
}

function showMovable(){
    movable.forEach((square)=>{highlight(square)});
}

function highlight(square){
    updatedSquare = document.getElementById(square);
        if(updatedSquare.className === 'dark'){
            updatedSquare.className = 'dark-highlight';
        }
        else if(updatedSquare.className === 'light'){
            updatedSquare.className = 'light-highlight';
        }
}

function unhighlight(square){
    updatedSquare = document.getElementById(square);
        if(updatedSquare.className === 'dark-highlight'){
            updatedSquare.className = 'dark';
        }
        else if(updatedSquare.className === "light-highlight"){
            updatedSquare.className = 'light';
        }
}

function getValidMoves(pieceName){
    switch(pieceName){
        case 'knight':
            validMoves.push('f3');
            break;
        case 'pawn':
            validMoves.push('f3', 'f4');
            break;
        case 'bishop':
            validMoves.push('g5');
            break;
    }
}

function checkValidMove(destPiece,destSquare){
    let validSquares = [];

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
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + i) + String.fromCharCode(pieceSquare.charCodeAt(1) + i));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + i) + String.fromCharCode(pieceSquare.charCodeAt(1) - i));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - i) + String.fromCharCode(pieceSquare.charCodeAt(1) + i));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - i) + String.fromCharCode(pieceSquare.charCodeAt(1) - i));
        }
        console.log(validSquares);
        if(validSquares.includes(destSquare)){
          if(interceptingPiece(pieceSquare,destSquare)){
            return false;
          }
          return true;
        }
        break;
      case "rook":
        for(let i = 1; i < 8; i++) {
          validSquares.push(pieceSquare.charAt(0) + (Number(pieceSquare.charAt(1)) + i));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + i) + String.fromCharCode(pieceSquare.charCodeAt(1)));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - i) + String.fromCharCode(pieceSquare.charCodeAt(1)));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(pieceSquare.charAt(0) + (Number(pieceSquare.charAt(1)) - i));
        }
        console.log(validSquares);
        if(validSquares.includes(destSquare)){
          if(interceptingPiece(pieceSquare,destSquare)){
            return false;
          }
          return true;
        }
        break;
      case "queen":
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + i) + String.fromCharCode(pieceSquare.charCodeAt(1) + i));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + i) + String.fromCharCode(pieceSquare.charCodeAt(1) - i));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - i) + String.fromCharCode(pieceSquare.charCodeAt(1) + i));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - i) + String.fromCharCode(pieceSquare.charCodeAt(1) - i));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0)) + String.fromCharCode(pieceSquare.charCodeAt(1) + i));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + i) + String.fromCharCode(pieceSquare.charCodeAt(1)));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - i) + String.fromCharCode(pieceSquare.charCodeAt(1)));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0)) + String.fromCharCode(pieceSquare.charCodeAt(1) - i));
        }
        console.log(validSquares);
        if(validSquares.includes(destSquare)){
          if(interceptingPiece(pieceSquare,destSquare)){
            return false;
          }
          return true;
        }
        break;
      case "king":
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + 1) + String.fromCharCode(pieceSquare.charCodeAt(1) + 1));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + 1) + String.fromCharCode(pieceSquare.charCodeAt(1) - 1));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - 1) + String.fromCharCode(pieceSquare.charCodeAt(1) + 1));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - 1) + String.fromCharCode(pieceSquare.charCodeAt(1) - 1));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + 1) + String.fromCharCode(pieceSquare.charCodeAt(1)));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - 1) + String.fromCharCode(pieceSquare.charCodeAt(1)));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0)) + String.fromCharCode(pieceSquare.charCodeAt(1) + 1));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0)) + String.fromCharCode(pieceSquare.charCodeAt(1) - 1));
        if(validSquares.includes(destSquare)){
          return true;
        }
        break;
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
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + i) + String.fromCharCode(pieceSquare.charCodeAt(1) + i));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + i) + String.fromCharCode(pieceSquare.charCodeAt(1) - i));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - i) + String.fromCharCode(pieceSquare.charCodeAt(1) + i));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - i) + String.fromCharCode(pieceSquare.charCodeAt(1) - i));
        }
        console.log(validSquares);
        if(validSquares.includes(destSquare)){
          if(interceptingPiece(pieceSquare,destSquare)){
            return false;
          }
          return true;
        }
      case "rook":
        for(let i = 1; i < 8; i++) {
          validSquares.push(pieceSquare.charAt(0) + (Number(pieceSquare.charAt(1)) + i));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + i) + String.fromCharCode(pieceSquare.charCodeAt(1)));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - i) + String.fromCharCode(pieceSquare.charCodeAt(1)));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(pieceSquare.charAt(0) + (Number(pieceSquare.charAt(1)) - i));
        }
        console.log(validSquares);
        if(validSquares.includes(destSquare)){
          if(interceptingPiece(pieceSquare,destSquare)){
            return false;
          }
          return true;
        }
      case "queen":
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + i) + String.fromCharCode(pieceSquare.charCodeAt(1) + i));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + i) + String.fromCharCode(pieceSquare.charCodeAt(1) - i));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - i) + String.fromCharCode(pieceSquare.charCodeAt(1) + i));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - i) + String.fromCharCode(pieceSquare.charCodeAt(1) - i));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0)) + String.fromCharCode(pieceSquare.charCodeAt(1) + i));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + i) + String.fromCharCode(pieceSquare.charCodeAt(1)));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - i) + String.fromCharCode(pieceSquare.charCodeAt(1)));
        }
        for(let i = 1; i < 8; i++) {
          validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0)) + String.fromCharCode(pieceSquare.charCodeAt(1) - i));
        }
        console.log(validSquares);
        if(validSquares.includes(destSquare)){
          if(interceptingPiece(pieceSquare,destSquare)){
            return false;
          }
          return true;
        }
      case "king":
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + 1) + String.fromCharCode(pieceSquare.charCodeAt(1) + 1));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + 1) + String.fromCharCode(pieceSquare.charCodeAt(1) - 1));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - 1) + String.fromCharCode(pieceSquare.charCodeAt(1) + 1));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - 1) + String.fromCharCode(pieceSquare.charCodeAt(1) - 1));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) + 1) + String.fromCharCode(pieceSquare.charCodeAt(1)));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0) - 1) + String.fromCharCode(pieceSquare.charCodeAt(1)));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0)) + String.fromCharCode(pieceSquare.charCodeAt(1) + 1));
        validSquares.push(String.fromCharCode(pieceSquare.charCodeAt(0)) + String.fromCharCode(pieceSquare.charCodeAt(1) - 1));
        if(validSquares.includes(destSquare)){
          return true;
        }
      default:
        return false;

    }
  }
}

function interceptingPiece(startSquare, endSquare){
  if(startSquare.charAt(0)===endSquare.charAt(0)){
    const minSquare = Math.min(startSquare.charCodeAt(1), endSquare.charCodeAt(1));
    const maxSquare = Math.max(startSquare.charCodeAt(1), endSquare.charCodeAt(1));
    for(let i=minSquare+1;i<maxSquare;i++){
      const square = document.getElementById(startSquare.charAt(0)+String.fromCharCode(i));
      if(square && square.firstChild!==null){
        return true;
      }
    }
  }
  else if(startSquare.charAt(1)===endSquare.charAt(1)){
    const minSquare = Math.min(startSquare.charCodeAt(0), endSquare.charCodeAt(0));
    const maxSquare = Math.max(startSquare.charCodeAt(0), endSquare.charCodeAt(0));
    for(let i=minSquare+1;i<maxSquare;i++){
      const letter = String.fromCharCode(i);
      const square = document.getElementById(letter+startSquare.charAt(1));
      if(square && square.firstChild!==null){
        return true;
      }
    }
  }
  else if(Math.abs(startSquare.charCodeAt(0) - endSquare.charCodeAt(0)) === Math.abs(startSquare.charCodeAt(1) - endSquare.charCodeAt(1))){
    let minSquare, maxSquare;
    if (startSquare.charCodeAt(0) < endSquare.charCodeAt(0)) {
      minSquare = startSquare;
      maxSquare = endSquare;
    } else {
      minSquare = endSquare;
      maxSquare = startSquare;
    }
    let increment = minSquare.charCodeAt(1) < maxSquare.charCodeAt(1) ? 1 : -1;
    for(let i = 1; i < Math.abs(minSquare.charCodeAt(0) - maxSquare.charCodeAt(0)); i++){
      const letter = String.fromCharCode(minSquare.charCodeAt(0) + i);
      const number = String.fromCharCode(minSquare.charCodeAt(1) + i * increment);
      const square = document.getElementById(letter + number);
      if(square && square.firstChild !== null){
        return true;
      }
    }
  }
  return false;
}
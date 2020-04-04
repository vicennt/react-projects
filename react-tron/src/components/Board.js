import React, {useEffect, useRef} from 'react';

function Board(){
  const unit = 15;
  const boardSize = 750;

  /** 
   El hook useRef nos permite declarar una variable dentro de nuetro componente 
   que permanecera igual durante toda la existencia del componte además nos permite
   enganchar estas variables a los propios elementos de nuestro componentes 
  **/ 
  const canvasRef = useRef();
  useEffect(function() {
    const canvas = canvasRef.current;
    // Obtenemos el contexto del canvas lo que nos permitirá pintar sobre el
    const context = canvas.getContext("2d");

    // Abrimos un path para empezar a pintar y posteriormente lo cerramos.
    context.beginPath();
    context.strokeStyle = '#001900';

    // Pintamos las lineas horizontales y verticales del tablero
    for(let i = unit * 2; i <= boardSize; i += unit * 2) {
      context.moveTo(i, 0);
      context.lineTo(i, boardSize);
    }
    for(let i = unit * 2; i <= boardSize; i += unit * 2) {
      context.moveTo(0, i);
      context.lineTo(boardSize, i);
    }
    context.stroke();
    context.closePath();
  }, []);

  return <canvas ref={canvasRef} className="board" width={boardSize} height={boardSize}/>
}

export default Board; 
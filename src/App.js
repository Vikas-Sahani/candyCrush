import { useState, useEffect } from "react";
import blueCandy from './images/blueCandy.png';
import greenCandy from './images/greenCandy.png';
import orangeCandy from './images/orangeCandy.png';
import purpleCandy from './images/purpleCandy.png';
import redCandy from './images/redCandy.png';
import yellowCandy from './images/yellowCandy.png';
import blank from './images/blank.png';

const width = 8; //width refers to the length 
const candyColors = [blueCandy, greenCandy, orangeCandy, purpleCandy, redCandy, yellowCandy]; 

const App = () => {
  // it an array of color of all 64 cells
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [score, setScore] = useState(0);

  // checking that 4columns are = or not
  const checkForColumnOfFour = () =>{
    for(let i=0; i<=39; i++){
      const columnOfFour = [i, i+width, i+width*2, i+width*3]; 
      const decidedColor= currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank; //blank shouldn't count in the score

      // checking that 4 columns colors are equal or not
      if(columnOfFour.every(squre => currentColorArrangement[squre]===decidedColor) && (!isBlank)){
        setScore(score+4);
        columnOfFour.forEach((squre)=>currentColorArrangement[squre]=blank);
        return true; //this will store in onther var
      }
    }
  }

  const checkForRowOfFour = () =>{
    for(let i=0; i<64; i++){
      const rowOfFour = [i, i+1, i+2, i+3];
      const decidedColor= currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank; //blank shouldn't count in the score
      
      const notValid = [5, 6,7, 13,14, 15, 21,22,23, 29,30,31, 37,38,39, 45,46,47, 53,54,55 , 61,62,63]
      if(notValid.includes(i)) continue;

      if(rowOfFour.every(squre => currentColorArrangement[squre]===decidedColor) && (!isBlank)){
        setScore(score+4);
        rowOfFour.forEach((squre)=>currentColorArrangement[squre]=blank)
        return true; //this will store in onther var
      }
    }
  }

  const checkForColumnOfThree = () =>{
    for(let i=0; i<=47; i++){
      const columnOfThree = [i, i+width, i+width*2];
      const decidedColor= currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank; //blank shouldn't count in the score      

      if(columnOfThree.every(squre => currentColorArrangement[squre]===decidedColor) && (!isBlank)){
        // here we are checking that array of columnOfThree's element is  same or not. if same then don't print anything in the board
        setScore(score+3);
        columnOfThree.forEach((squre)=>currentColorArrangement[squre]=blank);
        return true; //this will store in onther var
      }
    }
  }

  const checkForRowOfThree = () =>{
    for(let i=0; i<64; i++){
      const rowOfThree = [i, i+1, i+2];
      const decidedColor= currentColorArrangement[i];
      const notValid = [6,7, 14,15, 22,23, 30,31, 38,39, 46,47, 54,55, 62,63];
      const isBlank = currentColorArrangement[i] === blank; //blank shouldn't count in the score

      
      if(notValid.includes(i)) continue;

      if(rowOfThree.every(squre => currentColorArrangement[squre] === decidedColor) && (!isBlank)){
        setScore(score+3);
        rowOfThree.forEach((squre)=>currentColorArrangement[squre]=blank);
        return true; //this will store in onther var
      }
    }
  }

  // moving down the colors who are empty
  const moveIntoSquareBelow = () =>{
    for(let i = 0; i<=55; i++){

      // generating a random color to the top side
      const firstRow = [0,1,2,3,4,5,6,7];
      const isFirstRow = firstRow.includes(i);

      if(isFirstRow && currentColorArrangement[i]===blank){
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangement[i] =candyColors[randomNumber];
      }

      if(currentColorArrangement[i+width]===blank){
        currentColorArrangement[i+width] = currentColorArrangement[i];
        currentColorArrangement[i] = blank
      }
    }
  }

  const dragStart = (event) =>{
    setSquareBeingDragged(event.target)
  }
  const dragDrop = (event) =>{
    setSquareBeingReplaced(event.target);
  }
  const dragEnd = () =>{
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'));
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'));

    //adlabadli
    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src');
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src');

    const validMoves = [
      squareBeingDraggedId-1,    //left
      squareBeingDraggedId-width, //top
      squareBeingDraggedId+1,     //right 
      squareBeingDraggedId+width  //bottom
    ]

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();

    if(squareBeingReplacedId && validMove &&
      (isARowOfThree || isARowOfFour|| isAColumnOfFour || isAColumnOfThree)){
        setSquareBeingDragged(null);
        setSquareBeingReplaced(null);
      }
      else{ 
        currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src');
        currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src');
        setCurrentColorArrangement([...currentColorArrangement]);
      }
  }


  const createBoard = () => {
    const randomColorArrangement = [];
    for(let i=0; i<(width*width); i++){
      const randomColor = candyColors[Math.floor(Math.random()*candyColors.length)];//number wil be always less than 6
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement)
  }

  
  useEffect(() =>{
    createBoard()
  }, []);

  useEffect(()=>{
    const timer = setInterval(()=>{
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    },100)
    return ()=>clearInterval(timer);
  })

  // checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement
 

  return (
      <div className="app">
        <h1>Candy Crush</h1>      
        <div className="smallApp">
          <div className="game">
            {currentColorArrangement.map((candyColor, index)=>(
              <img
                key={index}
                // style={{backgroundColor:candyColors}}
                src={candyColor}
                alt={candyColor}
                data-id={index}

                draggable={true}
                onDragStart={dragStart}
                onDragOver={(event)=>event.preventDefault()}
                onDragEnter={(event)=>event.preventDefault()}
                onDragLeave={(event)=>event.preventDefault()}
                onDrop={dragDrop}
                onDragEnd={dragEnd}
              />
            ))}
          </div>
          <div className="textContent">
            
            <div className="score"  style={{backgroundColor:`rgb(${Math.floor(Math.random()*255)} ${Math.floor(Math.random()*255)} ${Math.floor(Math.random()*255)})`}}>
              <h2 className="scroeText">Score</h2>
              <h2 className="scoreBoard">{score}</h2>
            </div>
            <div className="gameRules">
                <ul>
                  <h3 style={{fontStyle:"normal"}} >Game Rules</h3>
                  <li>Drag and Drop only left, top, right and bottom sides only one step</li>
                  <li>If 3 rows or column is matches then score will increase by 3</li>
                  <li>If 4 rows or column is matches then score will increase by 4</li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    );
}
export default App;
const headerText = document.querySelector(".headingText");
const restartbtn = document.querySelector(".restartbtn");
const boxes = Array.from(document.querySelectorAll(".box"));
// console.log(boxes);
const fillBox = Array(9).fill(-1) ; //array of size 9 all initialised to null
// console.log(fillBox);
const winnerBlockColor = getComputedStyle(document.body).getPropertyValue("--winnerBlock");
// console.log(winnerBlockColor);
const O_sym = "O" ; 
const X_sym = "X" ; 
let currentPlayer = X_sym ; 
let playedMoves = 0 ; 
/**************************************************************************** START GAME **************************************************************************************************************** */

const boxClick = function(e){
 // console.log(e.target);
 const boxSelected = e.target.id ; 
            
 if(fillBox[boxSelected] === -1)//if the current one is not filled then please go ahead and fill the current box
 {
    playedMoves++;
     fillBox[boxSelected] = currentPlayer ; //fill box will the current text
     // console.log(fillBox);
     e.target.innerHTML = `${currentPlayer}`; //update text in the website

     //write game logic here
     if(playerWon() !== false){
         headerText.innerHTML = `${currentPlayer} has Won!!` ; 
         // console.log(playerWon());
         const winner = playerWon(); //contains id of the winning blocks

         //manipulate the winning blocks with different color
         winner.forEach(function(box){
             boxes[box].style.backgroundColor = winnerBlockColor ; 
         });

        setTimeout(function(){
            restart();
        },1000);

     }
     else 
        if(playedMoves === 9){
            headerText.innerHTML = "Its a draw...";
            setTimeout(function(){
                restart();
            },1500);
        }
    
     
     currentPlayer = currentPlayer === "X" ? "O" : "X" ; //switch player
 }


}

const startGame = function(){
    boxes.forEach(function(box){
        box.addEventListener("click" , boxClick);
    })
}

startGame();

/********************************************************************** GAME LOGIC **************************************************************************************************** */

const winningCombination = [
    [0 , 1 , 2] , 
    [3 , 4 , 5],
    [6 , 7 , 8],
    [0 , 3 , 6] ,
    [1 , 4 , 7],
    [2 , 5 , 8],
    [0 , 4 , 8],
    [2 , 4 , 6]
]
console.log(winningCombination);

//1. write a function to start game 

const playerWon = function(){
    //for each winning combo check if the fillbox array satisfies
    for(const it of winningCombination){
        // console.log(it);
        const [a , b , c] = it ; 
        if(fillBox[a] !== -1 && (fillBox[a] === fillBox[b] && fillBox[a] === fillBox[c]))
        {
            // console.log("player won");
            return [a , b , c] ; 
        }
    }

    return false; 
}


/************************************************************************* RESTART BTN ******************************************************************************************* */

const restart = function(){
    fillBox.fill(-1); //set all element to -1 again

    //set current player to X again
    currentPlayer = X_sym ; 

    //set all the text in the website to ""
    boxes.forEach(function(box){
        box.innerHTML = "";
        box.style.backgroundColor = "";
    });

    headerText.innerHTML = "Tic Tac Toe" ;
    playedMoves = 0 ; 
    
}
restartbtn.addEventListener("click" , restart);
let boxes = document.querySelectorAll(".box");// Accessing all the boxes with their class i.e. ".box"

let resetBtn = document.querySelector("#reset");// Acessing the reset button with its id i.e. #reset

let turnO = true; // playerX or playerO

let msgContainer = document.querySelector(".msg-container");// Accessing the winning message container

let msg = document.querySelector("#msg");// Accessing the winning statement

const winPatterns = [ // Winning patterns for the game
    [0,1,2], [0,3,6], [0,4,8],
    [1,4,7],
    [2,5,8], [2,4,6],
    [3,4,5],
    [6,7,8]
]

const winnerFunction = () =>{
    for (let pattern of winPatterns)
    {
        let posVal1 = boxes[pattern[0]].innerText; // Checks what character is present on Box1(index = 0) i.e. X or O
        let posVal2 = boxes[pattern[1]].innerText;// Checks what character is present on Box2(index = 1) i.e. X or O
        let posVal3 = boxes[pattern[2]].innerText;// Checks what character is present on Box3(index = 2) i.e. X or O
        if(posVal1 != "" && posVal2 != "" && posVal3 != "")// Checks if none of the positions are empty
        {
            if(posVal1 === posVal2 && posVal2 === posVal3) // Checks if all the characters are same or not i.e all are X or O
            {
                showWinner(posVal1);
                disableBoxes(); // calling the disableBoxes function
            }
        }
    }
}

const showWinner = (winner) =>{ // Displays a winning message on screen
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
}

const resetGame = () =>{// Reset game function to reset the game once the reset button is pressed
    turnO = true;
    msgContainer.classList.add("hide");
    enableBoxes();
}

const disableBoxes = () =>{ // Disable boxes function so that once a winner arrives the game doesn't continue
    for(let box of boxes)
    {
        box.disabled = true;
    }
}

const enableBoxes = () =>{ // Enable boxes function so that once the reset button is pressed the game restarts
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
    }
}

boxes.forEach((box) =>{ // Adding an eventlistener on each boxes 
    box.addEventListener("click", () => {
        if(turnO == true) // playerX's turn
        {
            box.innerText = "X";
            turnO = false;
        }
        else // playerO's turn
        {
            box.innerText = "O";
            turnO = true;
        }
        box.disabled = true; // Disabling the boxes so that a player cannot overrride another box
        winnerFunction();
    });
});

resetBtn.addEventListener("click", resetGame);// the game resets as soon as the reset button is clicked
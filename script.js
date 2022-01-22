const msg = document.querySelector('#outputmsg');

let player = "X";
let gamestatus = true;

const startMsg = () => `Player ${player} turn`;
const winMsg = () => `Player ${player} has won the Match`;

msg.innerHTML = startMsg();

let cellArray = ["","","","","","","","",""];

function playerChange() {
    if (player == "X") {
        player = "O";
    } else {
        player = "X";
    }
}

function clickWrite(clickCell,cellindex) {
    cellArray[cellindex] = player;
    clickCell.innerHTML = player;
    var clicksound = new Audio("sounds/stop.wav");
    clicksound.play();
}

const winCon = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]

function clickvalidate() {
    let win = false;
    for (let i = 0; i <= 7; i++) {
        let cond = winCon[i];
        let a = cellArray[cond[0]];
        let b = cellArray[cond[1]];
        let c = cellArray[cond[2]];
        if (a == "" || b == "" || c == "") {
            continue;
        }
        if (a == b && b == c) {
            win = true;
            break;
        }
    }

    playerChange();

    if (win) {
        playerChange();
        gamestatus = false;
        var winsound = new Audio("sounds/win.wav");
        winsound.play();
        msg.innerHTML = winMsg();
    }else{
        msg.innerHTML = startMsg();
    }

    if (!cellArray.includes("")) {
        msg.innerHTML = "Draw Match";
        gamestatus = false;
        var oversound = new Audio("sounds/gameover.wav");
        oversound.play();
        return;
    }
    

}

function clickcell(clickdcellData) {
    const clickedCell = clickdcellData.target;
    const cellindex = clickedCell.getAttribute("id");
    if (cellArray[cellindex] == "" && gamestatus == true) {
        clickWrite(clickedCell,cellindex);
        clickvalidate();
    } else {
        return;
    }
}
function reset() {
    var resetsound = new Audio("sounds/reset.wav");
    resetsound.play();
    gamestatus = true;
    player = "X";
    cellArray = ["","","","","","","","",""];
    msg.innerHTML = startMsg();
    document.querySelectorAll(".cell-btn").forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll(".cell-btn").forEach(cell => cell.addEventListener('click',clickcell));
document.querySelector(".reset-btn").addEventListener('click',reset);
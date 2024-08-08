function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(interval);
            display.textContent = "00:00";
        }
    }, 1000);

    return interval;
}
function startGame() {
    var cell1 = document.getElementById('cell-1'); 
    var soldiers = document.querySelectorAll('.players img');
    soldiers.forEach(function (soldier) {
        cell1.appendChild(soldier.parentElement); 
    });
}

function movePlayersToStart() {
    var players = document.querySelectorAll('.player');
    var startCell = document.getElementById('cell-1');

    players.forEach(function (player) {
        player.style.position = 'absolute';
        player.style.left = startCell.offsetLeft + 'px';
        player.style.top = startCell.offsetTop + 'px';
    });
}
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}
function movePlayer(player, steps) {
    alert(player.dataset.cellId+"jjjjjjjjj")
    var currentCellId = parseInt(player.dataset.cellId);
    var newCellId = currentCellId + steps;
    var newCell = document.getElementById('cell-' + newCellId);
    
    if (newCell) {
        newCell.appendChild(player);
        player.dataset.cellId = newCellId;
    }
}

function rollDiceAndMovePlayers() {
    var steps = rollDice();
    var players = document.querySelectorAll('.player');
    players.forEach(function (player) {
        var playerName = player.querySelector('p').textContent; 
        alert(playerName);
        movePlayer(player, steps);
    });
}
window.onload = function () {
    var oneMinute = 60,
        display = document.querySelector('#timer');


    display.addEventListener('click', function () {
        startTimer(oneMinute, display);
       
        display.removeEventListener('click', arguments.callee);
    });

    var players = JSON.parse(localStorage.getItem('players')) || [];
    var playersContainer = document.getElementById('players');


    players.forEach(function (player) {
        var playerDiv = document.createElement('div'); 
        playerDiv.className = 'player';
        playerDiv.dataset.cellId = '1';
        playerDiv.innerHTML = `<img src="${player.soldier}" alt="חייל"><p>${player.name}</p>`;
        playersContainer.appendChild(playerDiv);
    });


    var startGameButton = document.getElementById('startGameButton');
    startGameButton.addEventListener('click', movePlayersToStart);
    var rollDiceButton = document.getElementById('rollDiceButton');
    rollDiceButton.addEventListener('click', rollDiceAndMovePlayers);
};

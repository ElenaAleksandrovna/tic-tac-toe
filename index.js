const playArea = document.getElementById('play-area');
const boxes = document.getElementsByClassName('box');
const messageText = document.querySelector('.message');
const msgSteps = document.querySelector('.msgSteps')
const messageWrapper = document.getElementById('modal-wrapper');
const overlay = document.querySelector('.overlay');
const button = document.getElementById('play-again');
let resCont = document.getElementById('res-cont');
let winnerData = document.querySelectorAll('.winData');
let stepData = document.querySelectorAll('.data');
const sound = document.getElementById('sound');
const soundRestart = document.getElementById('sound2');
const soundResult = document.getElementById('sound3');
const closeTable = document.getElementById('closeBtn');
let step = 0;
let result = '';
let resultTable = JSON.parse(localStorage.getItem('resultTable')) || [];
if (resultTable.length > 0){
    fillingRes();
}

playArea.addEventListener('click', event => {
    if(resultTable.length == 10){
        location.reload();
    }
  if (event.target.className == 'box'){
      sound.play();
    if (step % 2 === 0){
        event.target.innerHTML = 'X';
        event.target.classList.add('xStyle');
        step ++;
        checkWinner();
        if (step === 9){
            messageText.innerHTML = 'It was close!';
            messageWrapper.style.display = 'block';
            resultTable.push({winner: '-', steps: 9});
            console.log(resultTable);
            clearBoxes();
        }
    } else {
        event.target.innerHTML = '0';
        event.target.classList.add('oStyle');
        step++;
        checkWinner();
        if (step === 9){
            messageText.innerHTML = 'It was close!';
            messageWrapper.style.display = 'block';
            resultTable.push({winner: '-', steps: 9});
            clearBoxes();
        }
    }
  }
})
function checkWinner(){
    const winComb = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    winComb.forEach(function(comb, i){
        if (boxes[comb[0]].innerHTML == 'X' && boxes[comb[1]].innerHTML == 'X' && boxes[comb[2]].innerHTML == 'X'){
            result = 'X';
            modMsg(result, step);
            resultTable.push({winner: result, steps: step});
            clearBoxes();
        } else if (boxes[comb[0]].innerHTML == '0' && boxes[comb[1]].innerHTML == '0' && boxes[comb[2]].innerHTML == '0'){
            result = '0';
            modMsg(result, step);
            resultTable.push({winner: result, steps: step});
            clearBoxes();
        }
    })
}


function modMsg(winner, step){
  messageText.innerHTML = `The Winner is ${winner}!`;
  msgSteps.innerHTML = `Steps: ${step}`
  messageWrapper.style.display = 'block';
}
function closeMsg(){
    messageWrapper.style.display = 'none';
    soundRestart.play();
}
overlay.addEventListener('click', closeMsg);
button.addEventListener('click', closeMsg);

function saveResult(){
    if (resultTable.length >= 1 && resultTable.length < 10){
       localStorage.setItem('resultTable', JSON.stringify(resultTable));
    } else {
        localStorage.clear();
    }
}
function clearBoxes(){
  for (let box of boxes){
     box.classList.remove('xStyle', 'oStyle');
     box.innerHTML = '';
     step = 0;
     saveResult();
  }
  fillingRes();
}
if(resultTable.length == 10){
    location.reload();
}

const btnResults = document.querySelector('.result-table');
const resMenu = document.querySelector('.hidden-results');
btnResults.addEventListener('click', openRes);
function openRes(event){
    resMenu.classList.toggle('visibility');
    soundResult.play();
}
closeTable.addEventListener('click', openRes);



function fillingRes(){
resultTable.forEach(function(match, item){
    for (let i = 0; i < winnerData.length; i++){
        winnerData[item].innerHTML = match.winner;
        stepData[item].innerHTML = match.steps;
    }
})
}
console.log(`
    реализован интерфейс игры +5\n
    в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n
    При кликах по игровому полю по очереди отображаются крестики и нолики. Первая фигура всегда крестик +10\n
    Игра завершается, когда три фигуры выстроились в ряд по вертикали, горизонтали или диагонали +10\n
    По окончанию игры выводится её результат - выигравшая фигура и количество ходов от начала игры до её завершения +10\n
    Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой отображаются результаты предыдущих 10 игр +10\n
    Звуки +10\n
    Total score: 60/70`);

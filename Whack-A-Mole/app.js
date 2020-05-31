let square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');
const grid = document.querySelector('#grid');
let score = document.querySelector('#score');

let result = 0;
let currentTime = timeLeft.textContent;
var hit;
let alreadyHit = false;
let moleMovement;

for(let i = 0; i < 36; ++i){
    let newEle = document.createElement("div");
    newEle.classList.add('square');
    newEle.id = String(i);
    grid.appendChild(newEle);
}
console.log('S',square);
square = document.querySelectorAll('.square');
function randomSquare() {
    alreadyHit = false;
    square.forEach(ele => {
        ele.classList.remove('mole');
    });
    let rand = Math.floor(Math.random()*36);
    console.log('R ',rand);
    square[rand].classList.add('mole');
    hit = rand;
}
 square.forEach(ele => {
    ele.addEventListener('mouseup',() => {
        console.log("HIT ",ele.id, hit);
        if( ele.id == hit && !alreadyHit){
            console.log("INCREASEEEEEE");
            result +=1;
            score.textContent = result;
            alreadyHit = true;
        }
    });
 });
 function moveMole() {
     moleMovement = setInterval(randomSquare,1000);
 }
 moveMole();
function reduceTimer() {
    --currentTime;
    timeLeft.textContent = currentTime;
    if(currentTime === 0){
        clearInterval(timer);
        clearInterval(moleMovement);
        alreadyHit = true;
    }
}
let timer = setInterval(reduceTimer,1000);
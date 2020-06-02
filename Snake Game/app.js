document.addEventListener('DOMContentLoaded',() => {
    var grid = document.getElementById('grid');
    console.log(grid);
    grid.style.width = '550px';
    grid.style.height = '550px';
    grid.style.backgroundColor = '#000';
    grid.style.marginLeft = "auto";
    grid.style.marginRight = "auto";
    grid.style.marginTop = "20px"
    var direction = null;
    for(let i=0; i < 11; ++i){
        for(let j=0; j < 11; ++j)
        {
            let box = document.createElement("div");
            box.style.width = '50px';
            box.style.height = '50px';
            box.setAttribute("data-x",i);
            box.setAttribute("data-y",j);
            box.style.backgroundColor = '#eee';
            box.classList.add('box');
            grid.appendChild(box); 
        } 
    }
    console.log();
    var boxes = document.querySelectorAll(".box");
    var snake = [[5,5]];
    var snakeSize = 1;
    var fruit = { x:0,y:0};
    fruit.x = Math.floor(Math.random()*11);
    fruit.y = Math.floor(Math.random()*11);
    document.onkeydown = function(e) {
        switch(e.keyCode){
            case 37 : direction = "left"; break;
            case 38 : direction = "up"; break;
            case 39 : direction = "right"; break;
            case 40 : direction = "down"; break;
        }
    }
    function checkTail() {
        if(snake[snakeSize-1][0]>snake[snakeSize-2][0]) return "up";
        if(snake[snakeSize-1][0]<snake[snakeSize-2][0]) return "down";
        if(snake[snakeSize-1][1]>snake[snakeSize-2][1]) return "left";
        if(snake[snakeSize-1][1]<snake[snakeSize-2][0]) return "right";
    }
    function renderSnake() {
        if(direction!=null){
            switch(direction){
                case "up" : snake.unshift([snake[0][0]-1,snake[0][1]]);break;
                case "down" : snake.unshift([snake[0][0]+1,snake[0][1]]);break;
                case "left" : snake.unshift([snake[0][0],snake[0][1]-1]);break;
                case "right" : snake.unshift([snake[0][0],snake[0][1]+1]);break;
            }
            let headX = snake[0][0],headY = snake[0][1];
            if(headX < 0 || headX > 10 || headY < 0 || headY > 10){
                clearInterval(loop);
                return;
            }
            snake.pop();
        }
        boxes.forEach((currBox) => {
            currBox.style.backgroundColor = "#eee";
            if(currBox.getAttribute("data-x")==fruit.x && currBox.getAttribute("data-y")==fruit.y){
                currBox.style.backgroundColor = "#000";
            }
            //console.log(snake[0][0],snake[0][1]," ",fruit.x,fruit.y);
            if(snake[0][0]==fruit.x && snake[0][1]==fruit.y){
                console.log("EAT");
                currBox.style.backgroundColor = "#eee";
                fruit.x = Math.floor(Math.random()*11);
                fruit.y = Math.floor(Math.random()*11);
                if(snakeSize == 1){
                    switch(direction){
                        case "up" : snake.push([snake[snakeSize-1][0]+1,snake[snakeSize-1][1]]);break;
                        case "down" : snake.push([snake[snakeSize-1][0]-1,snake[snakeSize-1][1]]);break;
                        case "left" : snake.push([snake[snakeSize-1][0],snake[snakeSize-1][1]+1]);break;
                        case "right" : snake.push([snake[snakeSize-1][0],snake[snakeSize-1][1]-1]);break;
                    }
                }
                else{
                    switch(checkTail()){
                        case "up" : snake.push([snake[snakeSize-1][0]+1,snake[snakeSize-1][1]]);break;
                        case "down" : snake.push([snake[snakeSize-1][0]-1,snake[snakeSize-1][1]]);break;
                        case "left" : snake.push([snake[snakeSize-1][0],snake[snakeSize-1][1]+1]);break;
                        case "right" : snake.push([snake[snakeSize-1][0],snake[snakeSize-1][1]-1]);break;
                    }
                }
            }
            snake.forEach((ele) =>{
                if(currBox.getAttribute("data-x")==ele[0] && currBox.getAttribute("data-y")==ele[1]){
                    currBox.style.backgroundColor = "red";
                }
            });
        });
    }
    var loop = setInterval(renderSnake,500);
});

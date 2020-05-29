document.addEventListener('DOMContentLoaded',()=>{
    const cardArray = [
        {
            name:'fries',
            img:'images/fries.png'
        },
        {
            name:'fries',
            img:'images/fries.png'
        },
        {
            name:'cheeseburger',
            img:'images/cheeseburger.png'
        },
        {
            name:'cheeseburger',
            img:'images/cheeseburger.png'
        },
        {
            name:'hotdog',
            img:'images/hotdog.png'
        },
        {
            name:'hotdog',
            img:'images/hotdog.png'
        },
        {
            name:'ice-cream',
            img:'images/ice-cream.png'
        },
        {
            name:'ice-cream',
            img:'images/ice-cream.png'
        },
        {
            name:'milkshake',
            img:'images/milkshake.png'
        },
        {
            name:'milkshake',
            img:'images/milkshake.png'
        },
        {
            name:'pizza',
            img:'images/pizza.png'
        },
        {
            name:'pizza',
            img:'images/pizza.png'
        }
    ];

    cardArray.sort(() => 0.5 - Math.random());
    const grid = document.querySelector('.grid');
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];
    var score = 0;
    var resultDisplay = document.querySelector('#result');
    //create your board
    function createBoard() {
        for(let i = 0;i < cardArray.length; ++i){
            var card = document.createElement('img');
            card.setAttribute('src','images/blank.png');
            card.setAttribute('data-id',i);
            card.addEventListener('click',flipCard);
            grid.appendChild(card);
        }
    }
    function flipCard() {
        var cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src',cardArray[cardId].img);
        if(cardsChosen.length==2){
            setTimeout(checkforMatch,500);
        }
    }
    function checkforMatch(){
        var cards=document.querySelectorAll('img');
        var card1Id=cardsChosenId[0];
        var card2Id=cardsChosenId[1];
        if(cardsChosen[0]==cardsChosen[1] && card1Id!=card2Id){
            alert('You found a match');
            console.log(cardsChosen);
            console.log(cardsChosenId);
            console.log(cards);
            cards[card1Id].onclick = false;
            cards[card2Id].onclick = false;
            cards[card1Id].setAttribute('src','images/white.png');
            cards[card2Id].setAttribute('src','images/white.png');
            cards[card1Id].removeEventListener('click',flipCard);
            cards[card2Id].removeEventListener('click',flipCard);
            cardsWon.push(cardsChosen);
            console.log(cardsWon);
            ++score;
            resultDisplay.textContent = String(score);
        }
        else{
            cards[card1Id].setAttribute('src','images/blank.png');
            cards[card2Id].setAttribute('src','images/blank.png');
        }
        cardsChosen = [];
        cardsChosenId = [];
        if(cardsWon.length==cardArray.length/2){
            resultDisplay.textContent = 'Congratulations';
        }

    }
    createBoard();
});
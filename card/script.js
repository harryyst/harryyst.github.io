// css class for different card image
const CARD_TECHS = [
  'html5',
  'css3',
  'js',
  'sass',
  'nodejs',
  'react',
  'linkedin',
  'heroku',
  'github',
  'aws'
];
let end = 61;

let lastcard;
let last;
let cercard;
let cer;
let count=0;
let gametimer=null;
// only list out some of the properties,
// add more when needed
const game = {
  score: 0,
  level: 1,
  timer: 60,
  gameBoard: null,
  timerDisplay: null,
  scoreDisplay: null,
  levelDisplay: null,
  timerInterval: null,
  startButton: null,
  gameOver:true,
  totalCards:0,
  fcard:0,
  // and much more
};
setGame();

/*******************************************
/     game process
/******************************************/
function setGame() {
  // register any element in your game object
  game.gameBoard = document.querySelector('.game-board');
  game.timerDisplay = document.querySelector('.game-timer__bar');
  game.scoreDisplay = document.querySelector('.game-stats__score--value');
  game.levelDisplay = document.querySelector('.game-stats__level--value');
  game.startButton = document.querySelector('.game-stats__button');
  bindStartButton();
}
function endGame(){
    game.startButton.innerHTML = 'Start Game';
    clearTimeout(gametimer);
    handleGameOver();
    game.fcard=0;
}

function startGame() {
      clearBoard();
      end=61;
      game.startButton.innerHTML = 'End Game';
      game.level = 1;
      game.score = 0;
      game.gameOver = false;
      game.levelDisplay.innerHTML = game.level;
      game.scoreDisplay.innerHTML = game.score;
      generateCards();
      updateTimerDisplay();
      bindCardClick();
}

function handleCardFlip() {
  let card = document.querySelectorAll(".card");
  cer = this;  
  cer.classList.add("card--flipped");
  if(last!=null){
    if(last==cer){
      cer.classList.remove("card--flipped");
      last=null;
      cer=null;
      return;
    }
    if(cer.classList[1] != last.classList[1]){
      for(let i=0; i<card.length;i++){
        unBindCardClick(card[i]);
      }
      setTimeout(function(){
      cer.classList.remove("card--flipped");
      last.classList.remove("card--flipped");
      cer=null;
      last=null;
      bindCardClick();
    },1000)
      return;
    }else{
      updateScore();
      unBindCardClick(cer);
      unBindCardClick(last);
      game.fcard+=2;
      cer =null;
      last = null;  
      if(game.fcard==game.totalCards){
        game.fcard=0;
        if(game.level==3){
          endGame();
        }
        nextLevel();
      }
    }
  }
  last = cer;
}

function nextLevel() {
  game.level+=1;
  game.levelDisplay.innerHTML=game.level;
  clearBoard();
  generateCards();
  bindCardClick();
  end=61;
}

function handleGameOver() {
      alert("Score:"+game.score);
}

function clearBoard(){
  const {gameBoard} = game;
  while(gameBoard.firstChild){
    gameBoard.removeChild(gameBoard.firstChild);
  }
}

function generateCards(){
  const gameBoard = game.gameBoard;
  const gameSize = game.level*2;
  const totalCards = gameSize*gameSize;
  game.totalCards = totalCards;
  gameBoard.style['grid-template-columns'] = `repeat(${gameSize},1fr)`;
  const cards = [];
  for(let i = 0; i<totalCards/2;i++){
    const tech = CARD_TECHS[i%CARD_TECHS.length];
    const card = createCardElement(tech);
    cards.push(card);
    console.log(cards);
    cards.unshift(card.cloneNode(true));
  }
  while(cards.length>0){
    const index = Math.floor(Math.random()*cards.length);
    const card = cards.splice(index,1)[0];
    gameBoard.appendChild(card);
  }

}

function createCardElement(tech){

  const node = document.createElement('div');
  const cardFront = document.createElement('div');
  const cardBack = document.createElement('div');
  node.classList.add('card',tech);
  cardFront.classList.add('card__face','card__face--front');
  cardBack.classList.add('card__face','card__face--back');
  node.dataset.tech = tech;
  node.appendChild(cardFront);
  node.appendChild(cardBack);
  return node;
}

/*******************************************
/     UI update
/******************************************/
function updateScore() {
  game.score += game.level*2*end;
  document.getElementsByClassName("game-stats__score--value")[0].innerHTML = game.score;
}

function updateTimerDisplay() {
  if(end ==0){
    endGame();
  }else{
    end = end-1;
    document.getElementsByClassName("game-timer__bar")[0].innerHTML = end+"s";
    game.timerDisplay.style.width=end/60*100+"%";
    gametimer=setTimeout(function() {
      updateTimerDisplay()
  },1000)
  }
}



/*******************************************
/     bindings
/******************************************/
function bindStartButton() {
      game.startButton.addEventListener('click',function(event){
      gameOver = false;
      if(count==0){
        count+=1;
        startGame();
      }else{
        endGame();
        count=0;
      }
    })

}

function unBindCardClick(card) {
  card.removeEventListener('click',handleCardFlip);
}

function bindCardClick() {
  // let first;
  
  let card = document.querySelectorAll(".card");
    for(let i=0; i<card.length;i++){
      card[i].addEventListener('click',handleCardFlip
      )
      
    }
}

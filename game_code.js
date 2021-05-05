var score = document.querySelector(".score");
var playArea = document.querySelector(".playArea");
var startScreen = document.querySelector(".startScreen");
var roadlines = document.querySelector(".roadLines");
var playGame = { speed: 5 , score : 0}
var player = {}
var car_crash = new Audio("./images/car_crash.wav");
var horn = new Audio("./images/horn.wav");
var race = new Audio("./images/race.wav");
var theme = new Audio("./images/theme.mp3")

//start the game 

startScreen.addEventListener("click", start); 
    



//write a function to move the car
let forMoving = {
    ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false
}




document.addEventListener("keydown", function (e) {
    if(e.key === "h"){
        horn.play();
    }
    e.preventDefault;
    forMoving[e.key] = true;
    //console.log(forMoving);
    //carMove()
})
document.addEventListener("keyup", function (e) {
    race.pause();
    e.preventDefault;
    forMoving[e.key] = false;
    //console.log(forMoving);
})


//make a function to crash the cars 

function iscrash(s,d){
     sRect = s.getBoundingClientRect();
     dRect = d.getBoundingClientRect();

     return !((sRect.bottom < dRect.top) || (sRect.top > dRect.bottom) ||
           (sRect.right < dRect.left) || (sRect.left > dRect.right))
}

    ///make animation to look road moving
 function moveLine(){
    var line = document.querySelectorAll(".roadLines");
    line.forEach(function (item) {
        if (item.y == 750) {
            item.y -= 800;
        }
        item.y += playGame.speed;
        item.style.top = item.y + "px";
    });
 }

 function endGame(){
    player.start = false;
    theme.pause();


 }
//make animation to look enemy car moving
function enemy(car) {
    var enemycar = document.querySelectorAll(".enemyCar");
    enemycar.forEach(function (item) {
        if(iscrash(car, item)){
            console.log("hello");
            document.getElementById("car").setAttribute("id", "blast")
            car_crash.play();
            endGame();
            startScreen.classList.remove("hide");
            startScreen.innerHTML = `<h2>Hey you did will but keep trying for better result</h2> <br> <p>Your final score is ${player.score + 1}</p> <br> <p><b>Click here to Restart The Game</b></p>`
        }
        if (item.y >= 700) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 400) + "px";
            item.style.backgroundColor = randomColor();
        }
        
        //console.log(player.score);
        if(player.score >= 2000){
            item.y += 5;
        item.style.top = item.y + "px";
        }
        else{
            item.y += 2;
        item.style.top = item.y + "px";
        }
    });
    
}
//make a function to create random color for enemy car
function randomColor() {
    function c() {
        // Math.floor(Math.random()*16777215).toString(16);
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#" + c() + c() + c();
}
console.log(randomColor())

function gamePlay(){
    if(player.start){
            moveLine();
            enemy(car);

        var carTop = document.querySelector("#car").offsetTop;
    var carLeft = document.querySelector("#car").offsetLeft;
    //console.log(carTop);
    //console.log(carLeft);
    if (forMoving.ArrowUp) {
            race.play();
        if (carTop > 150) {
            document.querySelector("#car").style.top = carTop - playGame.speed + "px";
        }
    }
    if (forMoving.ArrowDown) {
        race.play();
        if (carTop <= 615) {
            document.querySelector("#car").style.top = carTop + playGame.speed + "px";
        }
    }
    if (forMoving["ArrowLeft"]) {
        race.play();
        if (carLeft > -5) {
            document.querySelector("#car").style.left = carLeft - playGame.speed + "px";
        }
    }
    if (forMoving["ArrowRight"]) {
       race.play();
        if (carLeft <= 400) {
            document.querySelector("#car").style.left = carLeft + playGame.speed + "px";
        }
    }
        window.requestAnimationFrame(gamePlay);
        player.score++
        score.innerHTML = `Your Score: ${player.score}`;
       
    }

}

function start(){
    startScreen.classList.add("hide");
    playArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    theme.play();

    window.requestAnimationFrame(gamePlay);

    //create road lines
for (var i = 0; i < 5; i++) {
    var lines = document.createElement("div");
    lines.setAttribute("class", "roadLines");
    lines.y = i * 150;
    lines.style.top = lines.y + "px";
    playArea.appendChild(lines);
}

//make enemy car
for (var y = 0; y < 3; y++) {
    var enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemyCar");
    enemyCar.y = y * 300;
    enemyCar.style.left = y * enemyCar.y + 1 + "px";
    enemyCar.style.top = enemyCar.y + "px";
    playArea.appendChild(enemyCar);
}

    var car = document.createElement("div");
    car.setAttribute("id", "car");
    document.querySelector(".playArea").appendChild(car);
    var details_of_playArea = playArea.getBoundingClientRect();
}







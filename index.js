const gameWindow = document.querySelector(".gameWindow");
const fruit = document.querySelector(".fruit");
var snake = [[20,20],[20,19],[20,18]];
var place = p => `${p[1]}/${p[0]}`;
var newPart = p => `<div class="snake" id="s${p}"></div>`;
var d = 0;
var oldD = 0;
var tail;
var score = 0;
var fruitPosition = [50,50];
var delay = 50;

function init() {
		snake.forEach((e,i) => {
		if(i != 0){
			gameWindow.innerHTML += newPart(i);
		}
		document.getElementById(`s${i}`).style.gridArea = place(e);
	});
	document.getElementById("fruit").style.gridArea = place(fruitPosition);

}
init();

function eat() {
	if( JSON.stringify(snake[0]) == JSON.stringify(fruitPosition) ){
		return true;
	}

	return false;

}

function snakeDisplay() {
	for(var n = 1; n <= snake.length - 1; n++){
		if(document.getElementById(`s${n}`) != null){
			document.getElementById(`s${n}`).remove();
		}		
	}
	snake.forEach((e,i) => {		
		if(i != 0){
			gameWindow.innerHTML += newPart(i);
		}
		document.getElementById(`s${i}`).style.gridArea = place(e);
	});
	document.getElementById("fruit").style.gridArea = place(fruitPosition);
};
snakeDisplay();

function dead() {
	for(var i = 1; i < snake.length; i++){
		if( JSON.stringify(snake[0]) == JSON.stringify(snake[i]) ){
			return true;
		}
	}
	return false;
}

function move() {
	if( dead()){
		alert("you lost");
		location.reload();
	}
	else{
		tail = snake[snake.length - 1];
		if(d == 1){
			for(var i = snake.length - 1; i >= 1; i--){
				snake[i] = snake[i-1].concat();			
			}
			if(snake[0][1] == 1){
				snake[0][1] = 60;
			}
			else {
				snake[0][1] -= 1;
			}		
		}
		if(d == 2){
			for(var i = snake.length - 1; i >= 1; i--){
				snake[i] = snake[i-1].concat();			
			}
			if(snake[0][0] == 100){
				snake[0][0] = 1;
			}
			else {
				snake[0][0] += 1;
			}
		}
		if(d == 3){
			for(var i = snake.length - 1; i >= 1; i--){
				snake[i] = snake[i-1].concat();			
			}
			if(snake[0][1] == 60){
				snake[0][1] = 1;
			}
			else {
				snake[0][1] += 1;
			}
		}
		if(d == 4){
			for(var i = snake.length - 1; i >= 1; i--){
				snake[i] = snake[i-1].concat();			
			}
			if(snake[0][0] == 1){
				snake[0][0] = 100;
			}
			else {
				snake[0][0] -= 1;
			}
		}
		if(eat()){
			snake.push(tail);
			fruitPosition = [Math.floor(Math.random()*100),Math.floor(Math.random()*60)];
			score += 10;
			document.querySelector(".score").innerHTML = `Score: ${score}`;
			delay /= 1.05;
		}

		snakeDisplay();
		setTimeout(move,delay);
	}	
};

window.addEventListener("keydown", function(e){
	if(e.keyCode == 37 && d != 2 ){
		d = 4;
	}
	if(e.keyCode == 38 && d != 3 ){
		d = 1;
	}
	if(e.keyCode == 39 && d != 4 ){
		d = 2;
	}
	if(e.keyCode == 40 && d != 1 ){
		d = 3;
	}
});

move();
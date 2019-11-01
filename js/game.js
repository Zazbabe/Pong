var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;
var ballY = 50;
var ballSpeedY = 4;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	
	var framesPerSecond = 30;
	setInterval(function(){
	moveEverything();
	drawEverything();
}, 1000/framesPerSecond);
}

 function moveEverything(){
// 	ballX = ballX + ballSpeedX;
// 	ballY = ballY + ballSpeedY;

// 	// this makes the ball bounce back at the left end of the canvas
// 	if(ballX < 0)
// 	{
// 		ballSpeedX = -ballSpeedX;
// 	}

// 	// this makes the ball bounce back at the right end of the canvas
// 	if(ballX > canvas.width)
// 	{
// 		ballSpeedX = -ballSpeedX;
// 	}

// 	// this makes the ball bounce back at the up side of the canvas
// 	if(ballY < 0)
// 	{
// 		ballSpeedY = -ballSpeedY;
// 	}

// 	// this makes the ball bounce back at the down side of the canvas
// 	if(ballY > canvas.height)
// 	{
// 		ballSpeedY = -ballSpeedY;
}

function drawEverything() {
	// next line blanks out the screen with black
	colorRect(0,0,canvas.width,canvas.height,'black');

	//this is the left player paddle
	colorRect(0,210,10,100,'white');
	
	// next line draws the ball	
	colorCircle(ballX, ballY, 10, 'white');

}

// this function draws the circles
function colorCircle(centerX, centerY, radius, drawColor){

	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();
}

// this function draws the rectangles
function colorRect(leftX,topY,width,height,drawColor){
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX,topY,width,height);
}
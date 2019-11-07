		var canvas;
		var canvasContext;
		var ballX = 50;
		var ballSpeedX = 10;
		var ballY = 50;
		var ballSpeedY = 4;

		var player1Score = 0;
		var player2Score = 0;
		const WINNING_SCORE = 3;

		var showingWinScreen = false;

		var paddle1Y = 250;
		var paddle2Y = 250;
		const PADDLE_HEIGHT = 100;
		const PADDLE_WIDTH = 10;

		//this calculates where the mouse is to make player move the paddle
		function calculateMousePos(evt) {
			var rect = canvas.getBoundingClientRect();
			var root = document.documentElement;
			var mouseX = evt.clientX - rect.left - root.scrollLeft;
			var mouseY = evt.clientY - rect.top - root.scrollTop;
			return {
				x: mouseX,
				y: mouseY
			};
		}

		function handleMouseClick(){
			if(showingWinScreen){
				player1Score = 0;
				player2Score = 0;
				showingWinScreen = false;
			}
		}

		window.onload = function () {
			canvas = document.getElementById('gameCanvas');
			canvasContext = canvas.getContext('2d');

			var framesPerSecond = 30;
			setInterval(function () {
				moveEverything();
				drawEverything();
			}, 1000 / framesPerSecond);
			
			//restarts game
			canvas.addEventListener('mousedown', handleMouseClick);
			
			//this makes the player move the paddle 
			canvas - addEventListener('mousemove',
			function (evt) {
				var mousePos = calculateMousePos(evt);
				//this follow the center position on the mousemove when the mouse moves the paddle
				paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
			});
		}

		//resets the ball and puts it in the middle and restarts
		function ballReset() {

			if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){
				showingWinScreen = true;
			}

			ballSpeedX = -ballSpeedX;
			ballX = canvas.width / 2;
			ballY = canvas.height / 2;
		}

		//makes the computer paddle move automatically
		function computerMovement(){
			let paddle2YCenter =  paddle2Y + (PADDLE_HEIGHT/2);

			if(paddle2YCenter < ballY-35){
				paddle2Y += 6;
			} else if(paddle2YCenter > ballY+35) {
				paddle2Y -= 6;
			}
		}

		function moveEverything() {

			if(showingWinScreen == true){
				return;
			}

			//calls on function
			computerMovement();

			ballX = ballX + ballSpeedX;
			ballY = ballY + ballSpeedY;

			// this makes the ball bounce back at the left end of the canvas
			if (ballX < 0) {
				//bounces ball back when it misses the paddle
				if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
					ballSpeedX = -ballSpeedX;

					//changes the angle of the ball when it hits the paddle (ball control)
					var deltaY = ballY -(paddle1Y+PADDLE_HEIGHT/2);
					ballSpeedY = deltaY * 0.35;
				} else {
					//resets the ball if it leaves the screeen to the left
					player2Score++; //adds the score for player 2 before reseting the ball, this MUST be before ballReset()
					ballReset();
				}
			}
			// this makes the ball bounce back at the right end of the canvas
			if (ballX > canvas.width) {
						//bounces ball back when it misses the computer paddle
						if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
					ballSpeedX = -ballSpeedX;

					//changes the angle of the ball when it hits the paddle (ball control)
					var deltaY = ballY -(paddle2Y+PADDLE_HEIGHT/2);
					ballSpeedY = deltaY * 0.35

				} else {
					//resets the ball if it leaves the screeen to the right
					player1Score++; //adds the score for player1 before resetting the ball, this MUST be before ballReset()
					ballReset();
				}
			}

			// this makes the ball bounce back at the up side of the canvas
			if (ballY < 0) {
				ballSpeedY = -ballSpeedY;
			}

			// this makes the ball bounce back at the down side of the canvas
			if (ballY > canvas.height) {
				ballSpeedY = -ballSpeedY;
			}
		}

	function drawNet(){
		for(var i=0; i<canvas.height; i+=40){
			colorRect(canvas.width/2-1, i, 2, 20, 'white');
		}
	}

		function drawEverything() {
			
			// next line blanks out the screen with black
			colorRect(0, 0, canvas.width, canvas.height, 'black');

			//showing message of who won
			if(showingWinScreen == true){
				canvasContext.fillStyle = 'white';
				
				if(player1Score >= WINNING_SCORE){
					canvasContext.fillText("Left player won!", 350, 200);
					
				} else if (player2Score >= WINNING_SCORE){
					canvasContext.fillText("Right player won!", 350, 200);
				}

				canvasContext.fillText("Click to continue", 350, 500);

				return;
			}
			
			drawNet();

			//this is the left player paddle
			colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

			//this is the right computer paddle
			colorRect(canvas.width-PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

			// next line draws the ball	
			colorCircle(ballX, ballY, 10, 'white');

			//makes scoring show for each player
			canvasContext.fillText(player1Score, 100, 100);
			canvasContext.fillText(player2Score, canvas.width-100, 100);

		}

		// this function draws the circles
		function colorCircle(centerX, centerY, radius, drawColor) {

			canvasContext.fillStyle = drawColor;
			canvasContext.beginPath();
			canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
			canvasContext.fill();
		}

		// this function draws the rectangles
		function colorRect(leftX, topY, width, height, drawColor) {
			canvasContext.fillStyle = drawColor;
			canvasContext.fillRect(leftX, topY, width, height);
		}


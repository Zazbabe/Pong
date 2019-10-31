class Game{

    canvas;
    canvasContext;
    ballX = 50;

    
    constructor(){
        loadGame();
    }

    loadGame() {
        canvas = document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');
        
        let framesPerSecond = 30;
        setInterval(function(){
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);
    }
    
    moveEverything(){
        ballX = ballX + 5;
    }
    
    drawEverything() {
        console.log(ballX);
        canvasContext.fillStyle = 'black';
        canvasContext.fillRect(0,0,canvas.width,canvas.height);
        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(0,210,10,100);
        canvasContext.fillStyle = 'red';
        canvasContext.fillRect(ballX,100,10,10);
    
    }
}

/*
global angular 
global $scope
*/

angular
	.module('app', [])
	.controller('tictactoe', ['$scope', 'mover', tictactoe]);

function tictactoe($scope, mover) {

    var vm = this;
  
    vm.playTurn = playTurn;
    vm.minimax = minimax;
    vm.score = score;
    vm.game = gameConstructor;
    vm.startGame = startGame;
    vm.currentGame; 
    vm.symbols = ["", "O", "X"];
    vm.firstMove = 'human';
    
     function gameConstructor(){
        return {
            activeTurn: 1,
            update: update,
            board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            gameOver: gameOver,
			getMoves: getMoves,
			winner: mover.winner,
			winners: []
        };
        
       function update(move){
            if(this.activeTurn === 1){
                this.board[move] = 1;
                this.activeTurn = 2;
                    } else{
                 this.board[move] = 2;
                 this.activeTurn = 1;
                }
        }
        
        function gameOver(){
            return this.winner(this.board) || mover.isFull(this.board) ? true: false;
        }
		
		function getMoves(board) {
			var moves = [];
			this.board.forEach(function(tile, index) {
				tile === 0 ? moves.push(index) : null;
			});
			return moves;
		}
    }
    
    function minimax(game, depth){
       if(game.gameOver()){
           return {move: null, score: score(game, depth)};
       }
       
       var scores = [];
       var moves = [];
       
        depth += 1;
	   
      var children = game.getMoves(); 
      children.forEach(function(move){
    	var	childGame = gameConstructor();
    	childGame.board = JSON.parse(JSON.stringify(game.board));
    	childGame.activeTurn = game.activeTurn;
    	childGame.update(move);
    	scores.push(minimax(childGame, depth).score);
    	moves.push(move);
      });

     if(game.activeTurn === 1){ 
          var maxScoreIndex = scores.indexOf(Math.max.apply(null, scores));
          return {
              move: moves[maxScoreIndex],
              score: scores[maxScoreIndex]
          };
     }else { 

          var minScoreIndex = scores.indexOf(Math.min.apply(null, scores));
          return {
              move: moves[minScoreIndex],
              score: scores[minScoreIndex]
          };
     } 
    }
    
    function score(game, depth){
        if(mover.isWinner(1, game.board)){
            return 10 - depth;
        } else if(mover.isWinner(2, game.board)){
            return depth - 10;
        } else {
            return 0;
        }
    }
   
    
    function playTurn(move) {  
        if(!vm.currentGame){
            startGame();
        }
        var winner = vm.currentGame.winner(vm.currentGame.board);
        if (vm.currentGame.board[move] === 0 && winner === false) {
            vm.currentGame.update(move);
            vm.currentGame.update(minimax(vm.currentGame, 0).move);
            vm.currentGame.winners = vm.currentGame.winner(vm.currentGame.board);
        }
    }
	
    function startGame() {
		var firstMoves = [0,2,4,6,8];
		 vm.currentGame= vm.game();
        if (vm.firstMove === 'computer') {
			vm.currentGame.update(firstMoves[getRandom(firstMoves)]);
        }else{
            vm.currentGame.activeTurn = 2;
        }
    }

    function getRandom(arr) {
        return Math.floor(Math.random() * arr.length);
    }
}

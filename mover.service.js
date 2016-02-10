/*
global angular 
global $scope
*/

angular
	.module('app')
	.factory('mover', mover);

function mover(){
	var wins = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];
    
    
	return {
		isWinner: isWinner,
		isFull: isFull,
		winner: winner
	};

    function isWinner(player, board) {
        for (var i = 0; i < wins.length; i++) {
			var a, b, c;
			a = board[wins[i][0]];
			b = board[wins[i][1]];
			c = board[wins[i][2]];

			if (a === b && a === c && b === player) {
				return true;
			}
        }
        return false;
    }
	
	
    function winner(board) {
        for (var i = 0; i < wins.length; i++) {
			var a, b, c;
			a = board[wins[i][0]];
			b = board[wins[i][1]];
			c = board[wins[i][2]];

			if (a === b && a === c && b !== 0) {
				return wins[i];
			}
        }
        return false;
    }

	function isFull(board) {
        return board.every(function(tile) {
            return tile !== 0;
        });
    }


    
}



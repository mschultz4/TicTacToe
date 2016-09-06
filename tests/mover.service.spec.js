/*
global beforeEach
global inject
global expect
global board
global mover
*/

describe("Mover Service Tests", function(){
	
	beforeEach(module('app'));
    beforeEach(inject(function(_mover_){
		mover = _mover_;
	}));
	
	
	describe("getPlayerBoard", function(){	
		it("getPlayerBoard returns a player's current board", function() {
			var mockBoard = [0,'x',0,2,'x',0,2,0,2]; 
			expect(mover.getPlayerBoard('x',mockBoard)).toEqual([1,4]);
		});
		
		it("getPlayerBoard returns empty array if player has not moved", function() {
			var mockBoard = [0,0,0,0,0,0,0,0,0]; 
			expect(mover.getPlayerBoard(1,mockBoard)).toEqual([]);
		});
		
		it("getPlayerBoard can handle strings", function() {
			var mockBoard = [0,0,'x',0,'x',0,'y',0,0]; 
			expect(mover.getPlayerBoard('x',mockBoard)).toEqual([2,4]);
		});
	});
	
	describe("getWinningMoves", function(){		
		it("getWinningMoves returns an array including a single winning moves", function() {
			var mockBoard = [1,0,0,0,1,0,0,0,0]; 
			expect(mover.getWinningMoves(1,mockBoard)).toEqual([8]);
		});
		
		it("getWinningMoves returns an array including multiple winning moves", function() {
			var mockBoard = [1,0,2,2,0,2,2,0,0]; 
			expect(mover.getWinningMoves(2,mockBoard)).toEqual([4,8]);
		});
	});
	
	describe("getWinningMove", function(){	
		it("getWinningMove returns an integer", function() {
			var mockBoard = [1,0,2,2,0,2,2,0,0]; 
			expect(typeof mover.getWinningMove(2, mockBoard)).toEqual("number");
		});
		
		it("getWinningMove returns an undefined if no move exists", function() {
			var mockBoard = [1,0,2,2,0,2,2,0,0]; 
			expect(mover.getWinningMove(1, mockBoard)).toBeUndefined();
		});
	});
	
	
	describe("isWinner", function(){		
		it("identifies correct winner", function() {
			var mockBoard = [1,2,0,0,2,0,0,2,0]; 
			expect(mover.isWinner(2, mockBoard)).toBe(true);
		});

	});
	
	describe("isFull", function(){		
		it("returns true if board full", function() {
			var mockBoard = [1,2,1,2,2,1,1,2,2]; 
			expect(mover.isFull(mockBoard)).toBe(true);
		});

		it("returns false if board not full", function() {
			var mockBoard = [1,2,1,2,2,1,1,2,0]; 
			expect(mover.isFull(mockBoard)).toBe(false);
		});
	});
});

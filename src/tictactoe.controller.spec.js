/*
global beforeEach
global inject
global expect
global vm
global describe
*/

describe("TicTacToe Controller", function(){
	
	beforeEach(module('app'));
	var scope;
	var vm;
    
	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		vm = $controller("tictactoe", {
			$scope: scope
		});
    }));			
	
	describe("game.gameOver", function(){
		it("board is full", function() {
			var game = vm.game();
			game.board = [1,1,2,4,2,6,1,3,3];
			expect(game.gameOver()).toBe(true);
		});
		
		it("board of 0s is not over", function() {
			var game = vm.game();
			game.board = [0,0,0,0,0,0,0,0,0];
			expect(game.gameOver()).toBe(false);
		});
		
		it("returns a winner", function() {
			var game = vm.game();
			game.board = [1,1,1,4,2,6,1,3,3];
			expect(game.gameOver()).toBe(true);
		});
	});
	
	describe("game.getMoves", function(){
		it("returns available moves", function() {
			var game = vm.game();
			game.board = [0,1,2,4,2,0,1,3,0];
			expect(game.getMoves()).toEqual([0,5,8]);
		});
	});
	
	
	describe("score", function(){
		it("player 1 wins", function() {
			var game = vm.game();
			game.board = [1,1,1,4,2,6,1,3,3];
			expect(vm.score(game, 0)).toEqual(10);
		});
		
		it("player 2 wins", function() {
			var game = vm.game();
			game.board = [2,2,2,0,2,2,1,2,0];
			expect(vm.score(game, 0)).toBe(-10);
		});
		
		it("board is full with no winner", function() {
			var game = vm.game();
			game.board = [2,1,2,1,1,2,1,2,1];
			expect(vm.score(game, 0)).toBe(0);
		});
	});
	
	describe("minimax", function(){
		it("returns score if player is a winner", function() {
			var game = vm.game();
			game.board = [1,1,1,0,0,0,0,0,0];
			expect(vm.minimax(game, 0).score).toBe(10);
		});
		
		it("subtracts depth from score", function() {
			var game = vm.game();
			game.board = [1,1,1,0,0,0,0,0,0];
			expect(vm.minimax(game, 2).score).toBe(8);
		});
		
		it("returns null if board is full and no winner", function() {
			var game = vm.game();
			game.board = [1,2,1,1,1,2,2,1,2];
			expect(vm.minimax(game, 0).move).toBeNull();
		});
		
		it("returns winner if winner is next move", function() {
			var game = Object.create(vm.game());
			game.board = [1,1,0,0,0,1,1,0,0];
			expect(vm.minimax(game, 0).move).toBe(2);
		});
		
		it("blocks opponent's winner", function() {
			var game = vm.game();
			game.board = [1,1,2,0,0,0,0,0,2];
			expect(vm.minimax(game, 0).move).toBe(5);
		});
		
		it("creates fork", function() {
			var game = vm.game();
			game.board = [1,1,2,2,0,0,0,0,0];
			expect(vm.minimax(game, 0).move).toBe(4);
		});
		
		it("blocks/creates fork", function() {
			var game = vm.game();
			game.board = [1,2,1,0,0,0,0,0,2];
			expect(vm.minimax(game, 0).move).toBe(6);
		});
		
		it("blocks win", function() {
			var game = vm.game();
			game.board = [1,0,0,1,0,0,2,0,2];
			expect(vm.minimax(game, 0).move).toBe(7);
		});
	});
	
	describe("startGame", function(){
		it("changes turn correctly", function() {
			vm.firstMove = 'computer';
			vm.startGame();
			expect(vm.currentGame.activeTurn).toEqual(2);
		});
		
		it("moves to starting position", function() {
			vm.firstMove = 'computer';
			vm.startGame();
			expect([0,2,4,6,8]).toContain(vm.currentGame.board.indexOf(1));
		});
		
		it("changes turn for human", function() {
			vm.firstMove = 'human';
			vm.startGame();
			expect(vm.currentGame.activeTurn).toEqual(2);
		});
		
		it("Board has no moves for human", function() {
			vm.firstMove = 'human';
			vm.startGame();
			expect([0,0,0,0,0,0,0,0,0]).toEqual(vm.currentGame.board);
		});
	});


});

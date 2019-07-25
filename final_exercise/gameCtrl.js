// constant variables 
var constants = new (function() {
    var rows = 3;
    var columns = 6;
    var numMatches = (rows * columns) / 2;
    this.getRows = function() { return rows; };
    this.getColumns = function() { return columns; };
    this.getNumMatches = function() { return numMatches; };
})();

module.controller("gameCtrl", function($scope,$rootScope, $timeout, serviceService, dataService, globalConst) {
	$rootScope.guesses = 0
	$rootScope.correct = 0
	$scope.deck = serviceService.createDeck();
	$scope.isGuarding = true;
	$scope.inGame = false;

	$scope.check = function(card) {
		if (globalConst.currentSessionOpen && globalConst.previousCard != card && globalConst.previousCard.item == card.item && !card.isFaceUp) {
			card.isFaceUp = true;
			globalConst.previousCard = null;
			globalConst.currentSessionOpen = false;
			globalConst.numPairs++;
			$rootScope.guesses++;
			$rootScope.correct++;
		} else if(globalConst.currentSessionOpen && globalConst.previousCard != card && globalConst.previousCard.item != card.item && !card.isFaceUp) {
			$scope.isGuarding = true;
			card.isFaceUp = true;
			globalConst.currentSessionOpen = false;
			$rootScope.guesses++;			
			$timeout(function() {
				globalConst.previousCard.isFaceUp = card.isFaceUp = false;
				globalConst.previousCard = null;
				$scope.isGuarding = $scope.timeLimit ? false : true;
			}, 1000);
		} else {
			card.isFaceUp = true;
			globalConst.currentSessionOpen = true;
			globalConst.previousCard = card;
		}	

		if (globalConst.numPairs == constants.getNumMatches()) {
			$scope.stopTimer();
		}
		 
	} //end of check()

	// for the timer
	$scope.timeLimit = 60000;
	$scope.isCritical = false;
	
	var timer = null;

	// start the timer as soon as the player presses start
	$scope.start = function(){
		// I need to fix this redundancy. I initially did not create this
		// game with a start button.
		$scope.deck = serviceService.createDeck();
		// set the time of 1 minutes and remove the cards guard
		$scope.timeLimit = 60000;
		$scope.isGuarding = false;
		$scope.inGame = true;

		($scope.startTimer =function() {
			$scope.timeLimit -= 1000;
			$scope.isCritical = $scope.timeLimit <= 10000 ? true : false;
			
			timer = $timeout($scope.startTimer, 1000);
			if ($scope.timeLimit === 0) {
				$scope.stopTimer();
				$scope.isGuarding = true;
			}
		})();
	}	
	// function to stop the timer
	$scope.stopTimer = function() {
	  $timeout.cancel(timer);
	  $scope.inGame = false;
	  globalConst.previousCard = null;
	  globalConst.currentSessionOpen = false;
	  globalConst.numPairs = 0;
	}

}); 


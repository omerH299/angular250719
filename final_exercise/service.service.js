module.service("serviceService", function (globalConst, dataService) {

    this.createDeck = function() {
        var rows = constants.getRows();
        var cols = constants.getColumns();
        var key = this.createRandom();
        var deck = {};
        deck.rows = [];
    
        // create each row
        for(var i = 0; i < rows; i++) {
            var row = {};
            row.cards = [];
            
            // creat each card in the row
            for (var j = 0; j < cols; j++) {
                var card = {};
                card.isFaceUp = false;
                card.item = key.pop();
                row.cards.push(card);
            }
            deck.rows.push(row);
        }
        return deck;
    }
    
    // used to remove something form an array by index
    this.removeByIndex = function(arr, index) {
        arr.splice(index, 1);
    }

    this.insertByIndex = function(arr, index, item) {
	    arr.splice(index, 0, item);
    }

    this.createRandom = function() {
        var matches = constants.getNumMatches();
        var pool = [];
        var answers = [];
        var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'
                        , 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'
                        , 'S', 'T', 'U', 'W', 'X', 'Y', 'Z'];
        
        var hiragana = ['あ', 'い', 'う', 'え', 'お', 'か', 'が', 'き'
                        , 'ぎ', 'く', 'ぐ', 'け', 'げ', 'こ', 'ご', 'さ'
                        , 'ざ', 'し', 'じ', 'す', 'ず', 'せ', 'ぜ', 'そ'
                        , 'ぞ', 'た', 'だ', 'ち', 'ぢ', 'つ', 'づ', 'て'
                        , 'で', 'と', 'ど', 'な', 'に', 'ぬ', 'ね', 'の'
                        , 'は', 'ば', 'ぱ', 'ひ', 'び', 'ぴ', 'ふ', 'ぶ'
                        , 'ぷ', 'へ', 'べ', 'ぺ', 'ほ', 'ぼ', 'ぽ', 'ま'
                        , 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら'
                        , 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん'];
        // set what kind of item to display
        var items = hiragana;
    
        // create the arrays for random numbers and item holder
        for (var i = 0; i < matches * 2; i++) {
            pool.push(i); // random numbers
        }
        
        // generate an array with the random items
        for (var n = 0; n < matches; n++) {
            // grab random letter from array and remove that letter from the
            // original array
            var randLetter = Math.floor((Math.random() * items.length));
            var letter = items[randLetter];
            this.removeByIndex(items, randLetter);
            // generate two random placements for each item
            var randPool = Math.floor((Math.random() * pool.length));
            
            // remove the placeholder from answers and insert the letter into 
            // random slot
            this.insertByIndex(answers, pool[randPool], letter);
            
            // remove random number from pool
            this.removeByIndex(pool, randPool);
            
            // redo this process for the second placement
            randPool = Math.floor((Math.random() * pool.length));
            this.insertByIndex(answers, pool[randPool], letter);
    
            // remove rand number from pool
            this.removeByIndex(pool, randPool);
        }
        return answers;
    } 
});
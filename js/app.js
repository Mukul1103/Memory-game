//Stopwatch initialise
var stop = 0;
var minutes = 0;
var seconds = 0;
var hours = 0;

window.onload = function() {
    setInterval(function() {
        if (stop === 0) {
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
            if (minutes === 60) {
                hours++;
                minutes = 0;
                seconds = 0;
            }
            $('.stopWatch').html(hours + ':' + minutes + ':' + seconds);
        }
    }, 1000);
};

start();
var moves = 0;
var visible = [];
var stars = 3;


//initializes the game
function start() {
    var elements = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond']
    cards = shuffle(elements);
    var deck = document.getElementsByClassName('deck')[0];
    for (var index = 0; index < 16; index++) {
        deck.innerHTML += '<li class="card"><i class="fa fa-' + cards[index] + '"></i></li>';
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//jQuery function for card click
$('.card').click(function() {
    
    if(!($(this).hasClass('show') || $(this).hasClass('match'))){
        moves=moves+1;
        $('.moves').html(moves);
        checkstar();
        $(this).addClass('show');
        visible.push($(this));
        if (visible.length % 2 == 0) {
            setTimeout(cardmatch, 300);
        }
    }
});

//this function matches cards.
function cardmatch() {

    if (visible[visible.length - 2].html() == visible[visible.length - 1].html()) {
        visible[visible.length - 2].removeClass('show');
        visible[visible.length - 2].addClass('match');
        visible[visible.length - 1].removeClass('show');
        visible[visible.length - 1].addClass('match');
    } 
    else {
        visible[visible.length - 1].removeClass('show');
        visible[visible.length - 2].removeClass('show');
        visible.pop();
        visible.pop();
    }

    if (visible.length == 16) {
        
        swal({
                        type: 'success',
                        title: 'Congratulations',
                        text: 'You completed the game in ' + moves + ' moves and ' + stars + ' stars in just ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds. Do you want to play again?',
                        confirmButtonText: 'Yes',
                        confirmButtonColor: '#00FF00',
                        focusConfirm: true,
                        showCancelButton: true,
                        cancelButtonText: 'No',
                        cancelButtonColor: '#FF0000',
                        allowOutsideClick: false
                    }).then(function() {
                        location.reload();
                    }, function(dismiss) {
                        window.close();
                    });
                     stop = 1;
            $('.stopWatch').html('0:0:0');
                
    }
}



//this function checks star ratings.
function checkstar(){
    if (moves == 25) {
            $('.star1').hide();
            stars = 2;
        }
        if (moves == 30) {
            $('.star2').hide();
            stars = 1;
        }
        
}


//reload the game on restart button
$('.restart').on('click', function() {
    location.reload();
});

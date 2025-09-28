// btn k click p dosra card show ho 

// aik array banaii k sb cards ki id ki

// var cards = ["card1", "card2", "card3", "card4"];

// var current = 0;

// var buttons = document.querySelectorAll(".next-btn");

// for (var i=0; i < buttons.length; i++){

//     buttons[i].addEventListener("click", function(){

//         // pehla card hide
//         document.getElementById(cards[current]).style.display ="none";

//         current++; //next card 
//         if(current < cards.length){
//             // agla card show ho
//             document.getElementById(cards[current]).style.display = "block";
//         }else{
//             alert("Quiz Finished")
//         }
//     })
// };






var cards = ["card1", "card2", "card3", "card4", "card5"]; // include all cards
var current = 0;
var score = 0;

function resetOptions(card) {
    var options = card.querySelectorAll(".option");
    options.forEach(function(opt) {
        opt.style.backgroundColor = "";
        opt.style.pointerEvents = "auto"; // enable clicking again
    });
}

function disableOptions(card) {
    var options = card.querySelectorAll(".option");
    options.forEach(function(opt) {
        opt.style.pointerEvents = "none"; // disable clicking after selection
    });
}

function showResult(card) {
    // Create or update a result paragraph at the bottom of the card
    var result = card.querySelector(".result");
    if (!result) {
        result = document.createElement("p");
        result.className = "result";
        result.style.marginTop = "20px";
        result.style.fontWeight = "bold";
        card.appendChild(result);
    }
    result.textContent = `Your current score: ${score} / ${cards.length}`;
}

function setupCard(cardId) {
    var card = document.getElementById(cardId);
    var options = card.querySelectorAll(".option");
    var nextBtn = card.querySelector(".next-btn");
    nextBtn.disabled = true;
    nextBtn.style.backgroundColor = "rgba(255, 255, 0, 0.82)"; // reset button color

    resetOptions(card);

    options.forEach(function(option) {
        option.addEventListener("click", function() {
            if (nextBtn.disabled === false) return; // prevent multiple clicks

            var isCorrect = option.getAttribute("data-correct") === "true";

            if (isCorrect) {
                option.style.backgroundColor = "lightgreen";
                nextBtn.style.backgroundColor = "green";
                score++;
            } else {
                option.style.backgroundColor = "salmon";
                nextBtn.style.backgroundColor = "red";

                // Highlight the correct option
                options.forEach(function(opt) {
                    if (opt.getAttribute("data-correct") === "true") {
                        opt.style.backgroundColor = "lightgreen";
                    }
                });
            }

            disableOptions(card);
            nextBtn.disabled = false;
        });
    });
}

function showCard(index) {
    cards.forEach(function(cardId, i) {
        var card = document.getElementById(cardId);
        if (i === index) {
            card.style.display = "block";
            setupCard(cardId);
        } else {
            card.style.display = "none";
        }
    });
}

var buttons = document.querySelectorAll(".next-btn");

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        var currentCard = document.getElementById(cards[current]);
        showResult(currentCard);

        current++;
        if (current < cards.length) {
            showCard(current);
        } else {
            alert(`Quiz Finished! Your final score is ${score} / ${cards.length}`);
            // Optionally, reset quiz:
            // current = 0;
            // score = 0;
            // showCard(current);
        }
    });
});

// Initialize first card
showCard(current);
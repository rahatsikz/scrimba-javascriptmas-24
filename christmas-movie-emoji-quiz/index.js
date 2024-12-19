/*
You are going to build an app that challenges players to identify a Christmas Movie from some emoji 🍿 🎅 🎬. The players will have 3 guesses per movie.

For example, the emoji 🌇 💣 👮 ✈️ ️🔫  represent the film “Die Hard”, which everyone knows is the best Christmas movie of all time.

In data.js you have an array of Christmas movies with emoji and text for aria labels.

Your task is to build an app that meets these criteria:

- The app should present the player with a set of emoji selected at random from the array in data.js. 

- The player will input their guess.

- If the player guesses correctly, the app should display a message saying "Correct!". Then, after a pause of 3 seconds, it should randomly select the next set of emoji clues and display them to the player.

- If the player’s guess is incorrect, the app should display a message saying “Incorrect! You have 2 more guesses remaining.”

- If the player fails to guess correctly on the next two attempts, the app should display a message saying, `The film was <Film Name Here>!`. After a pause of 3 seconds, it should randomly select a new set of emoji clues and display them to the player.

- When all films in the array have been used, the player should see a message saying "That's all folks!".

- Each film should only be used once. There should be no repetition. 


Stretch Goals

- Use AI to decide if an answer is correct or incorrect. For example if the correct answer is "The Polar Express" but the player inputs "Polar Express" a straight comparison of the two strings will find that the player's answer was incorrect. AI could assess if there is sufficient similarity between the strings to judge it as correct. 

- Improve the UX by disabling the form/button when the game is over and during the pause between questions.
*/

import { films } from '/data.js'

// Some useful elements
const guessInput = document.getElementById('guess-input');
const submitButton = guessInput.querySelector('button');
const messageContainer = document.getElementsByClassName('message-container')[0]
const emojiCluesContainer = document.getElementsByClassName('emoji-clues-container')[0]
let randomCount;  
let chances = 3;


function getNewEmojiSet() {
    if(films.length === 0) {
        emojiCluesContainer.innerText = "";
        disableButton('Done');
        messageContainer.innerText = "That's all folks!";
        return;
    }
    randomCount = Math.floor(Math.random() * films.length);
    emojiCluesContainer.innerText = films[randomCount].emoji.join(" "); 
}

guessInput.addEventListener("submit", handleSubmit)

function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj =  Object.fromEntries(formData);
    const inputValue = formObj['guess-input'];
    if(!inputValue) return;
    
    if(aiMatch(inputValue, films[randomCount].title)){
        messageContainer.innerText = "Correct!";
        disableButton('loading ...');
        triggerNewSet();
        guessInput.reset();
        
    } else {
        chances--;
        if(chances === 0){
            messageContainer.innerText = `The film was: ${films[randomCount].title} !`
            disableButton('loading ...');
            triggerNewSet();
            guessInput.reset();
        } else {
            messageContainer.innerText = `Incorrect! You have ${chances} more guesses remaining.`
        }
    }
    
}

function triggerNewSet(){
    setTimeout(()=>{
        messageContainer.innerText = "";
        films.splice(randomCount , 1);
        chances = 3;
        submitButton.removeAttribute('disabled');
        submitButton.innerText = 'Submit Guess'
        getNewEmojiSet();            
    },3000)
}

function disableButton(text) {
    submitButton.setAttribute('disabled','true');
    submitButton.innerText = text;
}

getNewEmojiSet();

/* 
strech goal -> as i couldn't use ai directly, I used a basic function 
for matching user input and Actual answer 
 */

function aiMatch(input, answer) {
    const inputWords = input?.toLowerCase()?.trim()?.split(/\s+/);
    const answerWords = answer?.toLowerCase()?.trim()?.split(/\s+/);

    if (inputWords?.length > answerWords?.length) return false;

    let maxMatch = 0;

    // implemented sliding window
    for (let i = 0; i <= answerWords?.length - inputWords?.length; i++) {
        let tempMatch = 0;

        for (let j = 0; j < inputWords?.length; j++) {
            if (inputWords[j] === answerWords[i + j]) {
                tempMatch++;
            }
        }

        maxMatch =  tempMatch;
    }
    

    const matchedPercentage = (maxMatch / inputWords?.length) * 100;

    return matchedPercentage >= 75;
}

// console.log(aiMatch("grinch", 'the grinch'))
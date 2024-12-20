const snowGlobe = document.querySelector('.snow-globe');
const button = document.querySelector("button");
const fullGlobe = document.querySelector("#full-globe");


let fallCount = 0;
let snowFallTimer;
const defaultTimer = 400;
const boostTimer = 50;

function createSnowflake() {
    // random numbers calculation
    const duration = Math.floor(Math.random()*(8-5+1)) +5;
    const size = Math.floor(Math.random()*(20-12+1)) +12;
    const airFlow = Math.floor(Math.random()*(200- 0 +1));
    const fallingPosition = Math.floor(Math.random()*100);
    
    // snowflakes
    const newDiv = document.createElement("div");
    newDiv.classList.add("snowflake");
    newDiv.innerText = fallCount === 25 ? "☃️" : "❄️";
    
    if(fallCount === 25) fallCount = 0; 
        
    // styling
    newDiv.style.setProperty('--left-position', fallingPosition + "%");
    newDiv.style.setProperty("--fall-duration", `${duration}s`)
    newDiv.style.setProperty('--airflow', `${airFlow}px`);
    newDiv.style.fontSize=`${size}px`;
    
    snowGlobe.appendChild(newDiv);
    
    // reducing opacity before removing
    setTimeout(()=> {
        newDiv.style.opacity = 0.5;
    },duration*700);
    
    // remove snowflake after animation ends
    newDiv.addEventListener("animationend", () => {
        newDiv.remove();
    });
    
    fallCount++;
    
}

// function to call createSnoflake on interval
function snowFall(interval) {
    if(snowFallTimer) clearInterval(snowFallTimer);
    snowFallTimer = setInterval(createSnowflake,interval);
}

// to shake the globe
button.addEventListener('click', ()=> {
    // speed up falling when button clicked
    snowFall(boostTimer);
    // shake the whole globe
    fullGlobe.classList.add("shake");
    setTimeout(() => {
      fullGlobe.classList.remove("shake");
    }, 1000);
    // after 5 second of speedy falling, going back to normal speed
    setTimeout(()=> {
        snowFall(defaultTimer);
    },5000)
})

snowFall(defaultTimer);

// setInterval(createSnowflake, 100) // Let's create a snowflake every 100 milliseconds!
    

/* Stretch goals: 
- Give some variety to your snowflakes, so they are not all the same. Perhaps every 25th one could be a snowman ☃️?
- Remove each snowflake after a set time - this will stop the scene from being lost in a blizzard!
- Add a button that makes the snow start falling, it could trigger a CSS-animated shake of the snow globe. Then make the snow become less frequent until it slowly stops - until the button is pressed again.  
- Change the direction of the snowflakes so they don’t all fall vertically.
- Make the style your own! 
*/
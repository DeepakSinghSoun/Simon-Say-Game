let h2 = document.querySelector("h2");
let allBtns = document.querySelectorAll(".btn");

let btns = ["red", "green", "blue", "yellow"];

let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

// Start the game on keypress
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("started");
        started = true;
        levelUp();
    }
});

// Level up function
let levelUp = () => {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // Random color logic
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`#${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randBtn);
};

// Flash for game sequence
let gameFlash = (btn) => {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
};

// Flash when user clicks
let userFlash = (btn) => {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 300);
};

// Event listener for each button
function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id"); 
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Add event listener to each button
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Compare user input with game sequence
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) { 
        if (userSeq.length === gameSeq.length) {
            setTimeout(() => {
                levelUp(); 
            }, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>. <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "#0f172a";
        }, 200);
        reset();
    }
}

// Reset the game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

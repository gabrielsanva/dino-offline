const dino = document.querySelector(".dino"),
    background = document.querySelector(".background"),
    scoreSpan = document.getElementById("score");
let isJumping = false,
    score = 0,
    position = 0;
function handleKey(event) {
    if (event.keyCode === 32) {
        console.log("space :0");
        if (!isJumping) {
            jump();
        }

    }
}
function jump() {
    position = 0;
    isJumping = true;
    let upInterval = setInterval(() => {
        if (position < 160) {
            position += 20;
            dino.style.bottom = position + "px";
        } else {
            clearInterval(upInterval);
            downInterval = setInterval(() => {
                position -= 20;
                if (position >= 0) {
                    dino.style.bottom = position + "px";
                }
                else {
                    clearInterval(downInterval);
                    isJumping = false;
                }
            }, 30);
        }
    }, 20)
}
function createCactus() {
    const cactu = document.createElement("div");
    let randomTime = Math.random() * (2000 - 500) + 500;
    let cactuPosition = 1000;
    cactu.classList.add("cactu");
    cactu.style.left = 1000 + "px";
    background.appendChild(cactu);

    leftInterval = setInterval(() => {
        if (cactuPosition < -60) {
            background.removeChild(cactu);
            score++;
            scoreSpan.innerHTML = score;
        }
        else if (cactuPosition > 0 && cactuPosition < 60 && position < 60) {
            clearInterval(leftInterval);
            document.body.innerHTML = "<h1>Game Over</h1><h1>Score: " + score + "</h1>";

        } else {
            cactuPosition -= 10;
            cactu.style.left = cactuPosition + "px";
        }
    }, 20)

    setTimeout(createCactus, randomTime)
}
createCactus();
document.addEventListener("keydown", handleKey);
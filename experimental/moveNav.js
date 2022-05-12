const htmlNav = document.querySelector("nav");
const navContainer = document.querySelector(".navContainer");
const leftButton = document.getElementById("#moveLeft");
const rightButton = document.getElementById("#moveRight");

function moveLeft() {
    try {
        if(leftButton.style["display"] === "block") {
            leftButton.style["display"] = "none";
            htmlNav.style["left"] = "95%";
            navContainer.style["text-align"] = 'left';
            rightButton.style["display"] = "block";
        } else {
            console.log("How");
        }
    } catch(error) {
        console.log(error);
        leftButton.innerHTML = displayError('Error!', error);
    }
}

function moveRight() {
    try {
        if(rightButton.style["display"] === "block") {
            rightButton.style["display"] = "none";
            htmlNav.style["left"] = "5%";
            navContainer.style["text-align"] = '';
            leftButton.style["display"] = "block";
        } else {
            console.log("How");
        }
    } catch(error) {
        console.log(error);
        rightButton.innerHTML = displayError('Error!', error);
    }
}

leftButton.onclick = function() {
    moveLeft();
}

rightButton.onclick = function() {
    moveRight();
}
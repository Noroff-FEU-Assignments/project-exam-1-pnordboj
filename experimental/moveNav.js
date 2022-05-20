const htmlNav = document.querySelector("nav");
const navContainer = document.querySelector(".navContainer");
const leftButton = document.getElementById("moveLeft");
const rightButton = document.getElementById("moveRight");

// HTML Code
/*  
<div class="moveButton">
    <button id="moveLeft">Move Left</button>
    <button id="moveRight">Move Right</button>
</div>
*/

function moveLeft() {
    try {
        if(leftButton.style["display"] === "block") {
            console.log("Works");
            leftButton.style["display"] = `none`;
            htmlNav.style["left"] = "95%";
            htmlNav.style["right"] = "5%";
            navContainer.style["text-align"] = `left`;
            rightButton.style["display"] = `block`;
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
            console.log("Works");
            rightButton.style["display"] = "none";
            htmlNav.style["left"] = "5%";
            htmlNav.style["right"] = "95%";
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

rightButton.onClick = function() {
    moveRight();
}
const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const description = document.querySelector("#description");

// Error Text
const fullNameError = document.querySelector("#fullNameError");
const emailError = document.querySelector("#emailError");
const subjectError = document.querySelector("#subjectError");
const descriptionError = document.querySelector("#descriptionError");

const html = document.querySelector(".contactForm");
const button = document.querySelector("#submit");

function form() {
    event.preventDefault();
    
    if (requiredCheck(fullName.value, 5) === true) {
        fullNameError.style.display = "none";
    } else {
        fullNameError.style.display = "block";
    }

    if (requiredCheck(subject.value, 15) === true) {
        subjectError.style.display = "none";
    } else {
        subjectError.style.display = "block";
    }

    if (checkEmail(email.value, 0) === true) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
    }

    if (requiredCheck(description.value, 25) === true) {
        descriptionError.style.display = "none";
    } else {
        descriptionError.style.display = "block";
    }
}

button.onclick = function submit() {
    form();
}

function requiredCheck(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}

function checkEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const match = regEx.test(email);
    return match;
}
//Dynamic Text Code
const text = document.querySelector('.dynamic');
const cursor = document.querySelector('.cursor');

const texts = ["Queries", "Doubts", "Questions", "Complexities"];
let charindex = 0;
let index = 0;

let typingDelay = 200;
let erasingDelay = 200;
let NextLetterDelay = 2000;

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typing, NextLetterDelay);
});
const typing = () => {
    if (charindex < texts[index].length) {
        text.textContent += texts[index].charAt(charindex);
        charindex++;
        setTimeout(typing, typingDelay);
    }
    else {
        setTimeout(erase, NextLetterDelay);
    }
}
const erase = () => {
    if (charindex > 0) {
        text.textContent = texts[index].substring(0, charindex - 1)
        charindex--;
        setTimeout(erase, erasingDelay);
    }
    else {
        index++;
        if (index >= texts.length) {
            index = 0;
        }
        setTimeout(typing, NextLetterDelay)
    }
}
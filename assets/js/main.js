/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
})

/*====== TypeWriter effect ======*/
const TypeWriter = function(txtElement, words, wait = 3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 5);
    this.type();
    this.isDeleting = false;
}

document.addEventListener('DOMContentLoaded', init);
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement,words,wait);
}

TypeWriter.prototype.type = function() {
    const curr = this.wordIndex % this.words.length;
    const fullTxt = this.words[curr];

    // main typing logic
    if(this.isDeleting){
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    }
    else{
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // logic that handles both the ending of a word and moving to the next word
    this.txtElement.innerHTML = `<span class ="txt">${this.txt}</span>`;
    let typeSpeed = 250;

    if(this.isDeleting){
        typeSpeed /= 2;
    }
    
    if(!this.isDeleting && this.txt === fullTxt){
        typeSpeed = this.wait;
        this.isDeleting = true;
    }
    else if (this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        this.wordIndex ++;
        typeSpeed = 250;
    }

    setTimeout(() => this.type(), typeSpeed)
}

/*SCROLL HOME*/
sr.reveal('.home__title', {})
sr.reveal('.home__scroll', {delay: 200})
sr.reveal('.home__img', {origin:'right', delay: 400})

/*SCROLL ABOUT*/
sr.reveal('.about__img', {delay: 500})
sr.reveal('.about__subtitle', {delay: 300})
sr.reveal('.about__text', {delay: 500})
sr.reveal('.about__social-icon', {delay: 600, interval: 200})


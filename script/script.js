let winDom = document.querySelector('.win-counter')
let loseDom = document.querySelector('.lose-counter')
let  guessesLeftDom = document.querySelector('.guesses-counter')
let guessesDom = document.querySelector('.guesses')
let wordDom = document.querySelector('.word')
let imageDom = document.querySelector('.image')
let words = [
    {
        imgSrc:'https://media.newyorker.com/photos/59097652019dfc3494ea2c7d/master/w_2560%2Cc_limit/Gimein-Why-Digital-Money-Hasnt-Killed-Cash.jpg',
        word:'money'
    },
    {
        imgSrc:'https://cdn.britannica.com/70/191970-131-A85628DA/Color-wheel-light-color-spectrum.jpg',
        word:'color'
    }
]
function getRandomWord(){
    if(words.length > 0){
        let word = words[Math.floor(Math.random() * words.length)]
        return word
    }
    else{
        return false
    }
}
let word = getRandomWord()
function getLine(){
    let lines = '';
    if(words.length >0){
        for(i=0;i<word.word.length;i++){
            lines += '-'
        }
        return lines
    }
    else{
        return 'WINNNN🎉🎉🎉'
    }
}
let lines = getLine()
console.log(word,getLine())
getDom=()=>{
    winDom.innerHTML = game.win;
    loseDom.innerHTML = game.lose;
    guessesLeftDom.innerHTML = game.guessesLeft;
    guessesDom.innerHTML = game.guesses
    wordDom.innerHTML = lines
    if(words.length === 0) {
        imageDom.src ='https://cdn.pixabay.com/photo/2017/07/21/23/57/concert-2527495__480.jpg'
    }
    else{

        imageDom.src = word.imgSrc
    }
}

const game = {
    word : word.word,
    src: word.imgSrc,
    win:0,
    lose:0,
    guessesLeft:13,
    guesses:[],
    getInfo:function(){
        this.word = word.word
        this.src = word.imgSrc
    },
    checkguess:function(letter){
        if(this.word.includes(letter)){
            lines = this.word.split('').map(item=>item === letter ? letter:!lines.includes(item)? '-':item).join('')
            if(lines===this.word){
                this.win += 1;
                this.guesses = [];
                this.guessesLeft = 13;
                words.splice(words.indexOf(word),1)
                word = getRandomWord()
                console.log(this.word)
                lines = getLine()
                this.getInfo()
            }
        }
        else{
            if(!this.guesses.includes(letter)){
                this.guesses.push(letter)
                this.guessesLeft -=1
                if(this.guessesLeft === 0){
                    this.lose +=1
                    this.guessesLeft = 13
                    lines = getLine()
                    this.guesses = [];
                }
            }
        }
    }
}
window.onkeyup = function(e){
    game.checkguess(e.key)
    getDom()
}
getDom()
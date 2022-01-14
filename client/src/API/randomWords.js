let randomWords = require('random-words');

const randomWordsFunction =  () => {
    let options = {
        Easy : randomWords() ,
        Medium : randomWords() ,
        Hard : randomWords()
    }
    return options;
}

export {randomWordsFunction}
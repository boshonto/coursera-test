//Getting all variables
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const twitter = document.querySelector('.twitter');
const newQuote = document.querySelector('.newQuote');
const div = document.querySelector('.quote-author');

//Async await
const fetchQuote = async () => {

    try {
        //API Call
        const response = await fetch('https://type.fit/api/quotes');
        const data = await response.json();

        //Getting Randomized Quote
        const randomNumber = Math.floor(Math.random() * data.length);
        let randomQuote = data[randomNumber];
        
        //Replacing Quotes
        quote.textContent = randomQuote.text;

        //Checking Author Name
        if(randomQuote.author != null){
            author.textContent = randomQuote.author;
        }
        else {
            author.textContent = "Unknown";
        }
    }

    catch (err) {
        console.log(err.message);
    }

}

//Function Call
newQuote.addEventListener('click', () => {
    div.classList.remove('hidden');
    twitter.classList.remove('hidden');
    fetchQuote();
})

//Twitter Button 
function postTweet(quote, author) {
    let url = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(url, '_blank');
}

twitter.addEventListener('click', () => {
    postTweet(quote.textContent, author.textContent);
})
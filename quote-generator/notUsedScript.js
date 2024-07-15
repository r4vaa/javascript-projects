'use strict';


const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading

function loading() {
   loader.hidden = false;
   quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
   if (!loader.hidden) {
      quoteContainer.hidden = false;
      loader.hidden = true;
   }
}

// Get Quote from API
async function getQuote() {
   loading();
   const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
   const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
   try {
      const response = await fetch(proxyUrl + apiURL);
      const data = await response.json();

      // If Author is blank, add 'unknown'
      if (data.quoteAuthor === '') {
         authorText.innerText = 'Unknown';
      } else {
         authorText.innerText = data.quoteAuthor;
      }


      // If quote text is longer than 50 characters
      if (data.quoteText.length > 50) {
         quoteText.classList.add('long-quote');
      } else {
         quoteText.classList.remove('long-quote');
      }

      quoteText.innerText = data.quoteText;
   } catch (error) {
      getQuote();
      console.log('Whoooops, no quote', error);
   }

   // Stop and Show Loader
   complete();
}


// Tweet Quote
function tweetQuote() {
   const quote = quoteText.innerText;
   const author = authorText.innerText;
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} -  ${author}`;
   window.open(twitterUrl, '_blank');
}

// Event Listener
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on Load
// loading();
getQuote();
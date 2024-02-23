const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const facebookBtn = document.getElementById("facebook");
const linkedinBtn = document.getElementById("linkedin");
const smsBtn = document.getElementById("sms");
const newQuoteBtn = document.getElementById("new-quote");

const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = "https://enigmatic-tor-89593-b00267945cf2.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    console.log(data);
    // If Author is blank, add 'Unknown'
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    // Stop Loader, Show Quote
    removeLoadingSpinner();
    throw new Error("oops");
  } catch (error) {
    //getQuote();
    console.log("whoops, no quote", error);
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

function shareViaSMS() {
  // Get the quote text
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  // Create an SMS link
  const smsLink = `sms:?body=${encodeURIComponent(quote)} -${author}`;

  // Open the SMS link
  window.location.href = smsLink;
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

smsBtn.addEventListener("click", shareViaSMS);

// On Load
getQuote();

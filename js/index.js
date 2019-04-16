const config = {
  CONSUMER_KEY: "H0rOip9Gc5lWfBkwsbAHikHfS",
  CONSUMER_SECRET: "zMqgOnV6z3lDYTd3khcWtJ0Eyke2PeNmzhz3yPdz3aDUZKKyxT",
  ACCESS_TOKEN_KEY: "3424025068-CrqtCfBZW2nO7qJf906Kw63I0BLEymOxBTIWWqs",
  ACCESS_TOKEN_SECRET: "iIln7v6dCqSqGMFoHxkrtBzBQJreCmhRSJqjKW2APpaJw"
};

var search_btn = document.querySelector("#search_btn"),
  divide_btn = document.querySelector("#divide_btn");
// Attach Event to the Divide & Search Button
search_btn.addEventListener("click", searchTweets);
divide_btn.addEventListener("click", divisor);

// Function to search hashtags in tweet
function searchTweets() {
  var hashtag = document.querySelector("#tweet_search").value;
  const URL = "https://api.twitter.com/1.1/search/tweets.json?q=#" + hashtag;
  console.log(config.CONSUMER_KEY, URL);
  fetch(URL, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      consumer_key: config.CONSUMER_KEY,
      consumer_secret: config.CONSUMER_SECRET,
      access_token_key: config.ACCESS_TOKEN_KEY,
      access_token_secret: config.ACCESS_TOKEN_SECRET
    }
  })
    .then(response => response.json())
    .then(response => console.log("Success:", JSON.stringify(response)))
    .catch(error => console.error("Error:", error));
}

function divisor() {
  var numerator = document.querySelector("#int_dividend").value,
    denominator = document.querySelector("#int_divisor").value,
    divide_result = document.querySelector("#divide_result");

  // Check if Denominator equals zero
  // Returns Error
  if (denominator == 0) {
    alert("Error!");
    return;
  }

  //get range of possible quotient
  var range = [];
  var min_range = Math.min(numerator, denominator);
  var max_range = Math.max(numerator, denominator);
  //reset minimum range value when necessary
  min_range = min_range > 0 ? 1 : min_range;
  max_range = max_range < 0 ? 1 : max_range;
  //save range of values in an array
  for (var i = min_range; i <= max_range; i++) {
    if (i == 0) {
      continue;
    }
    range.push(i);
  }
  //get quotient and remainder
  var quotient, remainder;
  var result = {};
  for (var i = 0; i < range.length; i++) {
    remainder = numerator - range[i] * denominator;
    if (range.indexOf(remainder) !== -1) {
      quotient = quotient > range[i] ? range[i] : quotient || range[i];
    }
  }
  //get optimum remainder
  remainder = numerator - quotient * denominator;

  // Build result string
  var result_text =
    "<h4>Quotient: " +
    quotient +
    "</h4>" +
    "<h4>Remainder: " +
    remainder +
    "</h4>";

  // Show result to Div
  divide_result.innerHTML = result_text;
}

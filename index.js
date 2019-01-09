window.onload = randomJoke;
function randomJoke() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      const jokeObj = JSON.parse(xhr.response);
      const jokeText = document.querySelector('#joke-text');
      const jokeAuthor = document.querySelector('#joke-author');
      const jokeScore = document.querySelector('#joke-score');
      jokeText.innerText = jokeObj.joke;
      jokeAuthor.innerText = `- ${jokeObj.author}`;
      jokeScore.innerText = `Score: ${jokeObj.score}`;

      const buttons = document.querySelector('#button-span');
      buttons.innerHTML = `<button id = "up" class = "btn" onclick = "vote('up', ${
        jokeObj.jokeid
      })">Ha ha ha!</button> <button id = "down" class = "btn" onclick = "vote('down', ${
        jokeObj.jokeid
      })"> No </button>`;
    }
  };
  xhr.open('GET', '/api/jokes/random');
  xhr.send();
}
// function to run when vote buttons are clicked
const vote = (vote, jokeid) => {
  const buttons = document.querySelector('#button-span');
  buttons.innerHTML = `Casting vote...`;
  const xhrvote = new XMLHttpRequest();
  buttons.innerHTML = `Casting vote...`;
  xhrvote.onreadystatechange = () => {
    if (xhrvote.readyState === 4 && xhrvote.status === 200) {
      const votedJoke = JSON.parse(xhrvote.response);
      buttons.innerHTML = `Vote accepted!`;
      const voteScore = document.querySelector('#joke-score');
      voteScore.innerHTML = `Score: ${votedJoke.score}`;
    }
  };
  xhrvote.open('POST', '/api/jokes/vote');
  xhrvote.setRequestHeader('Content-Type', 'application/json');
  xhrvote.send(JSON.stringify({ vote, jokeid }), null, 2);
};
function tweet() {
  const joke = document.querySelector('#joke-text').innerText;
  const author = document.querySelector('#joke-author').innerText;
  const fullTweet = `${joke} ${author}  (found on jokerRank)`;
  const tweetLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    fullTweet
  )}`;
  window.open(tweetLink, '_blank');
}

module.exports = { tweet, vote, randomJoke };

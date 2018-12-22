window.onload = function() {
  const jokediv = document.querySelector("#randomjoke");
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      const display = document.querySelector("#randomjoke");
      const jokeobj = JSON.parse(xhr.response);
      console.log(jokeobj);
      display.innerHTML = `<span>${jokeobj.joke}</span><br><span> - ${
        jokeobj.author
      }</span> <br> <span id = "vote-score">Score: ${jokeobj.score} </span> <br>
          <span id = "button-span"></span>
          `;
      // button-span declared above and selected below
      const buttons = document.querySelector("#button-span");
      buttons.innerHTML = `<button id = "up" class = "btn" onclick = "vote('up', ${
        jokeobj.jokeid
      })">Ha ha ha!</button> <button id = "down" class = "btn" onclick = "vote('down', ${
        jokeobj.jokeid
      })"> No </button>`;
      console.log("end of function");
    }
  };
  xhr.open("GET", "/api/random");
  xhr.send();
};
// function to run when vote buttons are clicked
const vote = (vote, jokeid) => {
  console.log(vote, jokeid);
  const xhrvote = new XMLHttpRequest();
  console.log("request created");
  xhrvote.onreadystatechange = () => {
    console.log(xhrvote);
    if (xhrvote.readyState === 4 && xhrvote.status === 200) {
      const votedJoke = JSON.parse(xhrvote.response);
      const buttons = document.querySelector("#button-span");
      buttons.innerHTML = `Vote accepted!`;
      const voteScore = document.querySelector("#vote-score");
      voteScore.innerHTML = `Score: ${votedJoke.score}`;
    }
  };
  xhrvote.open("POST", "/api/vote");
  xhrvote.setRequestHeader("Content-Type", "application/json");
  xhrvote.send(JSON.stringify({ vote, jokeid }), null, 2);
};

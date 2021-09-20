import React, { useState, useEffect } from "react";
import "./styles.css";


export default function App() {
  const url = 'http://127.0.0.1:8080/api/v1/capitals';
  const headers = {'Content-Type': 'application/json'};
  const [score, setScore] = useState(0);
  const [region, setRegion] = useState('');
  let userGuess = "";

  useEffect(() => {
    getNewCountry()
  // eslint-disable-next-line
  }, [])

  const getNewCountry = () => {
    const answerCorrectElem = document.querySelector("#answerCorrect");
    const answerIncorrectElem = document.querySelector("#answerIncorrect");
    answerCorrectElem.classList.add("hidden");
    answerIncorrectElem.classList.add("hidden");
    fetch(url, { headers })
      .then(response => response.json())
      .then(data => {
        // normalise letters to remove accents
        data.capital = data.capital.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        setRegion(data);
      })
      .catch(error => {
        console.log("Fetch error: ", error)
      });
  }

  const submitUserGuess = () => {
    const answerCorrectElem = document.querySelector("#answerCorrect");
    const answerIncorrectElem = document.querySelector("#answerIncorrect");

    let userGuessElement = document.getElementById("guess");
    userGuess = userGuessElement.value;
    userGuessElement.value = "";

    let guessCleaned = userGuess.trim();
    if (guessCleaned === "") {
      return null;
    }

    guessCleaned = guessCleaned.toLowerCase();

    if (guessCleaned === region.capital.toLowerCase()) {
      incrementScore();
      answerCorrectElem.classList.remove("hidden");      
      setTimeout(getNewCountry, 3000)
    } else {
      decrementScore();
      answerIncorrectElem.classList.remove("hidden");
      setTimeout(getNewCountry, 4000)
    }
  };
  
  const enterPress = event => {
    if (event.key === 'Enter') {
      submitUserGuess();
      }
    }

  const incrementScore = () => {
    setScore((prevScore) => prevScore + 1);
  };
  const decrementScore = () => {
    setScore((prevScore) => prevScore - 1);
  };

  return (
    <div className="App">
      <h2>Guess The Capital City Of...</h2>
      <h1 className="country"> {region.country} </h1>
      <br />
      <div className="guess__container">
        <label htmlFor="guess">My Guess</label>
        <input 
          type="text" 
          id="guess"
          className="inputBox"
          onKeyPress={enterPress}/>
        <input
          type="submit"
          id="submitGuess"
          value="Submit"
          onClick={submitUserGuess}
          />
      </div>
      <div className="score__wrapper">
        <p className="score__text">Your Score: {score}</p>
      </div>
      <div>
        <p 
          id="answerCorrect" 
          className="answerCorrect hidden"
          >Correct! on to the next country.</p>
        <p 
          id="answerIncorrect" 
          className="answerIncorrect hidden"
          >Incorrect! The right answer is: <strong>{region.capital}</strong></p>
      </div>
    </div>
  );
}

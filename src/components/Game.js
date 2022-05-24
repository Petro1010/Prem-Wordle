import React from "react";
import AutoCompleteInput from "./AutoCompleteInput";
import GuessDisplay from "./GuessDisplay";
import rawData from "../players.txt";
import PopUp from "./PopUp";

function Game(){
    //state to contain number of guesses
    const [guesses, setGuesses] = React.useState(0);
    //state to contain the pl players
    const [players, setPlayers] = React.useState([]);
    //state to contain the random player to try and guess
    const [randomPlayer, setRandomPlayer] = React.useState("");
    console.log(randomPlayer)
    //current guesses made by the player
    const [currentGuesses, setCurrentGuesses] = React.useState([]);
    //state to control popUp
    const [showPopUp, setShowPopUp] = React.useState(false);
    //keep track of win or lose
    const [won, setWon] = React.useState(false);


    //set up the players, with raw data for now
    React.useEffect(() => {
        fetch(rawData)
         .then(r => r.text())
         .then(text => {
            //console.log(text);
            let data = JSON.parse(text);
            setPlayers(data);
            //console.log(data);
            setRandomPlayer(data[Math.floor(Math.random()*data.length)])
         });
    },[]);

    function makeGuess(playerName) {
        if (!won && guesses < 20){
            const player = players.filter(player => player.name === playerName)[0] //filter data for the specfic player
            if (!player || currentGuesses.includes(player)) {
                alert("Invalid Guess!")
            } else {
                setCurrentGuesses(prevGuesses => [...prevGuesses, player]);
                if (randomPlayer.pid === player.pid){
                    setShowPopUp(true);
                    setWon(true);
                    return;
                }
                setGuesses(num => (num + 1));
                /*This updates guesses asyncrounously, so we must do the max guess check using a useEffect
                if (guesses === 2){
                    setShowPopUp(true);
                } */
            }
        }
    }

    //check if all guesses have been used
    React.useEffect(() => {
        //console.log(guesses)
        if (guesses === 20){
            setShowPopUp(true);
            //console.log("Used all guesses!");
        }
    }, [guesses])

    function togglePopUp(){
        setShowPopUp(false);
    }

    function restartGame(){
        //window.location.reload(false);  An option would be to get refresh the window
        setGuesses(0);
        setRandomPlayer(players[Math.floor(Math.random()*players.length)]);
        setCurrentGuesses([]);
        setShowPopUp(false);
        setWon(false);
    }

    //Next lines will auto scroll to bottom of guess container
    const messagesEndRef = React.useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    React.useEffect(() => {
        scrollToBottom();
    }, [currentGuesses]);

    //map the current guesses to the guess tab (conditionally render certain components by passing both guess and randomPlayer)
    const guessElements = currentGuesses.map(guess => <GuessDisplay key={guess.pid} correct={randomPlayer} {...guess}/>);  //pass in everything from player object
    return (
        //Send in the player names as autoFill suggestions
        <div className="game--container">
            {showPopUp && <PopUp onClose={togglePopUp} correctPlayer={randomPlayer} won={won} playAgain={restartGame}/>}
            <AutoCompleteInput suggestions={players.map(player => player.name)} guesses={guesses} makeGuess={makeGuess}/>
            <div className="guess--container">
                <div className="guess--header">
                    <p className="name">Name</p>
                    <p>Team</p>
                    <p>Nation</p>
                    <p>Age</p>
                    <p>Height</p>
                    <p>Position</p>
                </div>
                <div className="guesses">
                    {guessElements}
                    <div ref={messagesEndRef} />
                </div>
                
            </div>

        </div>

    );
};

export default Game;
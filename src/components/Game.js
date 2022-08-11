import React from "react";
import AutoCompleteInput from "./AutoCompleteInput";
import GuessDisplay from "./GuessDisplay";
import GamePopUp from "./GamePopUp";

function Game(props){
    //state to contain number of guesses
    const [guesses, setGuesses] = React.useState(0);
    //state to contain the pl players
    const [players, setPlayers] = React.useState([]);
    //state to contain the random player to try and guess
    const [randomPlayer, setRandomPlayer] = React.useState("");
    //current guesses made by the player
    const [currentGuesses, setCurrentGuesses] = React.useState([]);
    //state to control popUp
    const [showPopUp, setShowPopUp] = React.useState(false);
    //keep track of win or lose
    const [won, setWon] = React.useState(false);

    React.useEffect(() => {
        fetch('https://premier-league-players1.p.rapidapi.com/players', {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '76fe66a335msh8b2d9ac803072f2p1cad14jsn3b295dcdecb6',
              'X-RapidAPI-Host': 'premier-league-players1.p.rapidapi.com'
            }})
            .then(r => r.text())
            .then(text => {
                let data = JSON.parse(text);
                setPlayers(data);
                setRandomPlayer(data[Math.floor(Math.random()*data.length)])
            });
    },[]);

    const updateLowestGuess = () => props.lowerGuess(guesses + 1);

    function makeGuess(playerName) {
        if (!won && guesses < 20){
            const player = players.filter(player => player.name === playerName)[0] //filter data for the specfic player
            if (currentGuesses.includes(player)) {
                alert("Invalid Guess!")
            } else {
                if (!currentGuesses.length) props.gamePlayed(); //once the first guess is made, it counts as a game played
                setCurrentGuesses(prevGuesses => [...prevGuesses, player]);
                if (randomPlayer.pid === player.pid){
                    setShowPopUp(true);
                    setWon(true);
                    props.gameWon();
                    updateLowestGuess();
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
        if (guesses === 20){
            setShowPopUp(true);
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
            {showPopUp && <GamePopUp onClose={togglePopUp} correctPlayer={randomPlayer} won={won} playAgain={restartGame}/>}
            <AutoCompleteInput suggestions={players.map(player => player.name)} guesses={guesses} makeGuess={makeGuess}/>
            <div className="guess--container">
                <div className="guess--header">
                    <div className="name">NAME</div>
                    <div>TEAM</div>
                    <div>NAT</div>
                    <div>AGE</div>
                    <div>HT</div>
                    <div>POS</div>
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
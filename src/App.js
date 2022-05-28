import React from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import Footer from "./components/Footer";
import StatPopUp from "./components/StatPopUp";
import HelpPopUp from "./components/HelpPopUp";

function App() {
  //state to contain player stats
  const [stats, setStats] = React.useState(() => JSON.parse(localStorage.getItem("stats")) || {
    played: 0,
    won: 0,
    lowestGuesses: -1
  });
  //state to contain if stat pop up should be shown
  const [showStat, setShowStat] = React.useState(false);
  //state to contain if help pop up should be shown
  const [showHelp, setShowHelp] = React.useState(false);

  //use local storage to store the players stats
  React.useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats])

  function toggleStats() {
    if (!showHelp) setShowStat(prev => !prev);
  };

  function toggleHelp(){
    if (!showStat) setShowHelp(prev => !prev);
  }

  //update the stats within the game!!
  //update played, update won, update total guesses functions
  function updatePlayed(){
    setStats(prevStats => {
      return {
        ...prevStats,
        played: prevStats.played + 1
      };
    });
  };

  function updateWins(){
    setStats(prevStats => {
      return {
        ...prevStats,
        won: prevStats.won + 1
      };
    });
  };

  function updateLowGuess(num){
    if (stats.lowestGuesses === -1 || num < stats.lowestGuesses){
      setStats(prevStats => {
        return {
          ...prevStats,
          lowestGuesses: num
        };
      });
    };
  };

  return (
    <div className="App">
      <Header statOnClick={toggleStats} helpOnClick={toggleHelp} />
      {!showHelp && showStat && <StatPopUp onClose={toggleStats} {...stats} />}
      {!showStat && showHelp && <HelpPopUp onClose={toggleHelp}/>}
      <Game gamePlayed={updatePlayed} gameWon={updateWins} lowerGuess={updateLowGuess}/>
      <Footer />
    </div>
  );
}

export default App;

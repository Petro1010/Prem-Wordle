import React from "react";

function StatPopUp(props) {
    return (
        <div className="modal">
            <div className="modal--content">
                <span className="close" onClick={props.onClose}>
                    &times;
                </span>
                <div className="popup--info">
                    <h1>Stats:</h1>
                    <h3>Played: {props.played}</h3>
                    <h3>Won: {props.won}</h3>
                    <h3>Lowest Guesses: {props.lowestGuesses === -1 ? "--" : props.lowestGuesses}</h3>
                </div>
                
            </div>
        </div>
    );
};

export default StatPopUp;
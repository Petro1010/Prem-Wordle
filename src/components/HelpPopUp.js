import React from "react"

function HelpPopUp(props){
    return (
        <div className="modal">
            <div className="modal--content">
                <span className="close" onClick={props.onClose}>
                    &times;
                </span>
                <div className="help--info">
                    <h1>Guess the Premier League Player!</h1>
                    <ul>
                        <li>You get 20 guesses</li>
                        <li>Green in any column indicates a match</li>
                        <li>Arrows will indicate whether the mystery player has an attribute that is valued higher or lower than your guess</li>
                    </ul>
                </div>
                
            </div>
        </div>
    );
};

export default HelpPopUp;
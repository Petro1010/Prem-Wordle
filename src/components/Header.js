import React from "react";
import statIcon from "../images/statsIcon.png"
import helpIcon from "../images/helpIcon.png"

function Header(props) {
    return (
        <div className="header--container">
            <div className="header--placeholder"></div>
            <div className="header--title">
                <h1 className="title">Skrtel</h1>
                <h4>Premier League Player Guessing Game</h4>
            </div>
            <div className="header--buttons">
                <input type="image" alt="" src={statIcon} onClick={props.statOnClick} className="stats--button"/>
                <input type="image" alt="" src={helpIcon} onClick={props.helpOnClick} className="stats--button"/>
            </div>
            
        </div>
    );
};

export default Header;

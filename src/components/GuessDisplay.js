import React from "react"
import {countryNameToCode} from "../constants/countryNameToCountryCode";

function GuessDisplay(props) {
    //determine the height and age differences
    const heightCompare = props.height > props.correct.height ? " ↓" : (props.height === props.correct.height ? "" : " ↑");
    const ageCompare = props.age > props.correct.age ? " ↓" : (props.age === props.correct.age ? "" : " ↑");

    function getCountryFlag(nation) {
        let twoLetters = countryNameToCode[nation];
        let imagePath = process.env.PUBLIC_URL + `/flagspng/${twoLetters}.png`;
        return imagePath;
    }
    return (
        //conditionally render background colour to show if the property is correct or not
        <div className="guess">
            <h4 className="name">{props.name}</h4>
            <div style={{backgroundColor: props.correct.team === props.team ? "#37be75" : "#f2f2f2"}}>
                <img className="logo" src={process.env.PUBLIC_URL + `/eplLogos/${props.team}.png`}></img>
            </div>
            <div style={{backgroundColor: props.correct.nation === props.nation ? "#37be75" : "#f2f2f2"}}>
                <img className="flag" src={`${getCountryFlag(props.nation.replace(/\s+/g, '').toLowerCase())}`} alt={props.nation}/>
            </div>
            <div 
                style={{backgroundColor: props.correct.age === props.age ? "#37be75" : "#f2f2f2"}}
            >
                {props.age + ageCompare}
            </div>
            <div 
                style={{backgroundColor: props.correct.height === props.height ? "#37be75" : "#f2f2f2"}}
            >
                {props.height + heightCompare}
            </div>
            <div style={{backgroundColor: props.correct.position === props.position ? "#37be75" : "#f2f2f2"}}>{props.position}</div>
        </div>
    );
};

export default GuessDisplay;
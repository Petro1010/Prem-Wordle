import React from "react";

function AutoCompleteInput(props){
    //keep track of what is input
    const [textInput, setTextInput] = React.useState("");
    //keep track of the shown suggestions
    const [filteredSuggestions, setFilteredSuggestions] = React.useState([]);
    //keep track of the index of the active suggestions
    const [activeSuggestion, setActiveSuggestion] = React.useState(0);
    //keep track of whether to show suggestions or not
    const [showSuggestions, setShowSuggestions] = React.useState(false);

    //handle the updating of the input
    function handleChange(event){
        const userInput = event.target.value;
        const possibilities = props.suggestions.filter(suggestion => {
            //compare both strings in lower case. If input is contained somewhere in suggestion, add that suggestion to possibilities
            return suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1; 
        });

        setTextInput(userInput);
        setFilteredSuggestions(possibilities);
        setActiveSuggestion(0); //start the active suggestion from the beginning
        setShowSuggestions(true); //when user is typing show suggestions
    }

    //deals with the selection of player from the list
    function selectPlayer(event){
        //setTextInput(event.target.innerText); //set input to whatever the list item text was
        setFilteredSuggestions([]); //get rid of suggestions
        setActiveSuggestion(0);
        setShowSuggestions(false);
        props.makeGuess(event.target.innerText);
        setTextInput("");
    }

    function makeActive(event){
        setActiveSuggestion(filteredSuggestions.indexOf(event.target.innerText));
    }

    return (
        <div className="submission">
            <div className="input--container">
                <input 
                    type="text"
                    placeholder={`Guess ${props.guesses + 1} of 20`}
                    onChange={handleChange}
                    value={textInput}
                    maxLength={40}
                ></input>
                
                { showSuggestions && textInput && filteredSuggestions.length ?
                    (
                        <ul className="suggestions">
                            {filteredSuggestions.map((suggestion, index) => {
                                let className = "suggestion--inactive";
                                if (index === activeSuggestion) className = "suggestion--active";
                                return (
                                    <li className={className} key={suggestion} onClick={selectPlayer} onMouseEnter={makeActive}>
                                        {suggestion}
                                    </li>
                                );
                            })}
                        </ul>
                    )
                    :
                    (
                        <></>
                    )
                    //The above lines are pretty heavy so here is an explanation:
                    //If we have suggestions, show suggestions is on, and we have input, show them, if not, show nothing
                    //We need to get the active suggestion and display it differently, so we find it and give it a specific class name
                    //create all the list components of the current suggestion we have and display them                
                }
            </div>
        </div>
    );
};

export default AutoCompleteInput;
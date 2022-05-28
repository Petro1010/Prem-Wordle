import React from "react";

function AutoCompleteInput(props){
    //keep track of what is input
    const [textInput, setTextInput] = React.useState("");
    //keep track of the shown suggestions
    const [filteredSuggestions, setFilteredSuggestions] = React.useState([]);
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
        setShowSuggestions(true); //when user is typing show suggestions
    }

    //deals with the selection of player from the list
    function selectPlayer(event){
        setFilteredSuggestions([]); //get rid of suggestions
        setShowSuggestions(false);
        props.makeGuess(event.target.innerText);
        setTextInput("");
    }

    return (
        <div className="submission">
            <div className="input--container">
                <input
                    className="input--form"
                    type="text"
                    placeholder={`Guess ${props.guesses + 1} of 20`}
                    onChange={handleChange}
                    value={textInput}
                    maxLength={40}
                ></input>
                
                { showSuggestions && textInput && filteredSuggestions.length ?
                    (
                        <ul className="suggestions">
                            {filteredSuggestions.map((suggestion) => {
                                return (
                                    <li key={suggestion} onClick={selectPlayer}>
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
                    //create all the list components of the current suggestion we have and display them             
                }
            </div>
        </div>
    );
};

export default AutoCompleteInput;
import React, {useState, useReducer} from "react";


const initialInputState = {
    value: '',
    inputBlur: false
};

const inputStateReducer = (state, action) => {
    // Only send in dispatch function if the value is changing such as a string, not as boolean which can be changed 
        // via if statements and action.type. State is the last snapshot of the value your getting, action is the new value
            // dot notation of the thing you're sending up 
    if (action.type === 'INPUT')
    {
        // action.value is event.target.value from the function below
        return { value: action.value, inputBlur: state.inputBlur};
    }

    if(action.type === 'INPUT_BLUR')
    {
        // Can just set the values here but can also send in as action. whatever field you're trying to change.
        return {value: state.value, inputBlur: true};
    }
    
    if(action.type === 'RESET_INPUT')
    {
        return {value: "", inputBlur: false};
    }
    return inputStateReducer;
}

const useInput = (validateField) =>
{
    // first param is in array, state managed by reducer
    // dispatch function is the seoncd param in the array
    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);
    
    // using useReducer to manage multiple states, these 2
    // const [enteredField, setEnteredField] = useState("");
    // const [enteredFieldBlur, setEnteredFieldBlur] = useState(false);

    // Validate the field/input based on specific validation function passed in 
    const valueIsValid = validateField(inputState.value);

    // Tracking invalid state to show invalid css if so, uses validator function return value above
    const invalidField = !valueIsValid && inputState.inputBlur;

    // Stores value of the field/input
    const trackFieldHandler = (event) =>
    {
        dispatch({type:'INPUT', value: event.target.value});
        //setEnteredField(event.target.value);
    }

    // Changes focus state to true or false based on Blur of input/field
    const inputBlurHandler = (event) =>
    {
        dispatch({type:'INPUT_BLUR', inputBlur: true})
        //setEnteredFieldBlur(true);
    }

    // After the form passes validation on submit , reset the field two way bind value to an empty string and reset blur too 
    const resetFieldOnSubmitForm = () =>
    {
        dispatch({type: 'RESET_INPUT', value: "", inputBlur: false});
        // setEnteredField("");
        // setEnteredFieldBlur(false);
    }


    return {enteredField: inputState.value, valueIsValid, invalidField, trackFieldHandler, inputBlurHandler, resetFieldOnSubmitForm};
};

export default useInput;
import React, {useState, useReducer} from "react";


const initialInputState = {
    value: '',
    inputBlur: false
};

const inputStateReducer = (state, action) => {
    return inputStateReducer;
}

const useInput = (validateField) =>
{
    // first param is in array, state managed by reducer
    // dispatch function is the seoncd param in the array
    //const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);
    
    // using useReducer to manage multiple states, these 2
    const [enteredField, setEnteredField] = useState("");
    const [enteredFieldBlur, setEnteredFieldBlur] = useState(false);

    // Validate the field/input based on specific validation function passed in 
    const valueIsValid = validateField(enteredField);

    // Tracking invalid state to show invalid css if so, uses validator function return value above
    const invalidField = !valueIsValid && enteredFieldBlur;

    // Stores value of the field/input
    const trackFieldHandler = (event) =>
    {
        setEnteredField(event.target.value);
    }

    // Changes focus state to true or false based on Blur of input/field
    const inputBlurHandler = (event) =>
    {
        setEnteredFieldBlur(true);
    }

    // After the form passes validation on submit , reset the field two way bind value to an empty string and reset blur too 
    const resetFieldOnSubmitForm = () =>
    {
        setEnteredField("");
        setEnteredFieldBlur(false);
    }


    return {enteredField, enteredFieldBlur, valueIsValid, invalidField, trackFieldHandler, inputBlurHandler, resetFieldOnSubmitForm};
};

export default useInput;
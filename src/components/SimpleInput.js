//import {useState, useRef, useEffect} from 'react';
import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  // This can be done the same in BasicForm.js, the only difference is adding another input field
  // Changing to Custom Input Hook Based
    // This will be the name input js

// The custom hook is used 2 times: for both inputs of name and email
  // Used names after colons because the custom hook needs to be reusable among all these
      // can use names after colons for other input fields such as name, address, and more.
        // Can be seen through nameField vs emailField
  const  {enteredField: nameField, enteredFieldBlur : nameFieldFocused, invalidField: invalidNameField,
    valueIsValid: validNameField, trackFieldHandler: trackNameFieldHandler, inputBlurHandler: trackNameFocusHandler,
    resetFieldOnSubmitForm: resetNameField} = useInput((enteredFieldValue) => enteredFieldValue.trim() !== "");


  // There is two ways to track user input: Refs or State
  const {enteredField: emailField, enteredFieldBlur : emailFieldFocused, invalidField: invalidEmailField,
    valueIsValid: validEmailField, trackFieldHandler: trackEmailFieldHandler, inputBlurHandler: trackEmailFocusHandler,
    resetFieldOnSubmitForm: resetEmailField} = 
    // This anonymous function is the validation logic for the specific input which is email
  useInput((enteredFieldValue) => enteredFieldValue.includes("@"));

  //No need for useEffect, can just use derived state above and just set a let variable which disables and enables button based on button
    // submit below - based on field validity states and no need for else since original state is false.
      let formIsValid = false;
        if(validEmailField && validNameField)
        {
          formIsValid = true;
        }

  const onSubmitFormData = (event) => {
    // Console the result and resets the name to an empty string,
      // How to change actual input value?
        // run event.preventDefault() to stop reloading of page when the form is submitted
      event.preventDefault();

      // Run this touched here because the user submitting the form means they agree with what is in the input field.
        // This will also show the error now with the error input showing too

    // Basic Validation, Not Final
      // Not actual validation since the email validation is only checking if it has an @, need to search up more advanced validation, probably 
        // regex
  if(!validEmailField)
    {
      return console.log("The email has to contain or include the @ symbol");
    }
  else if(!validNameField)
  {
    return console.log("Your name must length must be greater than 1 character");
  }
    resetEmailField();
    resetNameField();
  };


  // Change CSS classes based  on fi validation is true or false 
    // switch invalid to the first option and just from-contorl to the seocnd option of false.
      // Because if false, that means enteredNameTouched hasn't been changed, only changed on submit of form to true
  const emailInputClasses = invalidEmailField ? 'form-control invalid' : 'form-control';
  const nameInputClasses = invalidNameField ? 'form-control invalid' : 'form-control';


  return (
    <form onSubmit={onSubmitFormData}>
      <div className={emailInputClasses}>
        <label htmlFor='name'>Your Email</label>
        {/* ref={nameInputRef}, can use both refs and states, this ref is for ref version, I'm goign to useState */}
        <input  type='text' id='email' onChange={trackEmailFieldHandler} onBlur={trackEmailFocusHandler} value={emailField}/>
        {invalidEmailField && <p className='error-text'>Email must contain an @ symbol</p>}
      </div>
      {/* <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div> */}

      <div className={nameInputClasses}>
        <label htmlFor='e-mail'>Your Name</label>
        <input  type='text' id='name' onChange={trackNameFieldHandler} onBlur={trackNameFocusHandler} value={nameField}/>
        {invalidNameField && <p className='error-text'>Name must be greater than 1 character</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

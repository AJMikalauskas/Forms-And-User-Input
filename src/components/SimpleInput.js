import {useState, useRef, useEffect} from 'react';

const SimpleInput = (props) => {
  // There is two ways to track user input: Refs or State
    // const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
    // Track whether the enteredName is valid through state, original state is false
      // Could run into problems with a useEffct() with this state as one of its dependencies
        // This is becasue an if statemnt with this as true would run when really it may not be valid
          // on the start this is false but we'd prefer to not show false input and error
            // So he set it to false and added another state of enteredNameTouched 
  //const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
    // This tracks whether the input field was touched yet - focus like 
      // But mainly for form, handles more use cases even though more code 
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  // States for email field
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailFocus, setEnteredEmailFocused] = useState(false);
  // Derived State of email
  const emailIsValid = enteredEmail.includes("@");
  const emailInputIsInvalid = !enteredEmail && enteredEmailFocus;

  // Overall form validity if there is more that one input
    // No need for this just can use let
 // const [formIsValid, setFormIsValid] = useState(false);


  // Use Derived State instead of enteredNameValidation state 
    // Deriving true and false with this semi state variable seen
      // Allows for removal of the if statements and changing valdiity based on if statements
        // One less state due to derived state
  const enteredNameIsValid = enteredName.trim() !== "";

    // Not show error if input field hasn't been typed in yet -> This is so error doesn't show up on load of the page
    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched; 

    // useEffect(() => 
    // {
      // The dependencies are all the valid/non-valid states returning true or false fields in the overall form which are the dependencies
        // such as age validator, email validator, name validator, etc.
          // If all field states valid, set form valid else if any are false, form valid is false
            // Disabled button if form isn't valid by adding disbaled={!formIsValid}, styling in index.css
        
      //No need for useEffect, can just use derived state above and just set a let variable which disbales and enables button based on button
        // submit below - based on field validity states and no need for else since original state is false.
        let formIsValid = false;
        if(enteredNameIsValid && emailIsValid)
        {
          formIsValid = true;
          //setFormIsValid(true);
        }
        // else
        // {
        //   formIsValid = false;
        //   //setFormIsValid(false);
        // }

   // },[enteredNameIsValid])

        const trackEmailHandler = (event) => {
          console.log(event.target.value);
          setEnteredEmail(event.target.value)
        }

        const emailInputFocusHandler = (event) =>
        {
          setEnteredEmailFocused(true);
        }

  const trackEnteredNameHandler = (event)  => {
    //Consoles and Tracks the users input into the input field
      // Two way binding is done by setting the state value to the value property of the input field,
        // so when the state is set to an empty string by form submit, the input is too
    console.log(event.target.value);
        // Change state but don't use in if statement since state doesn't update instantly
    setEnteredName(event.target.value);

    // if(event.target.value.trim()  !== '')
    // {
    //   setEnteredNameIsValid(true);
    //   //return;
    // }

  };


  //For Lost focus of the input fiels use onBlur = {this function}
  const nameInputBlurHandler = (event) => 
  {
    setEnteredNameTouched(true);
    //console.log(event.target.value);
    // if(enteredName.trim() === "")
    // {
    //   setEnteredNameIsValid(false);
    //   //return console.log("Your Name needs to be at least 1 character");
    // }
  }

  const onSubmitFormData = (event) => {
    // Console the result and resets the name to an empty string,
      // How to change actual input value?
        // run event.preventDefault() to stop reloading of page when the form is submitted
      event.preventDefault();

      // Run this touched here because the user submitting the form means they agree with what is in the input field.
        // This will also show the error now with the error input showing too
      setEnteredNameTouched(true);
      setEnteredEmailFocused(true);
    // Basic Validation, Not Final
      // by using validation of setEnteredNameIsValid, if validation if statement it's set to false
        // this will return and exit the function, but if validation is true it will go over the if stsatement and setEntered to false
          // JSX conditional below based on this to show message of name must not be empty if validation state is false
            // preset value is true so error doens't happen on start of page
  
  // The derived state above is the validator and doesn't need to be set to true and false but rather is just based on another state
  if(!enteredNameIsValid)
    {
      //setEnteredNameIsValid(false);
      return console.log("Your Name needs to be at least 1 character");
    }
    else if(!emailIsValid)
    {
      return console.log("The email has to contain or include the @ symbol");
    }
    //setEnteredNameIsValid(true);
    console.log(enteredName);
    // Derived state causes error for when form is submitted becuase the input or enteredname is set to an empty string below
      // causing derived state error to trigger 
        // To fix, since form is being submitted, input touched state needs to change and reset to the original state of false.
    setEnteredName("");
    setEnteredNameTouched(false);
    setEnteredEmail("");
    setEnteredEmailFocused(false);
    // Not good to directly mainpulate the DOM by resetting the Input Ref
      // console.log(nameInputRef.current.value);
      // nameInputRef.current.value = "";
  };


  // Change CSS classes based  on fi validation is true or false 
    // switch invalid to the first option and just from-contorl to the seocnd option of false.
      // Because if false, that means enteredNameTouched hasn't been changed, only changed on submit of form to true
  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputIsInvalid ? 'form-control invalid' : 'form-control';


  return (
    <form onSubmit={onSubmitFormData}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        {/* ref={nameInputRef}, can use both refs and states, this ref is for ref version, I'm goign to useState */}
        <input  type='text' id='name' onChange={trackEnteredNameHandler} onBlur={nameInputBlurHandler} value={enteredName}/>
        {nameInputIsInvalid && <p className='error-text'>Name must not be empty.</p>}
      </div>
      {/* <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div> */}

      <div className={emailInputClasses}>
        <label htmlFor='e-mail'>Your Email</label>
        {/* ref={nameInputRef}, can use both refs and states, this ref is for ref version, I'm goign to useState */}
        <input  type='text' id='email' onChange={trackEmailHandler} onBlur={emailInputFocusHandler} value={enteredEmail}/>
        {emailInputIsInvalid && <p className='error-text'>Email must contain an @ symbol</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

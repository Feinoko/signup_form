/* ================================================
Form Validation

Flow: 

Remarks :
-all variables starting with EL_ reference a DOM element

================================================= */

/* ==========
EVENT HANDLERS
========== */

/* trigger validation check on leaving input (blur) */

// get all inputs
let EL_inputs = document.getElementsByClassName('form-input');
// converting html collection to array
EL_inputs = Array.from(EL_inputs);

let EL_input; // placeholder for element that will be in focus

// put event listener on all inputs & target the one element that is being focused
EL_inputs.forEach(input => {
  input.addEventListener('focus', (e) => {
    EL_input = e.target;

    // getting which input (to then apply the relevant validate check)
    const whichInput = EL_input.id;
    console.log(whichInput);

    // when user leaves the field, call relevant validation
    EL_input.addEventListener('blur', (e) => {
      
      // switchboard controlling which validation is called depending on which input is in focus
      switch (whichInput) {

        case 'fullname': validateFullName();
          break;

        case 'username': validateUserName();
          break;

        case 'password' : validatePassword();
          break;

        case 'email' : validateEmail();
          break;
      }

      // checkForEnableSubmit();

    })
  })
})

/* ================
FUNCTION DEFINITIONS
================= */


/* Validation system : each validation function returns boolean (true if passes) */


/* assigning variables used for each validation */

let EL_errorMessage; // points to the warning message element
let inputValue; // the value the user enters in field
let args; // shorthand (using spread operator) of all the relevant arguments to pass in the validation methods


/* validating full name */

function validateFullName() {
  
  getVarsForValidation('fullname');

  // validation trials
  console.log(args); //d
  const inputNotEmpty = checkForEmptyInput(...args);
  let lettersOnly; // declaring before 'if' to avoid scope issue
  if (inputNotEmpty) { // debug : to avoid this error overriding the preceding check for empty input
    lettersOnly = checkForLettersOnly(...args);
  }
  // using spread operator to pass the same arguments in above functions (avoid repetition)

  // all checks must return true to validate field
  if (inputNotEmpty && lettersOnly) {
    setSuccess(EL_input);
  }
}


/* validating user name */

function validateUserName() {

  getVarsForValidation('username');

  // validation trials
  const inputNotEmpty = checkForEmptyInput(...args);

  // all checks must return true to validate field
  if (inputNotEmpty) {
    setSuccess(EL_input);
  }
}


/* validating password */

function validatePassword() {

  getVarsForValidation('password');

  // validation trials
  const inputNotEmpty = checkForEmptyInput(...args);

  // all checks must return true to validate field
  if (inputNotEmpty) {
    setSuccess(EL_input);
  }

}


/* validating email */

function validateEmail() {

  getVarsForValidation('email');

  // validation trials
  const inputNotEmpty = checkForEmptyInput(...args);
  const isEmailFormat = checkForEmailFormat(...args);

  // all checks must return true to validate field
  if (inputNotEmpty && isEmailFormat) {
    setSuccess(EL_input);
  }

}




/* lv1 functions */

// get relevant variables used for validation
function getVarsForValidation(inputID) {
  EL_input = document.querySelector(`#${inputID}`);
  EL_errorMessage = document.querySelector(`#${inputID}~small`); // selecting sibling
  inputValue = EL_input.value.trim(); // trim to remove white space before and after
  args = [EL_input, inputValue, EL_errorMessage];
}

/* validations */
// check for empty string
function checkForEmptyInput(fullNameInput, inputValue, EL_errorMessage) {
  if (inputValue === "") {
    setError(fullNameInput, EL_errorMessage, 'required field');
    return false;
  }
  console.log('checkForEmptyInput passes')
  return true;
}

function checkForLettersOnly(fullNameInput, inputValue, EL_errorMessage) {

  const RE = /^[a-zA-Z ]+$/;
  // any number (the ‘+’) of lower/uppercase letters only [a-zA-Z ], from start to finish (^ and $), any number of spaces permitted anywhere (see the white space after the Z)

  if (!RE.test(inputValue)) {
    setError(fullNameInput, EL_errorMessage, 'please type valid name (letters only)')
    return false;
  }
  console.log('checkForLettersOnly passes')
  return true;
}

function checkForEmailFormat(EL_input, inputValue, EL_errorMessage) {

  const RE = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  if (!RE.test(inputValue)) {
    setError(EL_input, EL_errorMessage, 'please type valid email format')
    return false;
  }

  console.log('checkForEmailFormat passes')
  return true;
  

}


/* lv2 functions */

// set error 
function setError(EL_input, EL_errorMessage, errMsg) {
  // debug: removing success class if user changes input
  EL_input.parentElement.classList.remove('signup-form-validation-success');
  // then applying the error class/msg
  EL_input.parentElement.classList.add('signup-form-validation-error');
  EL_errorMessage.textContent = errMsg;
}

// set success
function setSuccess(EL_input) {
  // debug: removing error class if user changes input
  EL_input.parentElement.classList.remove('signup-form-validation-error');
  // then applying the success class
  EL_input.parentElement.classList.add('signup-form-validation-success');
}



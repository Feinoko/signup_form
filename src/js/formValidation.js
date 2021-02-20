

/* ==========
EVENT HANDLERS
========== */

/* deprecated since decided to change validation check trigger */

// const form = document.querySelector('.signup-form');
// form.addEventListener('submit', (e) => {

//   e.preventDefault();

//   if (validateForm()) {
//     form.submit();
//   }
// })


/* trigger validation check on leaving input (blur) */

// get all inputs
let EL_inputs = document.getElementsByClassName('form-input');
// converting html collection to array
EL_inputs = Array.from(EL_inputs);

let EL_input; // placeholder for element that will be in focus

// put event listner on all inputs & target the one element that is being focused
EL_inputs.forEach(input => {
  input.addEventListener('focus', (e) => {
    EL_input = e.target;

    EL_input.addEventListener('blur', (e) => {
      validateFullName();

    })
  })
})

/* ================
FUNCTION DEFINITIONS
================= */


/* Validation system : each validation function returns boolean (true if passes) */

/* validating full name */

function validateFullName() {
  const fullNameInput = document.querySelector('#fullname');
  const EL_errorMessage = document.querySelector('#fullname ~ small'); // selecting sibling
  const inputValue = fullNameInput.value.trim(); // trim to remove white space before and after

  const arguments = [fullNameInput, inputValue, EL_errorMessage]
  // using spread operator to pass the same arguments in below functions (avoid repetition)
  const inputNotEmpty = checkForEmptyInput(...arguments); 
  const lettersOnly = checkForLettersOnly(...arguments);

  // all checks must return true to validate field
  if (inputNotEmpty && lettersOnly) {
    setSuccess(fullNameInput);
  }

}


/* lv1 functions */

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
    console.log('please type valid name');
    fullNameInput.parentElement.classList.add('signup-form-validation-error');
    EL_errorMessage.textContent = 'please type valid name (letters only)';
    return false;
  }
  console.log('checkForLettersOnly passes')
  return true;
}


/* lv2 functions */

// set error 
function setError(fullNameInput, EL_errorMessage, errMsg) {
  // debug: removing success class if user changes input
  fullNameInput.parentElement.classList.remove('signup-form-validation-success');
  // then applying the error class/msg
  fullNameInput.parentElement.classList.add('signup-form-validation-error');
  EL_errorMessage.textContent = errMsg;
}

// set success
function setSuccess(fullNameInput) {
  // debug: removing error class if user changes input
  fullNameInput.parentElement.classList.remove('signup-form-validation-error');
  // then applying the success class
  fullNameInput.parentElement.classList.add('signup-form-validation-success');
}



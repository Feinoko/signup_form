

/* event handler */
const form = document.querySelector('.signup-form');
form.addEventListener('submit', (e) => {
  
  e.preventDefault();
  
  if(validateForm()) {
    form.submit();
  }
  
})


/* ================
FUNCTION DEFINITIONS
================= */

/* DOM variables */

function validateForm() {
  validateFullName();
  return false;
}

function validateFullName() {
  const fullNameInput = document.querySelector('#fullname');
  const EL_errorMessage = document.querySelector('#fullname ~ small'); // selecting sibling
  const inputValue = fullNameInput.value.trim(); // trim to remove white space before and after
  
  const arguments = [fullNameInput, inputValue, EL_errorMessage]
  // using spread operator to pass the same arguments in below functions (avoid repetition)
  checkForEmptyInput(...arguments);
  checkForLettersOnly(...arguments);

}

/* lv1 functions */

// check for empty string
function checkForEmptyInput(fullNameInput, inputValue,EL_errorMessage) {
  if(inputValue === "") {
    setError(fullNameInput,EL_errorMessage, 'required field');
  }
}

function checkForLettersOnly(fullNameInput, inputValue,EL_errorMessage) {
  
  const RE = /^[a-zA-Z ]+$/;
  // any number (the ‘+’) of lower/uppercase letters only [a-zA-Z ], from start to finish (^ and $), any number of spaces permitted anywhere (see the white space after the Z)

  if (!RE.test(inputValue)) {
    console.log('please type valid name');
    fullNameInput.parentElement.classList.add('signup-form-validation-error');
   EL_errorMessage.textContent = 'please type valid name';
  }
}

/* lv2 functions */

// set error 
function setError(fullNameInput, EL_errorMessage, errMsg) {
  fullNameInput.parentElement.classList.add('signup-form-validation-error');
  EL_errorMessage.textContent = errMsg;
}




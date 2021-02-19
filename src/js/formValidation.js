

/* event handler */
const form = document.querySelector('.signup-form');
form.addEventListener('submit', (e) => {
  
  e.preventDefault();
  
  if(validateForm()) {
    form.submit();
  };
  
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
  const errorMessage = document.querySelector('#fullname~small');
  const inputValue = fullNameInput.value.trim(); // trim to remove white space before and after
  
  checkForEmptyInput(fullNameInput, errorMessage);

}

/* sub functions (DRY approach) */

// check for empty string
function checkForEmptyInput(input, errorMsg) {
  if(input.value === "") {
    input.parentElement.classList.add('signup-form-validation-error');
    errorMsg.textContent = 'please do not leave empty';
  }
}




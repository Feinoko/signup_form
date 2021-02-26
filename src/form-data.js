
import 'regenerator-runtime/runtime'; // required when using async/await with parcel
import './css/styles.scss'; // styles entry point


// displaying form data
const formData_EL = document.querySelector('.form-data');
new URLSearchParams(window.location.search).forEach((value, key) => {
  formData_EL.append(`${key}: ${value}`);
  formData_EL.append(document.createElement('br'));
})
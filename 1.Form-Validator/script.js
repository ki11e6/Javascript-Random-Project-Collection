const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phoneNo = document.getElementById('phoneNo');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const labelName = {
  username: 'User Name',
  password: 'Password',
  email: 'Email',
  password2: 'Confirm Password',
  phoneNo: 'Phone No',
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequired([username, email, phoneNo, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkLength(password2, 6, 20);
  checkEmail(email);
  checkPhoneNumber(phoneNo);
  checkPasswordsMatch(password, password2);
});

//check required fields
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required!`);
    } else {
      showSuccess(input);
    }
  });
}

//check input length
function checkLength(input, min, max) {
  if (input.value.trim().length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters!`
    );
  } else if (input.value.trim().length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters!`
    );
  } else {
    showSuccess(input);
  }
}

//get field name of input
function getFieldName(input) {
  // return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  const key = input.id;
  return labelName[key];
}

//show error outline
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}
//show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

//check email valid using regExp
const checkEmail = (input) => {
  const regExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regExp.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, `Email is not a valid!`);
  }
};

//check the phone number have 10 digits only.
const checkPhoneNumber = (input) => {
  if (input.value.match(/^\d{10}$/)) {
    showSuccess(input);
  } else {
    showError(input, `Phone Number is not a valid!`);
  }
};

function checkPasswordsMatch(input1, input2) {
  if (
    input1.value.trim() === input2.value.trim() &&
    input1.value.time() !== ''
  ) {
    // showSuccess(input1);
    showSuccess(input2);
  } else {
    showError(input2, `Passwords Not Match!`);
    // showError(input1, `Passwords Not Match!`);
  }
}

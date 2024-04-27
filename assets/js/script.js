$(".toggle").click(function () {
  "use strict";
  $("nav ul").slideToggle();
});

// Show the first tab and hide the rest
$("#tabs-nav li:first-child").addClass("active");
$(".tab-content").hide();
$(".tab-content:first").show();

// Click function
$("#tabs-nav li").click(function () {
  $("#tabs-nav li").removeClass("active");
  $(this).addClass("active");
  $(".tab-content").hide();

  var activeTab = $(this).find("a").attr("href");
  $(activeTab).fadeIn();
  return false;
});

$(window).resize(function () {
  "use strict";
  if ($(window).width() > 780) {
    $("nav ul").removeAttr("style");
  }
});

const form = document.getElementById("form");
const email = document.getElementById("email");
const name = document.getElementById("name");
const number = document.getElementById("number");
const operation = document.getElementById("operation");
const Browser = document.getElementById("Browser");
const Program = document.getElementById("Program");
const message = document.getElementById("message");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-group error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSucces(input) {
  const formControl = input.parentElement;
  formControl.className = "form-group success";
}

function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSucces(input);
  } else {
    showError(input, "Email is not invalid");
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSucces(input);
    }
  });
}
function checkNumber(input) {
  const numberRegex = /^[0-9]+$/;
  if (numberRegex.test(input.value.trim())) {
    showSucces(input); // Corrected from showSuccess(input)
  } else {
    showError(input, "Only numbers are allowed");
  }
}
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSucces(input);
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Perform validation checks
  var errors = [];
  checkRequired(
    [email, name, number, operation, Browser, Program, message],
    errors
  );
  checkLength(name, 3, 15);
  checkLength(number, 3, 12);
  checkEmail(email);
  checkNumber(number);

  // Check if all fields are filled
  var allFieldsFilled = [
    email,
    name,
    number,
    operation,
    Browser,
    Program,
    message,
  ].every(function (input) {
    return input.value.trim() !== "";
  });

  if (errors.length === 0 && allFieldsFilled) {
    updateUIAfterSubmission();
  } else {
  }
});

function updateUIAfterSubmission() {
  // Display success message
  $("#success-message").removeClass("d-none");
  $("#success-message").addClass("d-flex");

  // Hide success message after a delay
  setTimeout(function () {
    $("#success-message").addClass("d-none");
    $("#success-message").removeClass("d-flex");
    $("#form").trigger("reset"); // Reset the form
    // Reset form control styles to remove success border
    const formControls = document.querySelectorAll(".form-group");
    formControls.forEach(function (formControl) {
      formControl.classList.remove("success");
      formControl.classList.remove("error");
    });
  }, 4200);
}

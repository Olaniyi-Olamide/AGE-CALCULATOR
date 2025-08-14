"use strict";

// Elements
const labelDay = document.querySelector(".label__day");
const labelMonth = document.querySelector(".label__month");
const labelYear = document.querySelector(".label__year");
const input = document.querySelectorAll(".input");
const inputDay = document.querySelector("#input__day");
const inputMonth = document.querySelector("#input__month");
const inputYear = document.querySelector("#input__year");
const errMsg = document.querySelectorAll(".err__msg");
const errMsgDay = document.querySelector(".err__msg__day");
const errMsgMonth = document.querySelector(".err__msg__month");
const errMsgYear = document.querySelector(".err__msg__year");
const caclBtn = document.querySelector(".calc__btn");
const days = document.querySelector(".days");
const months = document.querySelector(".months");
const years = document.querySelector(".years");

input.forEach((_, i) => {
  input[i].addEventListener("keypress", function (e) {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  });
});

// default values
const defaultValues = function () {
  years.textContent = "- -";
  months.textContent = "- -";
  days.textContent = "- -";
};
// default errors
const defaultErrors = function () {
  labelYear.style.color = "hsl(0, 100%, 67%)";
  inputYear.style.borderColor = "hsl(0, 100%, 67%)";
  labelMonth.style.color = "hsl(0, 100%, 67%)";
  inputMonth.style.borderColor = "hsl(0, 100%, 67%)";
  labelDay.style.color = "hsl(0, 100%, 67%)";
  inputDay.style.borderColor = "hsl(0, 100%, 67%)";
};

// current Dates
let now = new Date();
let currYear = now.getFullYear();
let currMonth = now.getMonth() + 1;
let currDay = now.getDate();

// Declaring ages
let daysOld, monthsOld, yearsOld;

// Error handling
const handlingErrors = function () {
  // Errors for invalid details
  if (+inputYear.value > currYear || +inputYear.value < 1800) {
    errMsgYear.textContent = "Must be a valid year";
    defaultErrors();
  } else {
    errMsgYear.textContent = "";
    labelYear.style.color = "hsl(0, 1%, 44%)";
    inputYear.style.borderColor = "hsl(259, 100%, 65%)";
  }
  if (+inputMonth.value > 12) {
    errMsgMonth.textContent = "Must be a valid month";
    defaultErrors();
  } else {
    errMsgMonth.textContent = "";
    labelMonth.style.color = "hsl(0, 1%, 44%)";
    inputMonth.style.borderColor = "hsl(259, 100%, 65%)";
  }
  if (+inputDay.value > 31) {
    errMsgDay.textContent = "Must be a valid day";
    defaultErrors();
  } else {
    errMsgDay.textContent = "";
    labelDay.style.color = "hsl(0, 1%, 44%)";
    inputDay.style.borderColor = "hsl(259, 100%, 65%)";
  }
  if (
    (+inputMonth.value === 4 ||
      +inputMonth.value === 6 ||
      +inputMonth.value === 9 ||
      +inputMonth.value === 11) &&
    +inputDay.value >= 31
  ) {
    defaultValues();
    defaultErrors();
    errMsgDay.textContent = "Must be a valid date";
  }
  if (
    +inputYear.value > currYear ||
    +inputYear.value < 1800 ||
    +inputMonth.value > 12 ||
    +inputDay.value > 31
  ) {
    defaultValues();
  }

  // Errors for empty fields
  if (inputYear.value === "") {
    defaultValues();
    labelYear.style.color = "hsl(0, 100%, 67%)";
    inputYear.style.borderColor = "hsl(0, 100%, 67%)";
    errMsgYear.textContent = "This field is required";
  }
  if (inputMonth.value === "") {
    defaultValues();
    labelMonth.style.color = "hsl(0, 100%, 67%)";
    inputMonth.style.borderColor = "hsl(0, 100%, 67%)";
    errMsgMonth.textContent = "This field is required";
  }
  if (inputDay.value === "") {
    defaultValues();
    labelDay.style.color = "hsl(0, 100%, 67%)";
    inputDay.style.borderColor = "hsl(0, 100%, 67%)";
    errMsgDay.textContent = "This field is required";
  }
  if (+inputMonth.value === 2 && +inputDay.value > 29) {
    defaultValues();
    defaultErrors();
    errMsgDay.textContent = "Must be a valid date";
  }
};

caclBtn.addEventListener("click", () => {
  // Calculating ages
  daysOld = 31 - +inputDay.value + currDay;
  monthsOld = 12 - +inputMonth.value + currMonth;
  yearsOld = currYear - +inputYear.value;

  // Conditions
  if (monthsOld < 12) {
    yearsOld = yearsOld - 1;
  }
  if (monthsOld >= 12) {
    monthsOld = monthsOld - 12;
  }
  if (daysOld < 31) {
    monthsOld = monthsOld - 1;
  }
  if (daysOld >= 31) {
    daysOld = daysOld - 31;
  }

  years.textContent = `${yearsOld}`.padStart(2, 0);
  months.textContent = `${monthsOld}`.padStart(2, 0);
  days.textContent = `${daysOld}`.padStart(2, 0);
  handlingErrors();
});

const ageForm = document.getElementById("age-form");

const daysInput = document.getElementById("day");
const monthsInput = document.getElementById("month");
const yearsInput = document.getElementById("year");

const dayErrorSpan = document.getElementById("day-error-message");
const monthErrorSpan = document.getElementById("month-error-message");
const yearsErrorSpan = document.getElementById("year-error-message");

const daysResult = document.getElementById("result_days");
const monthsResult = document.getElementById("result_months");
const yearsResult = document.getElementById("result_years");

function getFormData(form) {
  const data = {};
  const formData = new FormData(form);

  formData.forEach((value, name) => {
    data[name] = value;
  });

  return data;
}

function resetFormErrors() {
  const formErrorSpan = document.getElementById("form-error-message");
  formErrorSpan.classList.remove("active");
  dayErrorSpan.classList.remove("active");
  monthErrorSpan.classList.remove("active");
  yearsErrorSpan.classList.remove("active");
  daysInput.classList.remove("invalid");
  monthsInput.classList.remove("invalid");
  yearsInput.classList.remove("invalid");
}

function resetResults() {
  daysResult.innerText = "--";
  monthsResult.innerText = "--";
  yearsResult.innerText = "--";
}

function fieldIsEmpty(field) {
  if (!field?.length) {
    return "This field is required";
  }
  return "";
}

function dateIsValid(day, month, year) {
  const date = new Date(`${year}-${month}-${day}`);
  return date.toString() != "Invalid Date";
}

function calcAge(day, month, year) {
  const date = new Date(`${year}-${month}-${day}`);
  const now = new Date();

  const daysDistance = (now.getTime() - date.getTime()) / 1000 / 3600 / 24;

  const years = Math.floor(daysDistance / 365);
  const months = Math.floor((daysDistance / 365 - years) * 12);
  const days = Math.floor((daysDistance / 365 - years) * 30);

  return { days, years, months };
}

function dayIsValid(day) {
  if (!day) {
    return "This field is required";
  }

  if (day < 1 || day > 31) {
    return "Must be a valid day";
  }

  return "";
}

function monthIsValid(month) {
  if (!month) {
    return "This field is required";
  }

  if (month < 1 || month > 12) {
    return "Must be a valid month";
  }
}

function yearIsValid(year) {
  if (!year) {
    return "This field is required";
  }

  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) {
    return "Must be a valid year";
  }
}

function validateAgeForm(form) {
  let isValid = true;

  const dayError = dayIsValid(form.day);
  const monthError = monthIsValid(form.month);
  const yearError = yearIsValid(form.year);

  //   if (dayError && monthError && yearError) {
  //     const formErrorSpan = document.getElementById("form-error-message");
  //     formErrorSpan.innerText = "Must be a valid date";
  //     formErrorSpan.classList.add("active");
  //     daysInput.classList.add("invalid");
  //     monthsInput.classList.add("invalid");
  //     yearsInput.classList.add("invalid");
  //   }
  //isValid = false;

  if (dayError) {
    daysInput.classList.add("invalid");
    dayErrorSpan.classList.add("active");
    dayErrorSpan.innerText = dayError;

    isValid = false;
  }
  if (monthError) {
    monthsInput.classList.add("invalid");
    monthErrorSpan.classList.add("active");
    monthErrorSpan.innerText = monthError;

    isValid = false;
  }

  if (yearError) {
    yearsInput.classList.add("invalid");
    yearsErrorSpan.classList.add("active");
    yearsErrorSpan.innerText = yearError;

    isValid = false;
  }
  {
    dayError, monthError, yearError;
  }
  console.log(isValid);
  return isValid;
}

ageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  resetFormErrors();
  resetResults();
  console.log("teste");
  const data = getFormData(e.target);
  console.log(data);
  if (validateAgeForm(data)) {
    console.log("Form valido");
    const { days, months, years } = calcAge(data.day, data.month, data.year);
    daysResult.innerText = String(days).padStart(2, "0");
    monthsResult.innerText = String(months).padStart(2, "0");
    yearsResult.innerText = String(years).padStart(2, "0");
  }
});

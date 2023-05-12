let manufacturYear = document.querySelector("#yr-mnfr").value;
let chekValue = document.querySelectorAll(".form-check");
let distDisclbl = document.querySelector("#distDisc");
let OldDisclbl = document.querySelector("#oldDisc");
let festDisclbl = document.querySelector("#festDisc");

var twoWheelerCharge = 500;
var fourWheelerChage = 1500;
var finalAmt = 0;

// Validate Register Number and if there Discount.

function validateReg() {
  var regNo = document.querySelector("#regNo").value;
  var regCode = regNo.slice(2, 4);

  const eligibleCodes = ["01", "07", "17", "11"];

  if (eligibleCodes.includes(regCode)) {
    chekValue[0].classList.remove("visually-hidden");
  } else {
    chekValue[0].classList.add("visually-hidden");
  }

  return false;
}

//validate model number and calculate vehicle age

function modelValidation() {
  let model = document.querySelector("#model").value;
  let vehicleType = document.querySelector("#vehicleType").value;

  const date = new Date();
  const currentYear = date.getFullYear();
  var vehicleAge = currentYear - model;

  if (vehicleAge >= 10 && vehicleType === "two-w") {
    chekValue[1].classList.remove("visually-hidden");
  } else if (vehicleAge >= 15 && vehicleType === "four-w") {
    chekValue[1].classList.remove("visually-hidden");
  } else {
    chekValue[1].classList.add("visually-hidden");
  }
  return { vehicleType };
}

function handleSubmit() {
  validateReg();
  modelValidation();
  calculateAmt();
  return false;
}

//prevent selecting more than 2 check box

let checkBoxes = document.querySelectorAll('input[type="checkbox"]');
let checkedCount = 0;
checkBoxes.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    checkedCount = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    ).length;
    if (checkedCount > 2) {
      checkbox.checked = false;
    }
  });
});

//Calculate Final Amount Based on Discount Given

function calculateAmt() {
  let fnlAmt = document.querySelector("#final-amt");
  chekValue[2].classList.remove("visually-hidden");
  let calcBtn = document.querySelector(".btn-apply");
  calcBtn.addEventListener("click", () => {
    let totalDiscount = 0;
    let distDisc = document.querySelector("#distDisc");
    let oldDisc = document.querySelector("#old");
    let festDisc = document.querySelector("#festDisc");

    if (distDisc.checked) {
      totalDiscount += 10;
    }
    if (oldDisc.checked) {
      totalDiscount += 20;
    }
    if (festDisc.checked) {
      totalDiscount += 5;
    }

    vehicleType = modelValidation().vehicleType;

    if (vehicleType === "two-w") {
      fnlAmt.innerHTML = 500 - (500 * totalDiscount) / 100;
    } else if (vehicleType === "four-w") {
      fnlAmt.innerHTML = 1500 - (1500 * totalDiscount) / 100;
    }
  });

  return false;
}

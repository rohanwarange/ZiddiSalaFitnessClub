// ==========================
// TOGGLE NAV FOR MOBILE
// ==========================
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-ul");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  document.body.classList.toggle("menu-open");
});

// ==========================
// SHOW / HIDE MEMBERSHIP FORM
// ==========================
let formContainer = document.querySelector(".form-container");

function showForm() {
  formContainer.classList.toggle("hidden");
}

function closeForm() {
  formContainer.classList.add("hidden");
}

// ==========================
// MEMBERSHIP FORM HANDLER
// ==========================
const memberDetailsDiv = document.querySelector(".memberDetails");

document.getElementById("membershipForm").addEventListener("submit", function membership(event) {
  event.preventDefault();
  const fullName = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phone").value;
  const membership = document.getElementById("membership").value;

  if (!email.includes("@") || !email.includes(".")) {
    memberDetailsDiv.innerHTML = `Please enter a valid email.`;
    return;
  }

  const member = new GymMember(fullName, email, phoneNumber, membership);
  displayMemberDetails(member);

  closeForm();
  memberDetailsDiv.classList.remove("hidden");

  setTimeout(() => {
    memberDetailsDiv.classList.add("hidden");
  }, 10000);
});

class GymMember {
  constructor(fullName, eMail, phoneNumber, membership) {
    this.name = fullName;
    this.email = eMail;
    this.phone = phoneNumber;
    this.membership = membership;
  }

  hiddenEmail(email) {
    let [user, domain] = email.split("@");
    return user.slice(0, 2) + "*****" + user.slice(-2) + "@" + domain;
  }

  hiddenPhone(phone) {
    return phone.slice(0, 6) + "****" + phone.slice(-3);
  }

  shortenedName(name) {
    return name.split(" ")[0];
  }

  detailsMember() {
    return `
    <br>
    We have sent a verification email at ${this.hiddenEmail(this.email)}! <br>
    We have saved your Contact Number ${this.hiddenPhone(this.phone)} for future reference! <br>
    A staff member will be in touch with you shortly about your membership plan ${this.membership}.<br>
    Thank you and see you soon! 
    <br><br>Regards,<br>Team Ziddi Fitness Club.`;
  }
}

function displayMemberDetails(member) {
  memberDetailsDiv.innerHTML = `
    <h2>Welcome ${member.shortenedName(member.name)}!</h2>
    <p>${member.detailsMember()}</p>
  `;
}

// Scroll reveal for About Section (optional)
window.addEventListener("scroll", () => {
  const trainerSection = document.getElementById("trainer");
  const trainerPos = trainerSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.3;

  if (trainerPos < screenPos) {
    trainerSection.classList.add("animate-fade");
  }
});

// ==========================
// BMI CALCULATOR
// ==========================
let formBMI = document.querySelector(".BMI-calculator");
let bmiButton = document.getElementById("bmiButton");
let isOpenBMI = true;
let bmiResult = document.getElementById("bmiResult");

function calculateBMI() {
  let bmiHeight = parseFloat(document.getElementById("bmiHeight").value);
  let bmiWeight = parseFloat(document.getElementById("bmiWeight").value);

  if (isNaN(bmiHeight) || isNaN(bmiWeight) || bmiHeight <= 0 || bmiWeight <= 0) {
    bmiResult.innerHTML = "Please enter valid height and weight.";
    return;
  }

  let meterHeight = bmiHeight / 100;
  let BMI = bmiWeight / (meterHeight * meterHeight);

  bmiResult.innerHTML = `Your BMI is ${BMI.toFixed(1)}.<br>
  <ul>
    <li>Underweight: BMI less than 18.5</li>
    <li>Normal weight: BMI 18.5 - 24.9</li>
    <li>Overweight: BMI 25 - 29.9</li>
    <li>Obesity: BMI 30 or higher</li>
  </ul>`;
}

function showBMI() {
  formBMI.classList.toggle("hidden");
  isOpenBMI = !isOpenBMI;

  if (isOpenBMI) {
    bmiButton.innerHTML = `BMI Calculator`;
    bmiButton.style.background = ``;
    bmiButton.style.color = ``;
  } else {
    bmiButton.innerHTML = `CLOSE`;
    bmiButton.style.background = "rgb(255, 76, 76)";
    bmiButton.style.color = `white`;
  }}

// ==========================
// PROTEIN CALCULATOR
// ==========================
let formProtein = document.querySelector(".form-protein");
let proteinBtn = document.getElementById("proteinButton");
let isOpenProtein = true;

function hideProtein() {
  formProtein.classList.toggle("hidden");
  isOpenProtein = !isOpenProtein;

  if (isOpenProtein) {
    proteinBtn.innerHTML = "Protein Calculator";
    proteinBtn.style.backgroundColor = "";
    proteinBtn.style.color = "";
  } else {
    proteinBtn.innerHTML = "CLOSE";
    proteinBtn.style.backgroundColor = "rgb(255, 76, 76)";
    proteinBtn.style.color = "white";
  }
}

function proteinCalculator() {
  let gender = document.getElementById("gender").value;
  let height = parseFloat(document.getElementById("height").value);
  let weight = parseFloat(document.getElementById("weight").value);
  let age = parseFloat(document.getElementById("age").value);
  let activity = parseFloat(document.getElementById("activity").value);
  let result = document.getElementById("result");

  if (!gender || isNaN(height) || isNaN(weight) || isNaN(age) || isNaN(activity) || age >= 120) {
    result.innerHTML = `Please enter valid inputs.`;
    return;
  }

  let BMR =
    gender === "male"
      ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
      : 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;

  let TDEE = BMR * activity;
  let minP, maxP;

  if (activity <= 1.2) {
    minP = weight * 0.8;
    maxP = weight * 1.2;
  } else if (activity <= 1.55) {
    minP = weight * 1.2;
    maxP = weight * 1.7;
  } else if (activity <= 1.725) {
    minP = weight * 1.6;
    maxP = weight * 2.2;
  } else {
    minP = weight * 1.8;
    maxP = weight * 2.5;
  }

  result.innerHTML = `
    Calories recommended per day: ${BMR.toFixed(2)}.<br>
    To maintain your weight (${weight}KG), you need approx ${TDEE.toFixed(2)} calories/day.<br>
    Protein intake: ${minP.toFixed(1)}G - ${maxP.toFixed(1)}G per day.`;
}

// ==========================
// AUTO-ROTATING REVIEWS
// ==========================
const reviewers = [
  {
    name: "Fiona Hughes",
    occupation: "Physician",
    img: "images/physician.png",
    stars: [4.5],
    text: "Focus on flexibility! Yoga, Pilates, and barre classes. Great for improving mobility and core strength.",
  },
  {
    name: "Alex Woodley",
    occupation: "Bartender",
    img: "images/bartender.png",
    stars: [4.5],
    text: "Welcoming gym for all! Cardio machines, group fitness classes (Zumba, Yoga), friendly staff. Great for beginners or social workouts.",
  },
  {
    name: "Ji-hoon Park",
    occupation: "Chef",
    img: "images/chef.png",
    stars: [2.5],
    text: "Affordable gym with decent equipment. Can get crowded during peak hours and intimidating too. Good option for basic workouts.",
  },
  {
    name: "Emily Grace Johnson",
    occupation: "Attorney",
    img: "images/attorney.png",
    stars: [5],
    text: "Get bendy! Yoga, Pilates, barre classes. Improve mobility and core strength.",
  },
  {
    name: "Dwight Aldridge",
    occupation: "Steelworker",
    img: "images/steelworker.png",
    stars: [5],
    text: "Absolutely love this gym! The trainers are so motivating, and the variety of classes keeps things interesting.",
  },
  {
    name: "Miguel Cruz",
    occupation: "Blogger",
    img: "images/blogger.png",
    stars: [5],
    text: "This gym is a hidden gem! Smaller but highly focused and personal. Classes are challenging and fun.",
  },
  {
    name: "Dr. Benjamin Stanley",
    occupation: "Doctor",
    img: "images/doctor.png",
    stars: [5],
    text: "The best gym in town! The facilities are always clean, and the trainers are incredibly knowledgeable.",
  },
  {
    name: "Chioma Adekunle",
    occupation: "Nurse",
    img: "images/nurse.png",
    stars: [5],
    text: "Love the community vibe. Everyone is supportive and there's real camaraderie.",
  },
  {
    name: "Shanice Thompson",
    occupation: "Call Agent",
    img: "images/callAgent.png",
    stars: [2],
    text: "Not impressed. Equipment often broken and always overcrowded.",
  },
  {
    name: "Derek Kelly",
    occupation: "Electrician",
    img: "images/electrician.png",
    stars: [5],
    text: "Fun & energetic! Zumba, Hip-Hop, dance fitness. Burn calories and have a blast!",
  },
  {
    name: "Josh Blessington",
    occupation: "Engineer",
    img: "images/engineer2.png",
    stars: [4.5],
    text: "Inner peace! Diverse yoga classes, calming atmosphere. Perfect for relaxation.",
  },
];

function autoReview() {
  let reviewContent = document.querySelector(".review__content");
  reviewContent.classList.remove("show");

  setTimeout(function () {
    let currentReviewIndex = Math.floor(Math.random() * reviewers.length);
    let { name, occupation, img, text, stars } = reviewers[currentReviewIndex];

    document.getElementById("reviewName").innerHTML = name;
    document.getElementById("reviewOccupation").innerHTML = occupation;
    document.getElementById("reviewImgPerson").src = img;
    document.getElementById("reviewerText").innerHTML = text;

    let starContainer = document.querySelector(".review__star");
    starContainer.innerHTML = "";

    let full = Math.floor(stars[0]);
    let half = stars[0] % 1 !== 0;
    let empty = 5 - full - (half ? 1 : 0);

    for (let i = 0; i < full; i++) {
      let star = document.createElement("i");
      star.className = "ri-star-fill";
      starContainer.appendChild(star);
    }

    if (half) {
      let star = document.createElement("i");
      star.className = "ri-star-half-line";
      starContainer.appendChild(star);
    }

    for (let i = 0; i < empty; i++) {
      let star = document.createElement("i");
      star.className = "ri-star-line";
      starContainer.appendChild(star);
    }

    reviewContent.classList.add("show");
  }, 1000);
}

window.onload = autoReview;
setInterval(autoReview, 6000); // every 6 seconds

// open form and close form

let formContainer = document.querySelector(".form-container");

function showForm() {
  formContainer.classList.toggle("hidden");
}

function closeForm() {
  formContainer.classList.add("hidden");
}

// form for membership

const memberDetailsDiv = document.querySelector(".memberDetails");

document
  .getElementById("membershipForm")
  .addEventListener("submit", function membership(event) {
    event.preventDefault();
    const fullName = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phone").value;
    const membership = document.getElementById("membership").value;

    if (email.includes("@") == false || email.includes(".") == false) {
      memberDetailsDiv.innerHTML = `Please enter a valid email.`;
    }

    const member = new GymMember(fullName, email, phoneNumber, membership);
    displayMemberDetails(member);

    closeForm();

    let memberDetails = document.querySelector(".memberDetails");
    memberDetails.classList.toggle("hidden");
    setTimeout(() => {
      memberDetails.classList.toggle("hidden");
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
    let [userEmail, website] = email.split("@");
    let maskEmail = userEmail.slice(0, 2) + "*****" + userEmail.slice(-2);
    return `${maskEmail}@${website}`;
  }

  hiddenPhone(phone) {
    let phoneSplit = phone.slice(0, 6) + "****" + phone.slice(-3);
    return phoneSplit;
  }

  shortenedName(name) {
    let shortName = name.split(" ");
    return shortName[0];
  }

  detailsMember() {
    let hideEmail = this.hiddenEmail(this.email);
    let hidePhone = this.hiddenPhone(this.phone);
    return `
    <br>
    We have sent a verification email at ${hideEmail}! <br>
    We have saved your Contact Number ${hidePhone} for future reference! <br>
    A staff member will be in touch with you shortly about your membership plan ${this.membership}.<br>
    Thank you and see you soon! 
    <br>
    <br>
    Regards,<br>
    Dublin Gym Team.`;
  }
}

function displayMemberDetails(member) {
  memberDetailsDiv.innerHTML = `
    <h2>Welcome ${member.shortenedName(member.name)} !</h2>
    <p>${member.detailsMember()}</p>
    `;
}

// BMI Calculator

let formBMI = document.querySelector(".BMI-calculator");
let bmiButton = document.getElementById("bmiButton");
let isOpenBMI = true;

let bmiResult = document.getElementById("bmiResult");

function calculateBMI() {
  let bmiHeight = parseFloat(document.getElementById("bmiHeight").value);
  let bmiWeight = parseFloat(document.getElementById("bmiWeight").value);

  let meterHeight = bmiHeight / 100;
  let heightSquared = meterHeight * meterHeight;
  let BMI = bmiWeight / heightSquared;

  bmiResult.innerHTML = `Your BMI is ${BMI.toFixed(1)}.<br>
  The recommended BMI categories for adults are as follows:
  <ul>
  <li> Underweight: BMI less than 18.5</li>
  <li> Normal weight: BMI 18.5 - 24.9</li>
  <li> Overweight: BMI 25 - 29.9</li>
  <li> Obesity: BMI 30 or higher</li>
  </ul>`;
}

function showBMI() {
  formBMI.classList.toggle("hidden");

  if (!isOpenBMI) {
    bmiButton.innerHTML = `BMI Calculator`;
    bmiButton.style.background = ``;
    bmiButton.style.color = ``;
  } else {
    bmiButton.innerHTML = `CLOSE`;
    bmiButton.style.background = "rgb(255, 76, 76)";
    bmiButton.style.color = `white`;
  }

  isOpenBMI = !isOpenBMI;
}

// protein calculator

let formProtein = document.querySelector(".form-protein");
let proteinBtn = document.getElementById("proteinButton");
let isOpenProtein = true;

function hideProtein() {
  formProtein.classList.toggle("hidden");

  if (!isOpenProtein) {
    proteinBtn.innerHTML = "Protein Calculator";
    proteinBtn.style.backgroundColor = "";
    proteinBtn.style.color = "";
  } else {
    proteinBtn.innerHTML = "CLOSE";
    proteinBtn.style.backgroundColor = "rgb(255, 76, 76)";
    proteinBtn.style.color = "white";
  }

  isOpenProtein = !isOpenProtein;
}

function proteinCalculator() {
  let genderElem = document.getElementById("gender").value;
  let heightElem = parseFloat(document.getElementById("height").value);
  let weightElem = parseFloat(document.getElementById("weight").value);
  let ageElem = parseFloat(document.getElementById("age").value);
  let activityElem = parseFloat(document.getElementById("activity").value);
  let resultElem = document.getElementById("result");
  let BMR;
  let TDEE;
  let minimumProtein;
  let maximumProtein;

  if (!genderElem) {
    resultElem.innerHTML = "Please pick a gender.";
    return;
  }

  if (isNaN(heightElem) || heightElem <= 0) {
    resultElem.innerHTML = "Please enter a valid height.";
    return;
  }

  if (isNaN(weightElem) || weightElem <= 0) {
    resultElem.innerHTML = "Please enter a valid weight.";
    return;
  }

  if (isNaN(ageElem) || ageElem <= 0) {
    resultElem.innerHTML = "Please enter a correct age.";
    return;
  } else if (ageElem >= 120) {
    resultElem.innerHTML = "Age limit is too high. We recommend you rest up.";
    return;
  }

  if (isNaN(activityElem) || activityElem <= 0) {
    resultElem.innerHTML = "Please pick an activity level.";
    return;
  }

  if (genderElem == "male") {
    BMR = 88.362 + 13.397 * weightElem + 4.799 * heightElem - 5.677 * ageElem;
  } else {
    BMR = 447.593 + 9.247 * weightElem + 3.098 * heightElem - 4.33 * ageElem;
  }

  TDEE = BMR * activityElem;

  switch (activityElem) {
    case 1.2:
      minimumProtein = weightElem * 0.8;
      maximumProtein = weightElem * 1.2;
      break;
    case 1.375:
      minimumProtein = weightElem * 0.8;
      maximumProtein = weightElem * 1.2;
      break;
    case 1.55:
      minimumProtein = weightElem * 1.2;
      maximumProtein = weightElem * 1.7;
      break;
    case 1.725:
      minimumProtein = weightElem * 1.6;
      maximumProtein = weightElem * 2.2;
      break;
    case 1.9:
      minimumProtein = weightElem * 1.8;
      maximumProtein = weightElem * 2.5;
      break;
    default:
      resultElem.innerHTML = `Please pick an activity level`;
      return;
  }

  resultElem.innerHTML = `Calories recommended per day: ${BMR.toFixed(2)}.<br>
  To maintain your weight (${weightElem}KG), you will need at least ${TDEE.toFixed(
    2
  )} calories per day.<br>
  The recommended protein you should be taking is ${minimumProtein}G - ${maximumProtein}G.<br>`;
}

// make the review randomized

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
    text: "Absolutely love this gym! The trainers are so motivating, and the variety of classes keeps things interesting. Plus, the equipment is top-notch.",
  },
  {
    name: "Miguel Cruz",
    occupation: "Blogger",
    img: "images/blogger.png",
    stars: [5],
    text: "This gym is a hidden gem! It's smaller than some of the chain gyms, but the personal attention from the trainers makes all the difference. Plus, the classes are challenging and fun.",
  },
  {
    name: "Dr. Benjamin Stanley",
    occupation: "Doctor",
    img: "images/doctor.png",
    stars: [5],
    text: "The best gym in town! The facilities are always clean, and the trainers are incredibly knowledgeable. I've achieved amazing results thanks to their guidance.",
  },
  {
    name: "Chioma Adekunle",
    occupation: "Nurse",
    img: "images/nurse.png",
    stars: [5],
    text: "Love the community vibe at this gym. Everyone is so supportive, and there's a real sense of camaraderie among members. Plus, the classes are fantastic!",
  },
  {
    name: "Shanice Thompson",
    occupation: "Call Agent",
    img: "images/callAgent.png",
    stars: [2],
    text: "Not impressed with this gym. The equipment is often out of order, and it's always overcrowded during peak hours. Definitely not worth the membership fee.",
  },
  {
    name: "Derek Kelly",
    occupation: "Electrician",
    img: "images/electrician.png",
    stars: [5],
    text: "Fun & energetic! Zumba, Hip-Hop, dance fitness classes. Burn calories and have a blast!",
  },
  {
    name: "Josh Blessington",
    occupation: "Engineer",
    img: "images/engineer2.png",
    stars: [4.5],
    text: "Find your inner peace! Diverse yoga classes, experienced instructors, calming atmosphere. Perfect for relaxation and flexibility.",
  },
];

function autoReview() {
  let reviewContent = document.querySelector(".review__content");
  reviewContent.classList.remove("show"); //removes .review__content.show

  setTimeout(function () {
    let currentReviewIndex = Math.floor(Math.random() * reviewers.length);
    let name = reviewers[currentReviewIndex].name;
    let occupation = reviewers[currentReviewIndex].occupation;
    let img = reviewers[currentReviewIndex].img;
    let text = reviewers[currentReviewIndex].text;
    let star = reviewers[currentReviewIndex].stars[0];

    document.getElementById("reviewName").innerHTML = name;
    document.getElementById("reviewOccupation").innerHTML = occupation;
    document.getElementById("reviewImgPerson").src = img; //target the .src instead of innerHTML
    document.getElementById("reviewerText").innerHTML = text;

    let starContainer = document.querySelector(".review__star");
    starContainer.innerHTML = "";

    let fullStars = Math.floor(star);
    let halfStar;
    if (star % 1 !== 0) {
      halfStar = true;
    } else {
      halfStar = false;
    }
    let emptyStars = 5 - fullStars - halfStar;

    for (let i = 0; i < fullStars; i++) {
      let starElem = document.createElement("i");
      starElem.className = "ri-star-fill";
      starContainer.appendChild(starElem);
    }

    if (halfStar == true) {
      let starElem = document.createElement("i");
      starElem.className = "ri-star-half-line";
      starContainer.appendChild(starElem);
    }

    for (let i = 0; i < emptyStars; i++) {
      let starElem = document.createElement("i");
      starElem.className = "ri-star-line";
      starContainer.appendChild(starElem);
    }

    reviewContent.classList.add("show");
  }, 1000);
}
window.onload = autoReview;
setInterval(autoReview, 6000); // 5000 means 5 seconds
function toggleMenu() {
  document.querySelector(".nav-ul").classList.toggle("show");
}
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-ul");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  document.body.classList.toggle("menu-open");
});




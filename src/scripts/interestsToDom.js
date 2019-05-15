import APIManager from "./dbCalls";

const interestsOutputSection = document.querySelector("#interests__container");

function interestsToDom() {
  interestsOutputSection.innerHTML = "";
  APIManager.getAllInterests().then(interests => {
    interests.forEach(interest => {
      buildInterestHTML(interest);
    });
  });
}

function buildInterestHTML(interest) {
  const interestCard = document.createElement("div");
  let interestName = document.createElement("h1");
  let interestPlaceName = document.createElement("h2");
  let interestDescription = document.createElement("p");
  let interestCost = document.createElement("p");
  let interestReview = document.createElement("p");

  const interestEditBtn = document.createElement("button");
  interestEditBtn.textContent = "EDIT";
  const interestDeleteBtn = document.createElement("button");
  interestDeleteBtn.textContent = "DELETE";
  interestDeleteBtn.addEventListener("click", () => deleteAlert(interest));

  interestName.textContent = interest.name;
  interestPlaceName.textContent = interest.place.name;
  interestDescription.textContent = "Description: " + interest.description;
  interestCost.textContent = "Cost: " + interest.cost;

  interestCard.appendChild(interestName);
  interestCard.appendChild(interestPlaceName);
  interestCard.appendChild(interestDescription);
  interestCard.appendChild(interestCost);
  // EDIT & DELETE BUTTONS
  interestCard.appendChild(interestEditBtn);
  interestCard.appendChild(interestDeleteBtn);

  if (interest.review != "") {
    interestReview.textContent = "Review: " + interest.review;
    interestCard.appendChild(interestReview);
  }

  interestsOutputSection.appendChild(interestCard);
}

export default interestsToDom;

// function setAttributes(element, attributes) {
//   for (var key in attributes) {
//     element.setAttribute(key, attributes[key]);
//   }
// }

function deleteAlert(interest) {
  var r = confirm("Are you sure you want to delete?\nEither OK or Cancel.");
  if (r == true) {
    APIManager.deleteInterest(interest.id).then(interestsToDom);
  } else {
    alert = "You canceled the delete";
  }
}

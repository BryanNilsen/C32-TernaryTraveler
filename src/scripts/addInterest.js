import APIManager from "./dbCalls";
import interestsToDom from "./interestsToDom";

function buildInterestForm() {
  const interestsFormSection = document.querySelector("#interests__form");

  const interestFieldset = document.createElement("fieldset");
  const interestNameInputLabel = document.createElement("label");
  setAttributes(interestNameInputLabel, { for: "interest_name_input" });
  interestNameInputLabel.textContent = "Name: ";

  const interestNameInput = document.createElement("input");
  setAttributes(interestNameInput, {
    id: "interest_name_input",
    type: "text",
    placeholder: "name of interest",
    required: true
  });

  const interestDescriptionInputLabel = document.createElement("label");
  setAttributes(interestDescriptionInputLabel, {
    for: "interest_description_input"
  });
  interestDescriptionInputLabel.textContent = "Description: ";

  const interestDescriptionInput = document.createElement("textarea");
  setAttributes(interestDescriptionInput, {
    id: "interest_description_input",
    placeholder: "description of interest",
    required: true
  });

  const interestCostInputLabel = document.createElement("label");
  setAttributes(interestCostInputLabel, { for: "interest_cost_input" });
  interestCostInputLabel.textContent = "Cost: ";

  const interestCostInput = document.createElement("input");
  setAttributes(interestCostInput, {
    id: "interest_cost_input",
    type: "number",
    placeholder: "cost of interest"
  });

  const interestPlacesSelect = document.createElement("select");
  setAttributes(interestPlacesSelect, {
    id: "interest_place_select"
  });

  APIManager.getAllPlaces().then(results => {
    results.forEach(result => {
      let interestPlaceSelectOption = document.createElement("option");
      interestPlaceSelectOption.textContent = result.name;
      setAttributes(interestPlaceSelectOption, { value: result.id });
      interestPlacesSelect.appendChild(interestPlaceSelectOption);
      console.log(result);
    });
  });

  const interestAddBtn = document.createElement("button");
  interestAddBtn.textContent = "ADD INTEREST";
  interestAddBtn.addEventListener("click", () => buildInterestObject());

  interestFieldset.appendChild(interestNameInputLabel);
  interestFieldset.appendChild(interestNameInput);
  interestFieldset.appendChild(document.createElement("br"));
  interestFieldset.appendChild(interestDescriptionInputLabel);
  interestFieldset.appendChild(interestDescriptionInput);
  interestFieldset.appendChild(document.createElement("br"));
  interestFieldset.appendChild(interestCostInputLabel);
  interestFieldset.appendChild(interestCostInput);
  interestFieldset.appendChild(document.createElement("br"));
  interestFieldset.appendChild(interestPlacesSelect);
  interestFieldset.appendChild(document.createElement("br"));
  interestFieldset.appendChild(interestAddBtn);

  interestsFormSection.appendChild(interestFieldset);
}

export default buildInterestForm;

function setAttributes(element, attributes) {
  for (var key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// setAttributes(jumpToEditAnchor, { href: "#edit" });

function buildInterestObject() {
  let interestName = document.querySelector("#interest_name_input").value;
  let interestCost = document.querySelector("#interest_cost_input").value;
  if (interestCost === "") {
    interestCost = 0;
  }
  let interestPlace = document.querySelector("#interest_place_select").value;
  let interestDescription = document.querySelector(
    "#interest_description_input"
  ).value;
  const interestObj = {
    name: interestName,
    description: interestDescription,
    cost: parseFloat(interestCost),
    review: "",
    placeId: parseInt(interestPlace)
  };
  console.log("INTEREST OBJECT", interestObj);

  if (interestName === "" || interestDescription === "") {
    alert("Please fill out all fields");
  } else {
    APIManager.addInterest(interestObj).then(result => {
      console.log(result);
      interestsToDom();
    });
  }
}

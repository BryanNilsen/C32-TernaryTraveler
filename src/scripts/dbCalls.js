const baseURL = "http://0.0.0.0:8088";

const APIManager = {
  getAllPlaces: function() {
    return fetch(`${baseURL}/places`).then(response => response.json());
  },
  getAllInterests: function() {
    return fetch(`${baseURL}/interests?_expand=place`).then(response =>
      response.json()
    );
  },
  addInterest: function(interestObject) {
    return fetch(`${baseURL}/interests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(interestObject)
    }).then(response => response.json());
  },
  deleteInterest: function(interestId) {
    return fetch(`${baseURL}/interests/${interestId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
  }
};

export default APIManager;

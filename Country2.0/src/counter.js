const apiKey = "Mjg2V1VtMGFSbHU1MFJlR2NtR1pzMGFSOVhQUk51cVo4ZDFBbVgzTg==";

function fetchCountries() {
  fetch("https://api.countrystatecity.in/v1/countries", {
    method: "GET",
    headers: { "X-CSCAPI-KEY": apiKey }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("Countries Data:", data);
    let countrySelect = document.getElementById('countrySelect');
    
    // Clear previous options if any
    countrySelect.innerHTML = `<option value="">Select Country</option>`;
    
    let defaultCountry = "IN"; // Default country: India

    data.forEach(element => {
      let option = document.createElement("option");
      option.value = element.iso2;
      option.textContent = element.name;
      if (element.iso2 === defaultCountry) {
        option.selected = true;
      }
      countrySelect.appendChild(option);
    });

    // Fetch states for the default country (India)
    fetchState(defaultCountry);

    // Add event listener to fetch states on country change
    countrySelect.addEventListener("change", function () {
      fetchState(this.value);
    });
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });
}

function fetchState(countryCode) {
  if (!countryCode) return;
  
  fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, {
    method: "GET",
    headers: { "X-CSCAPI-KEY": apiKey }
  })
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    console.log("States Data:", data);
    let StateSelect = document.getElementById("StateSelect");
    
    // Clear previous options
    StateSelect.innerHTML = `<option value="">Select State</option>`;

    let defaultState = "MH"; // Default state: Maharashtra

    data.forEach(element => {
      let option = document.createElement("option");
      option.value = element.iso2;
      option.textContent = element.name;
      if (element.iso2 === defaultState) {
        option.selected = true;
      }
      StateSelect.appendChild(option);
    });

    // Fetch cities for the default state (Maharashtra)
    fetchCity(countryCode, defaultState);

    // Add event listener to fetch cities on state change
    StateSelect.addEventListener("change", function () {
      fetchCity(countryCode, this.value);
    });
  })
  .catch(error => {
    console.error("Error fetching states:", error);
  });
}

function fetchCity(countryCode, stateCode) {
  if (!stateCode) return;
  
  fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, {
    method: "GET",
    headers: { "X-CSCAPI-KEY": apiKey }
  })
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    console.log("City Data:", data);
    let CitySelect = document.getElementById("CitySelect");
    
    // Clear previous options
    CitySelect.innerHTML = `<option value="">Select City</option>`;

    data.forEach(element => {
      let option = document.createElement("option");
      option.value = element.name;
      option.textContent = element.name;
      CitySelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error("Error fetching cities:", error);
  });
}

// Fetch countries when the page loads
fetchCountries();

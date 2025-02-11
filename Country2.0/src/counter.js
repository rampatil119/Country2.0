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
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });
}


fetchCountries();

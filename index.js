//import API from 'core/api.js'

//https://jobs.github.com/positions.json?description=python&full_time=true&location=sf
const baseUrl = "https://jobs.github.com/positions.json";

//inputs
const locationInput = document.querySelector("#location");
const descriptionInput = document.querySelector("#job-description");
const fulltimeCheck = document.querySelector("#full-time");

//submit button and results container
const submitBtn = document.querySelector("#submit-btn");
const rootDiv = document.querySelector("#root");

//job boxes to click and its description container
const jobBoxes = document.querySelectorAll(".job-box");
const jobDescription = document.getElementById("job-info");

const getJobs = async (location, description, fulltimeValue) => {
  rootDiv.innerHTML = '';
  jobDescription.innerHTML = '';

  fetch(
    `${baseUrl}?description=${description}&location=${location}&full_time=${fulltimeValue}`
  )
    .then(res => res.json())
    .then(data => {
      if (data.length) {
        data.forEach(job => {
          const jobBox = document.createElement("div");
          jobBox.classList.add("job-box");

          jobBox.innerHTML += `
            <div id="${job.id}" class="content">
              <h3>${job.title}</h3>
              <p>${job.company}</p>
            </div>
            <div class="like">
              <i class="fa fa-heart-o" id="${job.id}-like"></i>
            </div>
          `;

          rootDiv.appendChild(jobBox);
          document.getElementById(job.id).onclick = () => getById(job.id);
          document.getElementById(`${job.id}-like`).onclick = e => {
            if (e.target.classList.contains('fa-heart-o')) {
              e.target.classList.remove('fa-heart-o')
              e.target.classList.add('fa-heart')
            } else {
              if (e.target.classList.contains('fa-heart')) {
                e.target.classList.remove('fa-heart')
                e.target.classList.add('fa-heart-o')
              }
            }
          };
        });
      } else {
        console.log("No se encontraron resultados");
      }
    });
};

const getById = id => {
  fetch(`https://jobs.github.com/positions/${id}.json`)
    .then(res => res.json())
    .then(data => {
      jobDescription.innerHTML = `
        <h1>JOB DESCRIPTION</h1>
        <h2>${data.title}</h2>
        <small>${data.company}</small>
        <p>${data.description}</p>
      `;
    });
};

submitBtn.addEventListener("click", async e => {
  e.preventDefault();
  const locationValue = locationInput.value;
  const descriptionValue = descriptionInput.value;
  const fulltimeValue = fulltimeCheck.checked;

  if (locationValue && descriptionValue) {
    getJobs(locationValue, descriptionValue, fulltimeValue);
  } else {
    console.log("los campos son requeridos");
  }
});

import API from './core/github/api.js';

//inputs
const locationInput = document.querySelector("#location");
const descriptionInput = document.querySelector("#job-description");
const fulltimeCheck = document.querySelector("#full-time");

//submit button and results container
const submitBtn = document.querySelector("#submit-btn");
const jobsList = document.querySelector("#jobs-list");
const jobsLikedList = document.querySelector('#jobs-liked-list');

//job boxes to click and its description container
const jobDescription = document.getElementById("job-info");

const likedJobs = JSON.parse(window.localStorage.getItem('likes'));
getLiked(likedJobs);

function getLiked(items) {
  jobsLikedList.innerHTML = '';

  items && items.forEach(({ id, title, company }) => {
    const jobBox = document.createElement("div");
    jobBox.classList.add("job-box");
    jobBox.innerHTML += `
      <div id="${id}" class="content">
        <h3>${title}</h3>
        <p>${company}</p>
      </div>
      <div class="like">
        <i class="fa fa-heart" id="${id}-liked"></i>
      </div>
    `;
  
    jobsLikedList.appendChild(jobBox);
  
    // get info method
    document.getElementById(id).onclick = () => getById(id);
    // like method
    document.getElementById(`${id}-liked`).onclick = () => {
      const likes = JSON.parse(window.localStorage.getItem('likes'));
      const updatedLikes = likes.filter(item => item.id !== id);
      window.localStorage.setItem('likes', JSON.stringify(updatedLikes));
      getLiked(updatedLikes);

      document.getElementById(`${id}-like`).classList.remove('fa-heart')
      document.getElementById(`${id}-like`).classList.add('fa-heart-o')
    };
  });
}

async function getJobs(location, description, fulltimeValue) {
  jobsList.innerHTML = 'Loading';
  jobDescription.innerHTML = '';
  const likedJobs = JSON.parse(window.localStorage.getItem('likes')) || [];
  
  //load data
  const data = await API.getJobs(description, location, fulltimeValue);
  jobsList.innerHTML = '';

  if (data.length) {
    data.forEach(({ id, title, company }) => {
      const isLiked = likedJobs.find(likedJob => likedJob.id === id);
      const jobBox = document.createElement("div");
      jobBox.classList.add("job-box");

      jobBox.innerHTML += `
        <div id="${id}" class="content">
          <h3>${title}</h3>
          <p>${company}</p>
        </div>
        <div class="like">
          <i class="fa ${isLiked ? 'fa-heart' : 'fa-heart-o' }" id="${id}-like"></i>
        </div>
      `;

      jobsList.appendChild(jobBox);

      // get info method
      document.getElementById(id).onclick = () => getById(id);
      // like method
      document.getElementById(`${id}-like`).onclick = e => {
        if (e.target.classList.contains('fa-heart-o')) {
          e.target.classList.remove('fa-heart-o');
          e.target.classList.add('fa-heart');

          const likes = JSON.parse(window.localStorage.getItem('likes')) || [];
          likes.push({ id, title, company });
          window.localStorage.setItem('likes', JSON.stringify(likes));
          getLiked(likes);
        } else {
          if (e.target.classList.contains('fa-heart')) {
            e.target.classList.remove('fa-heart');
            e.target.classList.add('fa-heart-o');

            const likes = JSON.parse(window.localStorage.getItem('likes'));
            const updatedLikes = likes.filter(item => item.id !== id);
            window.localStorage.setItem('likes', JSON.stringify(updatedLikes));
            getLiked(updatedLikes);
          }
        }
      };
    });
  } else {
    console.log("No se encontraron resultados");
    const jobBox = document.createElement("div");
    jobBox.innerHTML += `<p>No se encontraron resultados</p>`;
    jobsList.appendChild(jobBox);
  }
};

async function getById(id) {
  const data = await API.getJob(id);
  jobDescription.innerHTML = `
      <h1>JOB DESCRIPTION</h1>
      <h2>${data.title}</h2>
      <small>${data.company}</small>
      <p>${data.description}</p>
    `;
};

submitBtn.addEventListener("click", e => {
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

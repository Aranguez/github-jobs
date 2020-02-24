const baseUrl = "https://jobs.github.com/positions.json";

class API {
  async getJobs(description, location, fulltimeValue) {
    return fetch(
      `${baseUrl}?description=${description}&location=${location}&full_time=${fulltimeValue}`
    )
      .then(res => res.json())
      .then(data => data);
  }

  async getJob(id) {
    return fetch(`https://jobs.github.com/positions/${id}.json`)
      .then(res => res.json())
      .then(data => data);
  }
}

export default new API();

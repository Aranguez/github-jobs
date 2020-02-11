class API {
  getJob(description, location) {
    fetch(
      `https://jobs.github.com/positions.json?description=${description}&location=${location}`
    ).then(res => res.json()
    ).then(data => data);
  }
}

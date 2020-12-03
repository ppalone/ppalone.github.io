window.onload = function () {
  const tableBody = document.querySelector('tbody');
  let projects = [];

  const getProjects = async () => {
    try {
      let response = await fetch(
        'https://api.github.com/users/ppalone/repos'
      );
      if (response.status === 200) {
        projects = await response.json();
        setProjects(projects);
      }
    } catch (err) {
      tableBody.innerHTML = 'Unable to fetch Projects'
    }
  }

  const setProjects = (projects) => {
    projects
      .filter(project => !project.fork)
      .forEach(project => {
      let row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <a href=${project.homepage ? project.homepage : project.html_url}>${project.name}</a>
        </td>
        <td>${project.description}</td>
        <td>${project.stargazers_count}</td>
      `
      tableBody.appendChild(row)
    })
  }

  getProjects();

}